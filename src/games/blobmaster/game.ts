import { IBaseGameRequiredData } from "~/core/game";
import { BaseClasses } from "./";
import { Blob } from "./blob";
import { BlobmasterGameManager } from "./game-manager";
import { GameObject } from "./game-object";
import { BlobmasterGameSettingsManager } from "./game-settings";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Collect slime and cover the battlefield with dropped blobs to win.
 */
export class BlobmasterGame extends BaseClasses.Game {
    /** The manager of this game, that controls everything around it */
    public readonly manager!: BlobmasterGameManager;

    /** The settings used to initialize the game, as set by players */
    public readonly settings = Object.freeze(this.settingsManager.values);

    /**
     * Blobs of size > 1 can move this many tiles per turn.
     */
    public readonly bigBlobSpeed!: number;

    /**
     * How much slime it costs to spawn a blob.
     */
    public readonly blobCost!: number;

    /**
     * Every blob costs its owner this amount of slime every turn.
     */
    public readonly blobUpkeep!: number;

    /**
     * Every Blobmaster in the game.
     */
    public blobmasters!: Blob[];

    /**
     * Every Blob in the game.
     */
    public blobs!: Blob[];

    /**
     * The player with fewer blobs is given this much slime per less blobs
     * every turn.
     */
    public readonly bonusSlimeForFewerBlobs!: number;

    /**
     * The player whose turn it is currently. That player can send commands.
     * Other players cannot.
     */
    public currentPlayer!: Player;

    /**
     * The current turn number, starting at 0 for the first player's turn.
     */
    public currentTurn!: number;

    /**
     * The amount of slime added to a blob or wall's tiles when it dies.
     */
    public readonly deathSlime!: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via
     * ID.
     */
    public gameObjects!: {[id: string]: GameObject};

    /**
     * The amount of slime given back to a blob's owner when it turns into a
     * wall.
     */
    public readonly hardenReward!: number;

    /**
     * The number of turns it takes a blob to harden into a wall.
     */
    public readonly hardenTime!: number;

    /**
     * The number of Tiles in the map along the y (vertical) axis.
     */
    public readonly mapHeight!: number;

    /**
     * The number of Tiles in the map along the x (horizontal) axis.
     */
    public readonly mapWidth!: number;

    /**
     * A Blobmaster can drop at most this many blobs per turn.
     */
    public readonly maxDropsPerTurn!: number;

    /**
     * The maximum amount of slime a player can hold at any one time.
     */
    public readonly maxPlayerSlime!: number;

    /**
     * No more slime will spawn on a tile with at least this much slime already
     * on it.
     */
    public readonly maxSlimeSpawnedOnTile!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * It takes the ceiling of this many turns times the number tiles away from
     * your blobmaster to drop a blob onto a tile.
     */
    public readonly perTileDropDelay!: number;

    /**
     * List of all the players in the game.
     */
    public players!: Player[];

    /**
     * A player wins if they can reach this many cumulative tiles covered.
     */
    public readonly pointsToWin!: number;

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * This much slime is added to every empty tile every turn.
     */
    public readonly slimeSpawnRate!: number;

    /**
     * 1x1 blobs can move this many tiles per turn.
     */
    public readonly smallBlobSpeed!: number;

    /**
     * All the tiles in the map, stored in Row-major order. Use `x + y *
     * mapWidth` to access the correct index.
     */
    public tiles!: Tile[];

    /**
     * A player wins if they can cover this many tiles with their blobs on a
     * single turn.
     */
    public readonly tilesCoveredToWin!: number;

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    /**
     * The number of turns a hardened blob wall lasts.
     */
    public readonly wallLifespan!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    public newBlobs: Blob[];

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Game is created.
     *
     * @param settingsManager - The manager that holds initial settings.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        protected settingsManager: BlobmasterGameSettingsManager,
        required: Readonly<IBaseGameRequiredData>,
    ) {
        super(settingsManager, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here

        const blobmaster1 = this.manager.create.blob({
            owner: this.players[0],
            tile: this.getTile(0, 0) as Tile,
            size: 1,
            isBlobmaster: true,
        });
        this.players[0].blobmaster = blobmaster1;
        this.blobmasters.push(blobmaster1);

        const blobmaster2 = this.manager.create.blob({
            owner: this.players[1],
            tile: this.getTile(this.mapWidth - 1, this.mapHeight - 1) as Tile,
            size: 1,
            isBlobmaster: true,
        });
        this.players[1].blobmaster = blobmaster2;
        this.blobmasters.push(blobmaster2);

        for (const tile of this.tiles) {
            tile.slime = this.maxSlimeSpawnedOnTile;
        }

        this.newBlobs = [] as Blob[];

        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Gets the tile at (x, y), or undefined if the co-ordinates are off-map.
     *
     * @param x - The x position of the desired tile.
     * @param y - The y position of the desired tile.
     * @returns The Tile at (x, y) if valid, undefined otherwise.
     */
    public getTile(x: number, y: number): Tile | undefined {
        // tslint:disable-next-line:no-unsafe-any
        return super.getTile(x, y) as Tile | undefined;
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
