import { IBaseGameObjectRequiredData } from "~/core/game";
import { BaseTile } from "~/core/game/mixins/tiled";
import { ITileProperties } from "./";
import { Blob } from "./blob";
import { GameObject } from "./game-object";
import { Player } from "./player";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Tile in the game that makes up the 2D map grid.
 */
export class Tile extends GameObject implements BaseTile {
    /**
     * The Blob that is on this Tile, undefined otherwise.
     */
    public blob?: Blob;

    /**
     * The owner of the blob dropping onto this tile, or undefined.
     */
    public dropOwner?: Player;

    /**
     * Turns until a blob is dropped onto this tile. negative if no blob is in
     * transit to this tile.
     */
    public dropTurnsLeft!: number;

    /**
     * How much slime exists on this Tile.
     */
    public slime!: number;

    /**
     * The Tile to the 'East' of this one (x+1, y). Undefined if out of bounds
     * of the map.
     */
    public readonly tileEast?: Tile;

    /**
     * The Tile to the 'North' of this one (x, y-1). Undefined if out of bounds
     * of the map.
     */
    public readonly tileNorth?: Tile;

    /**
     * The Tile to the 'South' of this one (x, y+1). Undefined if out of bounds
     * of the map.
     */
    public readonly tileSouth?: Tile;

    /**
     * The Tile to the 'West' of this one (x-1, y). Undefined if out of bounds
     * of the map.
     */
    public readonly tileWest?: Tile;

    /**
     * The x (horizontal) position of this Tile.
     */
    public readonly x!: number;

    /**
     * The y (vertical) position of this Tile.
     */
    public readonly y!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Tile is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        // never directly created by game developers
        args: Readonly<ITileProperties>,
        required: Readonly<IBaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    public handleDrops(): void {
        if (this.dropOwner) {
            if (this.dropTurnsLeft === 0) {
                let createNew = true;
                if (this.blob) {
                    if (this.blob.isBlobmaster && this.blob.owner !== undefined) {
                        this.blob.owner.slime = Math.ceil(this.blob.owner.slime / 2.0);
                        for (const blob of this.blob.owner.blobs) {
                            blob.resize(1);
                        }
                        createNew = false;
                    } else if (this.dropOwner !== this.blob.owner) {
                        this.blob.applyDamage(1);
                    } else if (this.blob.canResize(this.blob.size + 2)) {
                        this.blob.resize(this.blob.size + 2);
                        createNew = false;
                    } else {
                        this.blob.applyDamage(1);
                    }
                }
                if (createNew) {
                    const newBlob = this.game.manager.create.blob({
                        owner: this.dropOwner,
                        tile: this,
                        size: 1,
                        isBlobmaster: false,
                    });
                    this.game.newBlobs.push(newBlob);
                    newBlob.pickupSlimeUnderneath();
                }
                this.dropTurnsLeft = -1;
                this.dropOwner = undefined;
            } else if (this.dropTurnsLeft > 0) {
                this.dropTurnsLeft -= 1;
            }
        }
    }

    public spawnSlime(): void {
        if (!this.blob) {
            const slimeToSpawn = Math.max(0,
                Math.min(this.game.slimeSpawnRate,
                    this.game.maxSlimeSpawnedOnTile - this.slime));
            this.slime += slimeToSpawn;
        }
    }

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Gets the adjacent direction between this Tile and an adjacent Tile
     * (if one exists).
     *
     * @param adjacentTile - A tile that should be adjacent to this Tile.
     * @returns "North", "East", "South", or "West" if the tile is adjacent to
     * this Tile in that direction. Otherwise undefined.
     */
    public getAdjacentDirection(
        adjacentTile: Tile | undefined,
    ): "North" | "South" | "East" | "West" | undefined {
        // tslint:disable-next-line:no-unsafe-any
        return BaseTile.prototype.getAdjacentDirection.call(this, adjacentTile);
    }

    /**
     * Gets a list of all the neighbors of this Tile.
     *
     * @returns An array of all adjacent tiles. Should be between 2 to 4 tiles.
     */
    public getNeighbors(): Tile[] {
        // tslint:disable-next-line:no-unsafe-any
        return BaseTile.prototype.getNeighbors.call(this);
    }

    public getNeighbor(direction: "North" | "South" | "East" | "West"): Tile;
    public getNeighbor(direction: string): Tile | undefined;

    /**
     * Gets a neighbor in a particular direction
     *
     * @param direction - The direction you want, must be
     * "North", "East", "South", or "West".
     * @returns The Tile in that direction, or undefined if there is none.
     */
    public getNeighbor(direction: string): Tile | undefined {
        // tslint:disable-next-line:no-unsafe-any
        return BaseTile.prototype.getNeighbor.call(this, direction);
    }

    /**
     * Checks if a Tile has another Tile as its neighbor.
     *
     * @param tile - The Tile to check.
     * @returns True if neighbor, false otherwise.
     */
    public hasNeighbor(tile: Tile | undefined): boolean {
        // tslint:disable-next-line:no-unsafe-any
        return BaseTile.prototype.hasNeighbor.call(this, tile);
    }

    /**
     * toString override.
     *
     * @returns A string representation of the Tile.
     */
    public toString(): string {
        // tslint:disable-next-line:no-unsafe-any
        return BaseTile.prototype.toString.call(this);
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}