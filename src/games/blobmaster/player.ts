import { IBaseGameObjectRequiredData } from "~/core/game";
import { IBaseBlobmasterPlayer, IPlayerDropArgs } from "./";
import { AI } from "./ai";
import { Blob } from "./blob";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
import { logger } from "~/core/logger";
// <<-- /Creer-Merge: imports -->>

/**
 * A player in this game. Every AI controls one player.
 */
export class Player extends GameObject implements IBaseBlobmasterPlayer {
    /** The AI controlling this Player */
    public readonly ai!: AI;

    /**
     * The Blobmaster owned by this Player.
     */
    public blobmaster!: Blob;

    /**
     * Every Blob owned by this Player.
     */
    public blobs!: Blob[];

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    public readonly clientType!: string;

    /**
     * Tiles which future blobs will drop onto, this determines the order in
     * which simultaneous drops are handled.
     */
    public drops!: Tile[];

    /**
     * How many more Blobs this Player can drop this turn.
     */
    public dropsLeft!: number;

    /**
     * If the player lost the game or not.
     */
    public lost!: boolean;

    /**
     * The name of the player.
     */
    public readonly name!: string;

    /**
     * This player's opponent in the game.
     */
    public readonly opponent!: Player;

    /**
     * The reason why the player lost the game.
     */
    public reasonLost!: string;

    /**
     * The reason why the player won the game.
     */
    public reasonWon!: string;

    /**
     * How many points this player has.
     */
    public score!: number;

    /**
     * How much slime this player has.
     */
    public slime!: number;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    public timeRemaining!: number;

    /**
     * If the player won the game or not.
     */
    public won!: boolean;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Player is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        // never directly created by game developers
        args: Readonly<IBaseBlobmasterPlayer>,
        required: Readonly<IBaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        this.slime = 0;
        this.score = 0;
        this.dropsLeft = this.game.maxDropsPerTurn;
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    public clampSlime(): void {
        if (this.slime > this.game.maxPlayerSlime) {
            this.slime = this.game.maxPlayerSlime;
        }
        if (this.slime < 0) {
            this.slime = 0;
        }
    }

    public captureEnemyBlobs(): void {
        for (const enemy of this.opponent.blobs) {
            if (!enemy.isDead && enemy.tile !== undefined && !enemy.isBlobmaster && enemy.size === 1) {
                let attackers = 0;
                for (const neighbor of enemy.tile.getNeighbors()) {
                    if (neighbor.blob &&
                        !neighbor.blob.isBlobmaster &&
                        neighbor.blob.owner === this &&
                        neighbor.blob.size === 1) {
                        attackers += 1;
                    }
                }
                if (attackers >= 3) {
                    enemy.owner = this;
                }
            }
        }
    }

    public handleDrops(): void {
        for (const tile of this.drops) {
            tile.handleDrops();
        }
    }

    public updateScore(): void {
        for (const blob of this.blobs) {
            this.score += blob.size * blob.size;
        }
    }

    public blobCost(): number {
        const numBlobs = (this.blobs.length + this.drops.length);
        return Math.floor(this.game.blobCostMultiplier * Math.pow(numBlobs, this.game.blobCostExponent));
    }

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Invalidation function for drop. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to spawn a Blob on.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateDrop(
        player: Player,
        tile: Tile,
    ): void | string | IPlayerDropArgs {
        // <<-- Creer-Merge: invalidate-drop -->>

        // Check all the arguments for drop here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        if (player !== this.game.currentPlayer) {
            return `It is not your turn, ${player}.`;
        }
        if (player !== this) {
            return `You cannot tell your opponent to drop()`;
        }
        if (!tile) {
            return `No tile provided to drop on.`;
        }
        if (this.slime < this.blobCost()) {
            return `You do not have enough slime (${this.slime} vs ${this.blobCost()}) to drop a blob`;
        }
        if (tile.dropOwner) {
            return `A blob is already being dropped onto ${tile}`;
        }
        if (this.dropsLeft <= 0) {
            return `${this} does not have any drops left this turn.`;
        }

        // <<-- /Creer-Merge: invalidate-drop -->>
    }

    /**
     * Spawns a Blob in the air above the given tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to spawn a Blob on.
     * @returns True if the drop worked, false otherwise.
     */
    protected async drop(player: Player, tile: Tile): Promise<boolean> {
        // <<-- Creer-Merge: drop -->>

        // Add logic here for drop.

        tile.dropOwner = player;
        if (this.blobmaster === undefined) {
            logger.error(`${this} has no blobmaster!`);
            return false;
        }
        const blobmaster = this.blobmaster;
        if (blobmaster.tile === undefined) {
            logger.error(`${this}'s blobmaster ${blobmaster} tile was undefined!`);
            return false;
        }
        const xd = Math.abs(tile.x - blobmaster.tile.x);
        const yd = Math.abs(tile.y - blobmaster.tile.y);
        tile.dropTurnsLeft = Math.ceil((xd + yd) * this.game.perTileDropDelay);
        player.slime -= this.blobCost();
        player.drops.push(tile);
        this.dropsLeft -= 1;
        return true;

        // <<-- /Creer-Merge: drop -->>
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
