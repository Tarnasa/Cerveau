// tslint:disable:max-classes-per-file - because the mixin define multiple classes while maintaining scope to each
// tslint:disable:no-empty-interface - because the some mixins have nothing to add

import { BaseGameObject, IBasePlayer } from "~/core/game";
import * as Base from "./base";

/** The valid direction strings tile based games use. */
export const TILE_DIRECTIONS: [ "North", "South", "East", "West" ] = [ "North", "South", "East", "West" ];

/** A player in a tile based game. */
export interface ITiledPlayer extends IBasePlayer {}

/** A base tile for super tiles to extend */
export abstract class BaseTile extends BaseGameObject {
    /** The X coordinate of the tile. */
    public readonly x!: number;

    /** The Y coordinate of the tile. */
    public readonly y!: number;

    /** The neighboring tile to the North, if present. */
    public readonly tileNorth?: BaseTile;

    /** The neighboring tile to the East, if present. */
    public readonly tileEast?: BaseTile;

    /** The neighboring tile to the South, if present. */
    public readonly tileSouth?: BaseTile;

    /** The neighboring tile to the West, if present. */
    public readonly tileWest?: BaseTile;

    /**
     * Gets the adjacent direction between this tile and an adjacent tile
     * (if one exists).
     *
     * @param adjacentTile - A tile that should be adjacent to this tile
     * @returns - The string direction, or undefined if the
     * tile is invalid, or there is no adjacent direction between this tile
     * and that tile
     * ("North", "East", "South", or "West") if found in that direction,
     * undefined otherwise.
     */
    public getAdjacentDirection(
        adjacentTile: BaseTile | undefined,
    ): string | undefined {
        if (adjacentTile) {
            for (const direction of TILE_DIRECTIONS) {
                if (this.getNeighbor(direction) === adjacentTile) {
                    return direction;
                }
            }
        }
    }

    /**
     * Gets a list of all the neighbors of this tile.
     *
     * @returns - An array of all adjacent tiles.
     * Should be between 2 to 4 tiles.
     */
    public getNeighbors(): BaseTile[] {
        const neighbors = new Array<BaseTile>();

        for (const direction of TILE_DIRECTIONS) {
            const neighbor = this.getNeighbor(direction);
            if (neighbor) {
                neighbors.push(neighbor);
            }
        }

        return neighbors;
    }

    /**
     * Gets a neighbor in a particular direction.
     *
     * @param direction - The direction you want,
     * must be "North", "East", "South", or "West".
     * @returns The Tile in that direction, null if none.
     */
    public getNeighbor(
        direction: "North" | "South" | "East" | "West",
    ): BaseTile {
        return (this as any)[`tile${direction}`];
    }

    /**
     * Checks if a Tile has another tile as its neighbor
     *
     * @param tile - tile to check
     * @returns true if neighbor, false otherwise
     */
    public hasNeighbor(tile: BaseTile | undefined): boolean {
        return Boolean(this.getAdjacentDirection(tile));
    }

    /**
     * toString override
     *
     * @returns a string representation of the Tile
     */
    public toString(): string {
        return `${this.gameObjectName} #${this.id} at (${this.x}, ${this.y})`;
    }
}

/**
 * A game that has a grid based map of tiles. This handles creating that
 * initial map and hooking it up. That's it.
 *
 * @param base - The BaseGame (or sub BaseGame) to mix in tiled logic.
 * @returns A new BaseGame class with Tiled logic mixed in.
 */
// Because it will be a weird mixin type inferred from the return statement
// tslint:disable-next-line:typedef
export function mixTiled<
    TBaseAI extends Base.BaseAIConstructor,
    TBaseGame extends Base.BaseGameConstructor,
    TBaseGameManager extends Base.BaseGameManagerConstructor,
    TBaseGameObject extends Base.BaseGameObjectConstructor,
    TBaseGameSettings extends Base.BaseGameSettingsManagerConstructor
>(base: {
    AI: TBaseAI,
    Game: TBaseGame,
    GameManager: TBaseGameManager,
    GameObject: TBaseGameObject,
    GameSettings: TBaseGameSettings,
}) {
    /** The settings for a Tiled game */
    class TiledGameSettings extends base.GameSettings {
        /** The schema for a Tiled game, adding in configurable map sizes. */
        public schema = this.makeSchema({
            // HACK: super should work. but schema is undefined on it
            ...(super.schema || (this as any).schema),
            mapWidth: {
                default: 32,
                min: 2,
                description: "The width (in Tiles) for the game map to be initialized to.",
            },
            mapHeight: {
                default: 16,
                min: 2,
                description: "The height (in Tiles) for the game map to be initialized to.",
            },
        });

        /** The current settings values. */
        public values = this.initialValues(this.schema);
    }

    /** A game that has a map made of tiles in it. */
    class TiledGame extends base.Game {
        // client <--> server properties
        /** The tiles in the game, in rowMajor order. */
        public readonly tiles!: BaseTile[];

        /** The width of the map along the X-Axis. */
        public readonly mapWidth!: number;

        /** The height of the map along the Y-Axis. */
        public readonly mapHeight!: number;

        // server-side only
        /** The valid directions tiles can be in from one another. */
        public readonly tileDirections = TILE_DIRECTIONS;

        constructor(...args: any[]) {
            super(...args);

            this.tiles.length = this.mapWidth * this.mapHeight;

            // Create each tile.
            for (let x = 0; x < this.mapWidth; x++) {
                for (let y = 0; y < this.mapHeight; y++) {
                    this.tiles[x + y * this.mapWidth] = (this.manager.create as any).Tile({x, y});
                    // any because we don't mix a new BaseGameObject Factory,
                    // however all managers will have a Tile so no worries.
                }
            }

            // now hook up their neighbors
            for (let x = 0; x < this.mapWidth; x++) {
                for (let y = 0; y < this.mapHeight; y++) {
                    const tile = this.getTile(x, y) as any;

                    tile.tileNorth = this.getTile(x, y - 1);
                    tile.tileEast = this.getTile(x + 1, y);
                    tile.tileSouth = this.getTile(x, y + 1);
                    tile.tileWest = this.getTile(x - 1, y);
                }
            }
        }

        /**
         * Gets the tile at (x, y), or undefined if the co-ordinates are
         * off-map.
         *
         * @param x - The x position of the desired tile.
         * @param y - The y position of the desired tile.
         * @returns The Tile at (x, y) if valid, null otherwise.
         */
        public getTile(x: number, y: number): BaseTile | undefined {
            return this.tiles[x + y * this.mapWidth];
        }

        /**
         * Inverts a direction string, e.g. "North" -> "South"
         *
         * @param direction - the direction string to invert
         * @returns the direction inverted,
         * e.g. "East" -> "West", undefined if the direction was not a valid
         * direction string.
         */
        public invertTileDirection(
            direction: "North" | "South" | "East" | "West",
        ): "North" | "South" | "East" | "West" {
            switch (direction) {
                case "North": return "South";
                case "East": return "West";
                case "South": return "North";
                case "West": return "East";
            }
        }
    }

    return {
        ...base,
        Game: TiledGame,
        GameSettings: TiledGameSettings,
    };
}
