// WARNING: Here be Dragons
// This file is generated by Creer, do not modify it
// It basically sets up all the classes, interfaces, types, and what-not that
// we need for TypeScript to know the base classes, while allowing for minimal
// code for developers to be forced to fill out.

// tslint:disable:max-classes-per-file
// ^ because we need to build a bunch of base class wrappers here

// base game classes
import { BaseAI, BaseGame, BaseGameManager, BaseGameObject,
         BaseGameObjectFactory, BaseGameSettingsManager, BasePlayer,
         makeNamespace } from "~/core/game";

// mixins
import { ITiledPlayer, ITurnBasedPlayer, ITwoPlayerPlayer, mixTiled,
         mixTurnBased, mixTwoPlayer } from "~/core/game/mixins";

// extract game object constructor args
import { FirstArgumentFromConstructor } from "~/utils";

/**
 * The interface the Player for the Coreminer game
 * must implement from mixed in game logic.
 */
export interface IBaseCoreminerPlayer extends
    BasePlayer,
    ITwoPlayerPlayer,
    ITurnBasedPlayer,
    ITiledPlayer {
}

const base0 = {
    AI: BaseAI,
    Game: BaseGame,
    GameManager: BaseGameManager,
    GameObject: BaseGameObject,
    GameSettings: BaseGameSettingsManager,
};

const base1 = mixTwoPlayer(base0);
const base2 = mixTurnBased(base1);
const base3 = mixTiled(base2);

const mixed = base3;

/** The base AI class for the Coreminer game will mixin logic. */
class BaseCoreminerAI extends mixed.AI {}

/** The base Game class for the Coreminer game will mixin logic. */
class BaseCoreminerGame extends mixed.Game {}

/** The base GameManager class for the Coreminer game will mixin logic. */
class BaseCoreminerGameManager extends mixed.GameManager {}

/** The base GameObject class for the Coreminer game will mixin logic. */
class BaseCoreminerGameObject extends mixed.GameObject {}

/** The base GameSettings class for the Coreminer game will mixin logic. */
class BaseCoreminerGameSettings extends mixed.GameSettings {}

/** The Base classes that game classes build off of. */
export const BaseClasses = {
    AI: BaseCoreminerAI,
    Game: BaseCoreminerGame,
    GameManager: BaseCoreminerGameManager,
    GameObject: BaseCoreminerGameObject,
    GameSettings: BaseCoreminerGameSettings,
};

// Now all the base classes are created;
// so we can start importing/exporting the classes that need them.

/** All the possible properties for an GameObject. */
export interface IGameObjectProperties {
}

/** All the possible properties for an Job. */
export interface IJobProperties {
    /**
     * The amount of cargo capacity this Unit starts with per level.
     */
    cargoCapacity?: number[];

    /**
     * The cost of spawning a Unit with this Job.
     */
    cost?: number;

    /**
     * The amount of starting health this Job has per level.
     */
    health?: number[];

    /**
     * The amount of mining power this Unit has per turn per level.
     */
    miningPower?: number[];

    /**
     * The number of moves this Job can make per turn per level.
     */
    moves?: number[];

    /**
     * The Job title. 'miner' or 'bomb'.
     */
    title?: "miner" | "bomb";

}

/** All the possible properties for an Player. */
export interface IPlayerProperties {
    /**
     * The Tile this Player's base is on.
     */
    baseTile?: Tile;

    /**
     * The bombs stored in the Player's supply.
     */
    bombs?: number;

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType?: string;

    /**
     * The Tiles this Player's hoppers are on.
     */
    hopperTiles?: Tile[];

    /**
     * If the player lost the game or not.
     */
    lost?: boolean;

    /**
     * The amount of money this Player currently has.
     */
    money?: number;

    /**
     * The name of the player.
     */
    name?: string;

    /**
     * This player's opponent in the game.
     */
    opponent?: Player;

    /**
     * The reason why the player lost the game.
     */
    reasonLost?: string;

    /**
     * The reason why the player won the game.
     */
    reasonWon?: string;

    /**
     * The Tiles on this Player's side of the map.
     */
    side?: Tile[];

    /**
     * The Tiles this Player may spawn Units on.
     */
    spawnTiles?: Tile[];

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    timeRemaining?: number;

    /**
     * Every Unit owned by this Player.
     */
    units?: Unit[];

    /**
     * The amount of value (victory points) this Player has gained.
     */
    value?: number;

    /**
     * If the player won the game or not.
     */
    won?: boolean;

}

/** All the possible properties for an Tile. */
export interface ITileProperties {
    /**
     * The amount of dirt on this Tile.
     */
    dirt?: number;

    /**
     * Whether or not the tile is an indestructible base Tile.
     */
    isBase?: boolean;

    /**
     * Whether or not this tile is about to fall.
     */
    isFalling?: boolean;

    /**
     * Whether or not a hopper is on this Tile.
     */
    isHopper?: boolean;

    /**
     * Whether or not a ladder is built on this Tile.
     */
    isLadder?: boolean;

    /**
     * Whether or not a support is built on this Tile.
     */
    isSupport?: boolean;

    /**
     * The amount of ore on this Tile.
     */
    ore?: number;

    /**
     * The owner of this Tile, or undefined if owned by no-one. Only for bases
     * and hoppers.
     */
    owner?: Player;

    /**
     * The amount of shielding on this Tile.
     */
    shielding?: number;

    /**
     * The Tile to the 'East' of this one (x+1, y). Undefined if out of bounds
     * of the map.
     */
    tileEast?: Tile;

    /**
     * The Tile to the 'North' of this one (x, y-1). Undefined if out of bounds
     * of the map.
     */
    tileNorth?: Tile;

    /**
     * The Tile to the 'South' of this one (x, y+1). Undefined if out of bounds
     * of the map.
     */
    tileSouth?: Tile;

    /**
     * The Tile to the 'West' of this one (x-1, y). Undefined if out of bounds
     * of the map.
     */
    tileWest?: Tile;

    /**
     * An array of the Units on this Tile.
     */
    units?: Unit[];

    /**
     * The x (horizontal) position of this Tile.
     */
    x?: number;

    /**
     * The y (vertical) position of this Tile.
     */
    y?: number;

}

/**
 * Argument overrides for Tile's spawnMiner function. If you return an object
 * of this interface from the invalidate functions, the value(s) you set will
 * be used in the actual function.
 */
export interface ITileSpawnMinerArgs {
}

/** All the possible properties for an Unit. */
export interface IUnitProperties {
    /**
     * The number of bombs being carried by this Unit. (0 to job cargo capacity
     * - other carried materials).
     */
    bombs?: number;

    /**
     * The number of building materials carried by this Unit. (0 to job cargo
     * capacity - other carried materials).
     */
    buildingMaterials?: number;

    /**
     * The amount of dirt carried by this Unit. (0 to job cargo capacity -
     * other carried materials).
     */
    dirt?: number;

    /**
     * The remaining health of a Unit.
     */
    health?: number;

    /**
     * The Job this Unit has.
     */
    job?: Job;

    /**
     * The maximum amount of cargo this Unit can carry.
     */
    maxCargoCapacity?: number;

    /**
     * The maximum health of this Unit.
     */
    maxHealth?: number;

    /**
     * The maximum mining power of this Unit.
     */
    maxMiningPower?: number;

    /**
     * The maximum moves this Unit can have.
     */
    maxMoves?: number;

    /**
     * The remaining mining power this Unit has this turn.
     */
    miningPower?: number;

    /**
     * The number of moves this Unit has left this turn.
     */
    moves?: number;

    /**
     * The amount of ore carried by this Unit. (0 to job capacity - other
     * carried materials).
     */
    ore?: number;

    /**
     * The Player that owns and can control this Unit.
     */
    owner?: Player;

    /**
     * The Tile this Unit is on.
     */
    tile?: Tile;

}

/**
 * Argument overrides for Unit's build function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface IUnitBuildArgs {
    /**
     * The Tile to build on.
     */
    tile?: Tile;
    /**
     * The structure to build (support, ladder, or shield).
     */
    type?: "support" | "ladder" | "shield";
}

/**
 * Argument overrides for Unit's dump function. If you return an object of this
 * interface from the invalidate functions, the value(s) you set will be used
 * in the actual function.
 */
export interface IUnitDumpArgs {
    /**
     * The tile the materials will be dumped on.
     */
    tile?: Tile;
    /**
     * The material the Unit will drop. 'dirt', 'ore', or 'bomb'.
     */
    material?: "dirt" | "ore" | "bomb";
    /**
     * The number of materials to drop. Amounts <= 0 will drop all the
     * materials.
     */
    amount?: number;
}

/**
 * Argument overrides for Unit's mine function. If you return an object of this
 * interface from the invalidate functions, the value(s) you set will be used
 * in the actual function.
 */
export interface IUnitMineArgs {
    /**
     * The Tile the materials will be mined from.
     */
    tile?: Tile;
    /**
     * The amount of material to mine up. Amounts <= 0 will mine all the
     * materials that the Unit can.
     */
    amount?: number;
}

/**
 * Argument overrides for Unit's move function. If you return an object of this
 * interface from the invalidate functions, the value(s) you set will be used
 * in the actual function.
 */
export interface IUnitMoveArgs {
    /**
     * The Tile this Unit should move to.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Unit's upgrade function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface IUnitUpgradeArgs {
    /**
     * The attribute of the Unit to be upgraded.
     */
    attribute?: "health" | "miningPower" | "moves" | "capacity";
}

export * from "./game-object";
export * from "./job";
export * from "./player";
export * from "./tile";
export * from "./unit";
export * from "./game";
export * from "./game-manager";
export * from "./ai";

import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Tile } from "./tile";
import { Unit } from "./unit";

import { AI } from "./ai";
import { CoreminerGame } from "./game";
import { CoreminerGameManager } from "./game-manager";
import { CoreminerGameSettingsManager } from "./game-settings";

/** The arguments used to construct a Job */
export type JobArgs = FirstArgumentFromConstructor<typeof Job>;

/** The arguments used to construct a Tile */
export type TileArgs = FirstArgumentFromConstructor<typeof Tile>;

/** The arguments used to construct a Unit */
export type UnitArgs = FirstArgumentFromConstructor<typeof Unit>;

/**
 * The factory that **must** be used to create any game objects in
 * the Coreminer game.
 */
export class CoreminerGameObjectFactory extends BaseGameObjectFactory {
    /**
     * Creates a new Job in the Game and tracks it for all players.
     *
     * @param args - Data about the Job to set. Any keys matching a property in
     * the game object's class will be automatically set for you.
     * @returns A new Job hooked up in the game and ready for you to use.
     */
    public job<T extends JobArgs>(
        args: Readonly<T>,
    ): Job & T {
        return this.createGameObject("Job", Job, args);
    }

    /**
     * Creates a new Tile in the Game and tracks it for all players.
     *
     * @param args - Data about the Tile to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Tile hooked up in the game and ready for you to use.
     */
    public tile<T extends TileArgs>(
        args: Readonly<T>,
    ): Tile & T {
        return this.createGameObject("Tile", Tile, args);
    }

    /**
     * Creates a new Unit in the Game and tracks it for all players.
     *
     * @param args - Data about the Unit to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Unit hooked up in the game and ready for you to use.
     */
    public unit<T extends UnitArgs>(
        args: Readonly<T>,
    ): Unit & T {
        return this.createGameObject("Unit", Unit, args);
    }

}

/**
 * The shared namespace for Coreminer that is used to
 * initialize each game instance.
 */
export const Namespace = makeNamespace({
    AI,
    Game: CoreminerGame,
    GameManager: CoreminerGameManager,
    GameObjectFactory: CoreminerGameObjectFactory,
    GameSettingsManager: CoreminerGameSettingsManager,
    Player,

    // These are generated metadata that allow delta-merging values from
    // clients.
    // They are never intended to be directly interfaced with outside of the
    // Cerveau core developers.
    gameName: "Coreminer",
    gameSettingsManager: new CoreminerGameSettingsManager(),
    gameObjectsSchema: {
        AI: {
            attributes: {
            },
            functions: {
                runTurn: {
                    args: [
                    ],
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Game: {
            attributes: {
                currentPlayer: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                currentTurn: {
                    typeName: "int",
                },
                freeBombInterval: {
                    typeName: "int",
                },
                gameObjects: {
                    typeName: "dictionary",
                    keyType: {
                        typeName: "string",
                    },
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: GameObject,
                        nullable: false,
                    },
                },
                jobs: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Job,
                        nullable: false,
                    },
                },
                ladderCost: {
                    typeName: "int",
                },
                mapHeight: {
                    typeName: "int",
                },
                mapWidth: {
                    typeName: "int",
                },
                maxTurns: {
                    typeName: "int",
                },
                oreValue: {
                    typeName: "int",
                },
                players: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Player,
                        nullable: false,
                    },
                },
                session: {
                    typeName: "string",
                },
                shieldCost: {
                    typeName: "int",
                },
                supportCost: {
                    typeName: "int",
                },
                tiles: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Tile,
                        nullable: false,
                    },
                },
                timeAddedPerTurn: {
                    typeName: "int",
                },
                units: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Unit,
                        nullable: false,
                    },
                },
                victoryAmount: {
                    typeName: "int",
                },
            },
            functions: {
            },
        },
        GameObject: {
            attributes: {
                gameObjectName: {
                    typeName: "string",
                },
                id: {
                    typeName: "string",
                },
                logs: {
                    typeName: "list",
                    valueType: {
                        typeName: "string",
                    },
                },
            },
            functions: {
                log: {
                    args: [
                        {
                            argName: "message",
                            typeName: "string",
                        },
                    ],
                    returns: {
                        typeName: "void",
                    },
                },
            },
        },
        Job: {
            parentClassName: "GameObject",
            attributes: {
                cargoCapacity: {
                    typeName: "list",
                    valueType: {
                        typeName: "int",
                    },
                },
                cost: {
                    typeName: "int",
                },
                health: {
                    typeName: "list",
                    valueType: {
                        typeName: "int",
                    },
                },
                miningPower: {
                    typeName: "list",
                    valueType: {
                        typeName: "int",
                    },
                },
                moves: {
                    typeName: "list",
                    valueType: {
                        typeName: "int",
                    },
                },
                title: {
                    typeName: "string",
                    defaultValue: "miner",
                    literals: ["miner", "bomb"],
                },
            },
            functions: {
            },
        },
        Player: {
            parentClassName: "GameObject",
            attributes: {
                baseTile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: false,
                },
                bombs: {
                    typeName: "int",
                },
                clientType: {
                    typeName: "string",
                },
                hopperTiles: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Tile,
                        nullable: false,
                    },
                },
                lost: {
                    typeName: "boolean",
                },
                money: {
                    typeName: "int",
                },
                name: {
                    typeName: "string",
                },
                opponent: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                reasonLost: {
                    typeName: "string",
                },
                reasonWon: {
                    typeName: "string",
                },
                side: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Tile,
                        nullable: false,
                    },
                },
                spawnTiles: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Tile,
                        nullable: false,
                    },
                },
                timeRemaining: {
                    typeName: "float",
                },
                units: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Unit,
                        nullable: false,
                    },
                },
                value: {
                    typeName: "int",
                },
                won: {
                    typeName: "boolean",
                },
            },
            functions: {
            },
        },
        Tile: {
            parentClassName: "GameObject",
            attributes: {
                dirt: {
                    typeName: "int",
                },
                isBase: {
                    typeName: "boolean",
                },
                isFalling: {
                    typeName: "boolean",
                },
                isHopper: {
                    typeName: "boolean",
                },
                isLadder: {
                    typeName: "boolean",
                },
                isSupport: {
                    typeName: "boolean",
                },
                ore: {
                    typeName: "int",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: true,
                },
                shielding: {
                    typeName: "int",
                },
                tileEast: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileNorth: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileSouth: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                tileWest: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                units: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Unit,
                        nullable: false,
                    },
                },
                x: {
                    typeName: "int",
                },
                y: {
                    typeName: "int",
                },
            },
            functions: {
                spawnMiner: {
                    args: [
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Unit: {
            parentClassName: "GameObject",
            attributes: {
                bombs: {
                    typeName: "int",
                },
                buildingMaterials: {
                    typeName: "int",
                },
                dirt: {
                    typeName: "int",
                },
                health: {
                    typeName: "int",
                },
                job: {
                    typeName: "gameObject",
                    gameObjectClass: Job,
                    nullable: false,
                },
                maxCargoCapacity: {
                    typeName: "int",
                },
                maxHealth: {
                    typeName: "int",
                },
                maxMiningPower: {
                    typeName: "int",
                },
                maxMoves: {
                    typeName: "int",
                },
                miningPower: {
                    typeName: "int",
                },
                moves: {
                    typeName: "int",
                },
                ore: {
                    typeName: "int",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: true,
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
            },
            functions: {
                build: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "type",
                            typeName: "string",
                            defaultValue: "support",
                            literals: ["support", "ladder", "shield"],
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                dump: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "material",
                            typeName: "string",
                            defaultValue: "dirt",
                            literals: ["dirt", "ore", "bomb"],
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                mine: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                move: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                upgrade: {
                    args: [
                        {
                            argName: "attribute",
                            typeName: "string",
                            defaultValue: "health",
                            literals: ["health", "miningPower", "moves", "capacity"],
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
    },
    gameVersion: "8d537ee0d9bd5cd575dca2f2f08f184157cd9dce66a015e5598b3ee0e70e7ef6",
});