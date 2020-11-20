// This file is where you should put logic to control the game and everything
// around it.
import { BaseClasses, GalapagosGame, GalapagosGameObjectFactory } from "./";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
import { filterInPlace } from "~/utils";
import { Creature } from "./creature";
import { Plant } from "./plant";
import { Player } from "./player";
// <<-- /Creer-Merge: imports -->>

/**
 * Manages the game logic around the Galapagos Game.
 * This is where you could do logic for checking if the game is over, update
 * the game between turns, and anything that ties all the "stuff" in the game
 * together.
 */
export class GalapagosGameManager extends BaseClasses.GameManager {
    /** Other strings (case insensitive) that can be used as an ID. */
    public static get aliases(): string[] {
        return [
            // <<-- Creer-Merge: aliases -->>
            "MegaMinerAI-##-Galapagos",
            // <<-- /Creer-Merge: aliases -->>
        ];
    }

    /** The game this GameManager is managing. */
    public readonly game!: GalapagosGame;

    /** The factory that must be used to initialize new game objects. */
    public readonly create!: GalapagosGameObjectFactory;

    // <<-- Creer-Merge: public-methods -->>

    // any additional public methods you need can be added here

    // <<-- /Creer-Merge: public-methods -->>

    /**
     * This is called BEFORE each player's runTun function is called
     * (including the first turn).
     * This is a good place to get their player ready for their turn.
     */
    protected async beforeTurn(): Promise<void> {
        await super.beforeTurn();

        // <<-- Creer-Merge: before-turn -->>
        // add logic here for before the current player's turn starts
        this.addNewCreatures();
        for (const creature of this.game.creatures) {
            creature.resetMoves();
        }
        for (const player of this.game.players) {
            player.totalHealth = 0;
            for (const creature of player.creatures) {
                player.totalHealth += creature.currentHealth;
            }
        }
        // <<-- /Creer-Merge: before-turn -->>
    }

    /**
     * This is called AFTER each player's turn ends. Before the turn counter
     * increases.
     * This is a good place to end-of-turn effects, and clean up arrays.
     */
    protected async afterTurn(): Promise<void> {
        await super.afterTurn();

        // <<-- Creer-Merge: after-turn -->>
        // add logic here after the current player's turn starts
        for (const creature of this.game.creatures) {
            creature.applyTurnDamage();
        }
        this.addNewCreatures();
        this.removeDeadCreatures();
        this.removeDeadPlants();
        this.growPlants();
        // <<-- /Creer-Merge: after-turn -->>
    }

    /**
     * Checks if the game is over in between turns.
     * This is invoked AFTER afterTurn() is called, but BEFORE beforeTurn()
     * is called.
     *
     * @returns True if the game is indeed over, otherwise if the game
     * should continue return false.
     */
    protected primaryWinConditionsCheck(): boolean {
        super.primaryWinConditionsCheck();

        // <<-- Creer-Merge: primary-win-conditions -->>
        // Add logic here checking for the primary win condition(s)
        const extinctWinner = this.checkExtinct();
        if (extinctWinner === 0 || extinctWinner === 1) {
            this.declareWinner(
                `survived, opponent went extinct after turn ${this.game.currentTurn}.`,
                this.game.players[extinctWinner],
            );
            this.declareLoser(
                `went extinct after turn ${this.game.currentTurn}.`,
                this.game.players[extinctWinner].opponent,
            );
            return true;
        } else if (extinctWinner === 2) {
            this.secondaryWinConditions(
                `Both players went extinct at the end of turn ${this.game.currentTurn}.`,
            );
            return true;
        }
        // <<-- /Creer-Merge: primary-win-conditions -->>

        return false; // If we get here no one won on this turn.
    }

    /**
     * Called when the game needs to end, but primary game ending conditions
     * are not met (like max turns reached). Use this to check for secondary
     * game win conditions to crown a winner.
     *
     * @param reason - The reason why a secondary victory condition is
     * happening.
     */
    protected secondaryWinConditions(reason: string): void {
        // <<-- Creer-Merge: secondary-win-conditions -->>
        // Add logic here for the secondary win conditions
        const maxTurns = this.game.maxTurns;
        const creatures1 = this.game.players[0].creatures.length;
        const creatures2 = this.game.players[1].creatures.length;
        let health1 = 0;
        let health2 = 0;
        for (const creature of this.game.players[0].creatures) {
            health1 += creature.currentHealth;
        }
        for (const creature of this.game.players[1].creatures) {
            health2 += creature.currentHealth;
        }
        if (health1 > health2) {
            this.declareWinnerAndLoser(
                `has more combined health at the end of ${maxTurns} turns.`,
                this.game.players[0],
            );
        } else if (health2 > health1) {
            this.declareWinnerAndLoser(
                `has more combined health at the end of ${maxTurns} turns.`,
                this.game.players[1],
            );
        }
        } else if (creatures1 > creatures2) {
            this.declareWinnerAndLoser(
                `has more creatures at the end of ${maxTurns} turns.`,
                this.game.players[0],
            );
        } else if (creatures2 > creatures1) {
            this.declareWinnerAndLoser(
                `has more creatures at the end of ${maxTurns} turns.`,
                this.game.players[1],
            );
        }
        // <<-- /Creer-Merge: secondary-win-conditions -->>

        // This will end the game.
        // If no winner it determined above, then a random one will be chosen.
        super.secondaryWinConditions(reason);
    }

    // <<-- Creer-Merge: protected-private-methods -->>

    // any additional protected/private methods you need can be added here
    private checkExtinct(): number | undefined {
        const extinct1 = this.game.players[0].creatures.length == 0;
        const extinct2 = this.game.players[1].creatures.length == 0;
        if (!extinct1 && extinct2) {
            return 0;
        } else if (extinct1 && !extinct2) {
            return 1;
        } else if (extinct1 && extinct2) {
            return 2;
        }
        return undefined;
    }

    private addNewCreatures(): void {
        for (const creature of this.game.newCreatures) {
            if (creature.owner) {
                creature.owner.creatures.push(creature);
            }
            this.game.creatures.push(creature);
        }
        this.game.newCreatures.length = 0;
    }

    private removeDeadCreatures(): void {
        filterInPlace(
            this.game.creatures,
            (creature: Creature) => !!creature.tile,
        );
        for (const player of this.game.players) {
            filterInPlace(
                player.creatures,
                (creature: Creature) => !!creature.tile,
            );
        }
    }

    private removeDeadPlants(): void {
        filterInPlace(this.game.plants, (plant: Plant) => !!plant.tile);
    }

    private growPlants(): void {
        for (const plant of this.game.plants) {
            plant.turnsUntilGrowth -= 1;
            if (plant.turnsUntilGrowth <= 0) {
                plant.size += 1;
                if (plant.size > this.game.maxPlantSize) {
                    plant.size = this.game.maxPlantSize;
                }
                plant.turnsUntilGrowth = plant.growthRate;
            }
        }
    }

    private declareWinnerAndLoser(reason: string, winner: Player): void {
        this.declareWinner(reason, winner);
        const loseReason = `Opponent ${
            reason[0].toLowerCase() + reason.slice(1)
        }`;
        this.declareLoser(loseReason, winner.opponent);
    }

    // <<-- /Creer-Merge: protected-private-methods -->>
}
