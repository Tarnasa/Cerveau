import { BaseGameObjectRequiredData } from "~/core/game";
import {
    CreatureBiteArgs,
    CreatureBreedArgs,
    CreatureConstructorArgs,
    CreatureMoveArgs,
} from "./";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Creature in the game.
 */
export class Creature extends GameObject {
    /**
     * Indicates whether or not this creature can bite this turn.
     */
    public canBite!: boolean;

    /**
     * Indicates whether or not this creature can breed this turn.
     */
    public canBreed!: boolean;

    /**
     * The carnivore level of the creature. This increases damage to other
     * other creatures and health restored on kill.
     */
    public carnivorism!: number;

    /**
     * The current amount of health that this creature has.
     */
    public currentHealth!: number;

    /**
     * The defense of the creature. This reduces the amount of damage this
     * creature takes from being eaten.
     */
    public defense!: number;

    /**
     * The endurance level of the creature. This increases the max health a
     * creature can have.
     */
    public endurance!: number;

    /**
     * The herbivore level of the creature. This increases health restored from
     * eating plants.
     */
    public herbivorism!: number;

    /**
     * Indicates whether or not this creature is still in an egg and cannot
     * bite, breed, or be bitten.
     */
    public isEgg!: boolean;

    /**
     * The maximum amount of health this creature can have.
     */
    public maxHealth!: number;

    /**
     * The amount of moves this creature has left this turn.
     */
    public movementLeft!: number;

    /**
     * The owner of the creature.
     */
    public owner?: Player;

    /**
     * The creatures that gave birth to this one.
     */
    public parents!: Creature[];

    /**
     * The speed of the creature. This determines how many times a creature can
     * move in one turn.
     */
    public speed!: number;

    /**
     * The Tile this Creature occupies.
     */
    public tile?: Tile;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Creature is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: CreatureConstructorArgs<{
            // <<-- Creer-Merge: constructor-args -->>
            // You can add more constructor args in here
            owner: Player | undefined;
            tile: Tile;
            parents: Creature[];
            carnivorism: number;
            herbivorism: number;
            defense: number;
            speed: number;
            endurance: number;
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
        required: Readonly<BaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        this.owner = args.owner;
        this.tile = args.tile;
        this.parents = args.parents;
        this.carnivorism = args.carnivorism;
        this.herbivorism = args.herbivorism;
        this.defense = args.defense;
        this.speed = args.speed;
        this.endurance = args.endurance;

        this.isEgg = this.parents.length > 0;
        this.maxHealth =
            this.game.baseHealth +
            this.endurance * this.game.healthPerEndurance;
        this.currentHealth = this.maxHealth;
        this.canBreed = false;
        this.canBite = !this.isEgg;
        this.movementLeft = this.speed;
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    public resetMoves(): void {
        if (this.currentHealth > 0 && this.tile) {
            this.movementLeft = this.speed;
            this.canBreed = !this.isEgg;
            this.canBite = !this.isEgg;
        }
    }

    public applyTurnDamage(): void {
        this.applyDamage(this.game.healthPerTurn);
    }

    public applyDamage(damage: number): boolean {
        if (this.currentHealth <= 0 || !this.tile) {
            return false;
        }
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            if (!this.isEgg && this.tile.egg) {
                this.tile.egg.isEgg = false;
                this.tile.egg.canBite = true;
                this.tile.egg.canBreed = true;
                this.tile.creature = this.tile.egg;
                this.tile.egg = undefined;
            } else {
                this.tile.creature = undefined;
            }
            this.tile = undefined;
            this.movementLeft = 0;
            this.canBreed = false;
            this.canBite = false;
            return true;
        }
        return false;
    }

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Invalidation function for bite. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile with a plant or creature to bite.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateBite(
        player: Player,
        tile: Tile,
    ): void | string | CreatureBiteArgs {
        // <<-- Creer-Merge: invalidate-bite -->>

        // Check all the arguments for bite here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }
        if (!tile) {
            return `Creature ${this.id} cannot bite() a null tile.`;
        }
        if (!this.tile) {
            return `Creature ${this.id} has not tile.`; // should never happen because of invalidate()
        }
        if (this.tile.getNeighbors().indexOf(tile) === -1) {
            return `Creature ${this.id} cannot bite ${tile} because it is not adjacent to ${this.tile}.`;
        }
        if (!this.canBite) {
            return `Creature ${this.id} cannot bite() this turn.`;
        }
        if (tile.creature === undefined && tile.plant === undefined) {
            return `There is nothing on ${tile} to bite().`;
        }
        if (tile.plant && tile.plant.size <= 0) {
            return `Plant ${tile.plant} is too small to be eaten.`;
        }

        return undefined; // means nothing could be found that was ivalid.

        // <<-- /Creer-Merge: invalidate-bite -->>
    }

    /**
     * Command a creature to bite a plant or creature on the specified tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile with a plant or creature to bite.
     * @returns True if successfully bit, false otherwise.
     */
    protected async bite(player: Player, tile: Tile): Promise<boolean> {
        // <<-- Creer-Merge: bite -->>

        // Add logic here for bite.

        if (tile.plant) {
            this.currentHealth +=
                this.herbivorism * this.game.healthPerHerbivorism;
            if (this.currentHealth > this.maxHealth) {
                this.currentHealth = this.maxHealth;
            }
            tile.plant.size -= 1;
            if (tile.plant.size <= 0) {
                tile.plant.size = 0;
                tile.plant.tile = undefined;
                tile.plant = undefined;
            }
        }
        if (tile.creature) {
            let damage = this.carnivorism - tile.creature.defense;
            if (damage < 1) {
                damage = 1;
            }
            damage = damage * this.game.damageMultiplier;
            if (tile.creature.applyDamage(damage)) {
                this.currentHealth +=
                    this.carnivorism * this.game.healthPerCarnivorism;
                if (this.currentHealth > this.maxHealth) {
                    this.currentHealth = this.maxHealth;
                }
            }
        }
        this.canBite = false;

        return true;

        // <<-- /Creer-Merge: bite -->>
    }

    /**
     * Invalidation function for breed. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param mate - The Creature to breed with.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateBreed(
        player: Player,
        mate: Creature,
    ): void | string | CreatureBreedArgs {
        // <<-- Creer-Merge: invalidate-breed -->>

        // Check all the arguments for breed here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }
        if (!mate) {
            return `Creature ${this.id} cannot breed() with a null mate.`;
        }
        if (!this.canBreed) {
            return `Creature ${this.id} cannot breed() this turn.`;
        }
        if (mate.currentHealth <= 0 || !mate.tile) {
            return `Creature ${this.id} cannot breed() with a dead mate ${mate.id}.`;
        }
        if (!mate.canBreed) {
            return `Creature ${mate.id} cannot be breed() with this turn.`;
        }
        if (this.owner != mate.owner) {
            return `Creature ${this.id} cannot breed() with enemy Creature ${mate.id}.`;
        }
        if (!this.tile) {
            return `Creature ${this.id} cannot breed() because it has no tile (and is dead?).`;
        }
        if (this.tile.egg) {
            return `Creature ${this.id} cannot breed() because there is already an egg on this tile.`;
        }
        if (this.tile.getNeighbors().indexOf(mate.tile) === -1) {
            return `Creature ${this.id} cannot breed() with mate ${mate.id} on ${mate.tile} because it is not adjacent to ${this.tile}.`;
        }
        if (this.currentHealth < this.healthToBreed()) {
            return `Creature ${
                this.id
            } cannot breed() because it does not have enough health (${
                this.currentHealth
            } vs. ${this.healthToBreed()}.`;
        }
        if (this.currentHealth < mate.healthToBreed()) {
            return `Creature ${this.id} cannot breed() with ${
                mate.id
            } because its mate does not have enough health (${
                mate.currentHealth
            } vs. ${mate.healthToBreed()}.`;
        }

        return undefined; // means nothing could be found that was ivalid.

        // <<-- /Creer-Merge: invalidate-breed -->>
    }

    /**
     * Command a creature to breed with an adjacent creature.
     *
     * @param player - The player that called this.
     * @param mate - The Creature to breed with.
     * @returns The baby creature if successful, undefined otherwise.
     */
    protected async breed(
        player: Player,
        mate: Creature,
    ): Promise<Creature | undefined> {
        // <<-- Creer-Merge: breed -->>

        // Add logic here for breed.

        if (!this.tile) {
            return undefined;
        }
        const parent1Stats = [
            this.carnivorism,
            this.herbivorism,
            this.defense,
            this.speed,
            this.endurance,
        ];
        const parent2Stats = [
            mate.carnivorism,
            mate.herbivorism,
            mate.defense,
            mate.speed,
            mate.endurance,
        ];
        let largestParent1Stat = [-1, -1];
        let smallestParent2Stat = [-1, 99];
        const combinedStats = [] as number[];
        for (let i = 0; i < parent1Stats.length; i += 1) {
            const p1 = parent1Stats[i];
            const p2 = parent2Stats[i];
            combinedStats.push(Math.ceil((p1 + p2) / 2.0));
            if (p1 == largestParent1Stat[1]) {
                largestParent1Stat[0] = -1; // If there is no maximum, do nothing
            } else if (p1 > largestParent1Stat[1]) {
                largestParent1Stat = [i, p1];
            }
            if (p2 == smallestParent2Stat[1]) {
                smallestParent2Stat[0] = -1; // If there is no minimum, do nothing
            } else if (p2 < smallestParent2Stat[1]) {
                smallestParent2Stat = [i, p2];
            }
        }
        if (largestParent1Stat[0] != -1) {
            combinedStats[largestParent1Stat[0]] += 1;
            if (
                combinedStats[largestParent1Stat[0]] > this.game.maxStatValue
            ) {
                combinedStats[largestParent1Stat[0]] = this.game.maxStatValue;
            }
        }
        if (smallestParent2Stat[0] != -1) {
            combinedStats[smallestParent2Stat[0]] -= 1;
            if (combinedStats[smallestParent2Stat[0]] < 1) {
                combinedStats[smallestParent2Stat[0]] = 1;
            }
        }
        const newCreature = this.game.manager.create.creature({
            owner: this.owner,
            tile: this.tile,
            parents: [this, mate],
            carnivorism: combinedStats[0],
            herbivorism: combinedStats[1],
            defense: combinedStats[2],
            speed: combinedStats[3],
            endurance: combinedStats[4],
        });
        this.tile.egg = newCreature;
        this.game.newCreatures.push(newCreature);
        this.canBreed = false;
        mate.canBreed = false;
        this.canBite = false;
        mate.canBite = false;
        this.movementLeft = 0;
        mate.movementLeft = 0;
        this.applyDamage(this.healthToBreed());
        mate.applyDamage(mate.healthToBreed());
        return newCreature;

        // <<-- /Creer-Merge: breed -->>
    }

    /**
     * Invalidation function for move. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to move to.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMove(
        player: Player,
        tile: Tile,
    ): void | string | CreatureMoveArgs {
        // <<-- Creer-Merge: invalidate-move -->>

        // Check all the arguments for move here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }
        if (!tile) {
            return `Creature ${this.id} cannot move() to a null tile.`;
        }
        if (!this.tile) {
            return `Creature ${this.id} cannot move() from a null tile (and is dead?).`;
        }
        if (this.tile.getNeighbors().indexOf(tile) === -1) {
            return `Creature ${this.id} cannot move() to ${tile} because it is not adjacent to ${this.tile}.`;
        }
        if (this.movementLeft <= 0) {
            return `Creature ${this.id} has no movement left this turn.`;
        }
        if (tile.creature || tile.plant) {
            return `Creature ${this.id} cannot move() to ${tile} because it is currently occupied.`;
        }

        return undefined; // means nothing could be found that was ivalid.

        // <<-- /Creer-Merge: invalidate-move -->>
    }

    /**
     * Command a creature to move to a specified adjacent tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to move to.
     * @returns True if successfully moved, false otherwise.
     */
    protected async move(player: Player, tile: Tile): Promise<boolean> {
        // <<-- Creer-Merge: move -->>

        // Add logic here for move.

        if (!tile || !this.tile || tile.creature || tile.plant) {
            return false;
        }
        if (this.isEgg) {
            this.isEgg = false;
            this.canBite = true;
            this.canBreed = true;
            this.tile.egg = undefined;
        } else {
            if (this.tile.egg) {
                this.tile.egg.isEgg = false;
                this.tile.egg.canBite = true;
                this.tile.egg.canBreed = true;
                this.tile.creature = this.tile.egg;
                this.tile.egg = undefined;
            } else {
                this.tile.creature = undefined;
            }
        }
        tile.creature = this;
        this.tile = tile;
        this.movementLeft -= 1;
        this.applyDamage(this.game.healthPerMove);

        return true;

        // <<-- /Creer-Merge: move -->>
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    private healthToBreed(): number {
        let cost = this.maxHealth / 2;
        if (
            this.owner &&
            this.owner.totalHealth > this.owner.opponent.totalHealth
        ) {
            cost += this.game.healthPerBreed;
        }
        return cost;
    }

    private invalidate(player: Player): string | undefined {
        if (player !== this.game.currentPlayer) {
            return `It is not your turn, ${player}.`;
        }
        if (this.owner !== player) {
            return `You do not own ${this}.`;
        }
        if (this.currentHealth <= 0) {
            return `${this} is dead.`;
        }
        return undefined;
    }

    // <<-- /Creer-Merge: protected-private-functions -->>
}
