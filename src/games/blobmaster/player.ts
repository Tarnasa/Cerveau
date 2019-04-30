import { IBaseGameObjectRequiredData } from "~/core/game";
import { IBaseBlobmasterPlayer } from "./";
import { AI } from "./ai";
import { Blob } from "./blob";
import { GameObject } from "./game-object";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
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

    public takeAwayBlobUpkeep(): void {
        for (const blob of this.blobs) {
            if (!blob.isDead && blob.owner) {
                this.slime -= this.game.blobUpkeep;
            }
        }
    }

    public captureEnemyBlobs(): void {
        for (const enemy of this.opponent.blobs) {
            if (!enemy.isDead && enemy.tile !== undefined && !enemy.isBlobmaster) {
                let attackers = 0;
                for (const neighbor of enemy.tile.getNeighbors()) {
                    if (neighbor.blob &&
                        !neighbor.blob.isBlobmaster &&
                        neighbor.blob.owner === this &&
                        neighbor.blob.size === enemy.size){
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

    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
