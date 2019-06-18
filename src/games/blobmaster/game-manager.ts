// This file is where you should put logic to control the game and everything
// around it.
import { BaseClasses, BlobmasterGame, BlobmasterGameObjectFactory } from "./";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
import { filterInPlace } from "~/utils";
import { Blob } from "./blob";
import { Player } from "./player";
import { Tile } from "./tile";
// import { logger } from "~/core/logger";
// <<-- /Creer-Merge: imports -->>

/**
 * Manages the game logic around the Blobmaster Game.
 * This is where you could do logic for checking if the game is over, update
 * the game between turns, and anything that ties all the "stuff" in the game
 * together.
 */
export class BlobmasterGameManager extends BaseClasses.GameManager {
    /** Other strings (case insensitive) that can be used as an ID */
    public static get aliases(): string[] {
        return [
            // <<-- Creer-Merge: aliases -->>
            "MegaMinerAI-##-Blobmaster",
            // <<-- /Creer-Merge: aliases -->>
        ];
    }

    /** The game this GameManager is managing */
    public readonly game!: BlobmasterGame;

    /** The factory that must be used to initialize new game objects */
    public readonly create!: BlobmasterGameObjectFactory;

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
        for (const blob of this.game.blobs) {
            blob.resetMoves();
        }
        for (const blobmaster of this.game.blobmasters) {
            blobmaster.resetMoves();
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
        // add logic here after the current player's turn ends
        for (const blob of this.game.blobs) {
            blob.handleHardenAndWallDeath();
        }
        this.giveHandicapSlime();
        for (const player of this.game.players) {
            player.clampSlime();
            player.takeAwayBlobUpkeep(); // Newly captured don't cost upkeep
            player.clampSlime();
        }
        this.game.currentPlayer.handleDrops();
        this.game.currentPlayer.opponent.handleDrops();
        this.removeDroppedBlobsFromPlayerDropList();
        for (const tile of this.game.tiles) {
            tile.spawnSlime();
        }
        this.addNewBlobs();
        this.game.currentPlayer.captureEnemyBlobs(); // Drops can immediately capture
        this.updateBlobOwnersLists();
        this.removeDeadBlobs();
        for (const player of this.game.players) {
            player.updateScore();
        }
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
        const scoreWinner = this.checkScore();
        const tilesWinner = this.checkTilesCovered();
        if (scoreWinner === 0 || scoreWinner === 1) {
            this.declareWinnerAndLoser(`Reached ${this.game.pointsToWin} points`, this.game.players[scoreWinner]);
            return true;
        } else if (tilesWinner === 0 || tilesWinner === 1) {
            this.declareWinnerAndLoser(`Covered ${this.game.tilesCoveredToWin} tiles`, this.game.players[tilesWinner]);
            return true;
        } else if (scoreWinner === 2 && tilesWinner === 2) {
            // Ummmmmmm
            this.secondaryWinConditions(
                `Both players reached max score, and covered enoough tiles in a single turn to win`);
            return true;
        }
        // <<-- /Creer-Merge: primary-win-conditions -->>

        return false; // If we get here no one won on this turn.
    }

    /**
     * Called when the game needs to end, but primary game ending conditions
     * are not met (like max turns reached). Use this to check for secondary
     * game win conditions to crown a winner.
     * @param reason The reason why a secondary victory condition is happening
     */
    protected secondaryWinConditions(reason: string): void {
        // <<-- Creer-Merge: secondary-win-conditions -->>
        // Add logic here for the secondary win conditions
        const p1 = this.game.players[0];
        const p2 = this.game.players[1];
        if (p1.score > p2.score) {
            this.declareWinnerAndLoser(
                `Has higher score (${p1.score} vs ${p2.score}) at the end of ${this.game.maxTurns} turns`, p1);
        } else if (p2.score > p1.score) {
            this.declareWinnerAndLoser(
                `Has higher score (${p2.score} vs ${p1.score}) at the end of ${this.game.maxTurns} turns`, p2);
        } else if (p1.blobs.length > p2.blobs.length) {
            this.declareWinnerAndLoser(
                `Has equal score (${p1.score}), but more blobs (${p1.blobs.length} vs ` +
                `${p2.blobs.length}) at the end of ${this.game.maxTurns} turns`, p1);
        } else if (p2.blobs.length > p1.blobs.length) {
            this.declareWinnerAndLoser(
                `Has equal score (${p2.score}), but more blobs (${p2.blobs.length} vs ` +
                `${p1.blobs.length}) at the end of ${this.game.maxTurns} turns`, p2);
        } else if (p1.slime > p2.slime) {
            this.declareWinnerAndLoser(
                `Has equal score (${p1.score}), equal blobs (${p1.blobs.length}, but ` +
                `more slime (${p1.slime} vs ${p2.slime}) at the end of ${this.game.maxTurns} turns`, p1);
        } else if (p2.slime > p1.slime) {
            this.declareWinnerAndLoser(
                `Has equal score (${p2.score}), equal blobs (${p2.blobs.length}, but ` +
                `more slime (${p2.slime} vs ${p1.slime}) at the end of ${this.game.maxTurns} turns`, p2);
        }
        // <<-- /Creer-Merge: secondary-win-conditions -->>

        // This will end the game.
        // If no winner it determined above, then a random one will be chosen.
        super.secondaryWinConditions(reason);
    }

    // <<-- Creer-Merge: protected-private-methods -->>

    private giveHandicapSlime(): void {
        const p1Blobs = this.game.players[0].blobs.length;
        const p2Blobs = this.game.players[1].blobs.length;
        if (p1Blobs < p2Blobs) {
            this.game.players[0].slime += (p2Blobs - p1Blobs) * this.game.bonusSlimeForFewerBlobs;
        } else if (p2Blobs < p1Blobs) {
            this.game.players[1].slime += (p1Blobs - p2Blobs) * this.game.bonusSlimeForFewerBlobs;
        }
    }

    private addNewBlobs(): void {
        for (const blob of this.game.newBlobs) {
            this.game.blobs.push(blob);
            if (blob.owner) {
                blob.owner.blobs.push(blob);
            }
        }
        this.game.newBlobs.length = 0;
    }

    // Updates the arrays clients can see so they do not resize during turns.
    private removeDeadBlobs(): void {
        filterInPlace(this.game.blobs, (blob: Blob) => !blob.isDead);
        for (const player of this.game.players) {
            filterInPlace(player.blobs, (blob: Blob) => !blob.isDead);
        }
    }

    private removeDroppedBlobsFromPlayerDropList(): void {
        for (const player of this.game.players) {
            filterInPlace(player.drops, (tile: Tile) => tile.dropOwner !== undefined);
        }
    }

    // Updates the arrays clients can see so they do not resize during turns.
    private updateBlobOwnersLists(): void {
        for (const player of this.game.players) {
            for (const blob of player.blobs) {
                if (blob.owner && blob.owner !== player) {
                    blob.owner.blobs.push(blob);
                }
            }
            filterInPlace(player.blobs, (blob: Blob) => blob.owner === player);
        }
    }

    private checkTilesCovered(): number | undefined {
        let covered1 = 0;
        let covered2 = 0;
        for (const blob of this.game.players[0].blobs) {
            covered1 += blob.size * blob.size;
        }
        for (const blob of this.game.players[1].blobs) {
            covered2 += blob.size * blob.size;
        }
        const win1 = covered1 === this.game.tilesCoveredToWin;
        const win2 = covered2 === this.game.tilesCoveredToWin;
        if (win1 && !win2) {
            return 0;
        } else if (win2 && !win1) {
            return 1;
        } else if (win1 && win2) {
            return 2;
        }
        return undefined;
    }

    private checkScore(): number | undefined {
        const win1 = this.game.players[0].score >= this.game.pointsToWin;
        const win2 = this.game.players[1].score >= this.game.pointsToWin;
        if (win1 && !win2) {
            return 0;
        } else if (win2 && !win1) {
            return 1;
        } else if (win1 && win2) {
            return 2;
        }
        return undefined;
    }

    // any additional protected/private methods you need can be added here

    private declareWinnerAndLoser(reason: string, winner: Player): void {
        this.declareWinner(reason, winner);
        const loseReason = `Opponent ${reason[0].toLowerCase() + reason.slice(1)}`;
        this.declareLoser(loseReason, winner.opponent);
    }

    // <<-- /Creer-Merge: protected-private-methods -->>
}
