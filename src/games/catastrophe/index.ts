// WARNING: Here be Dragons
// This file is generated by Creer, do not modify it
// It basically sets up all the classes, interfaces, types, and what-not that
// we need for TypeScript to know the base classes, while allowing for minimal
// code for developers to be forced to fill out.

/* eslint-disable @typescript-eslint/no-empty-interface */

// base game classes
import {
    BaseAI,
    BaseGame,
    BaseGameManager,
    BaseGameObject,
    BaseGameObjectFactory,
    BaseGameSettingsManager,
    BasePlayer,
    makeNamespace,
} from "~/core/game";

// mixins
import {
    TiledPlayer,
    TurnBasedPlayer,
    TwoPlayerPlayer,
    mixTiled,
    mixTurnBased,
    mixTwoPlayer,
} from "~/core/game/mixins";

// extract game object constructor args
import { FirstArgumentFromConstructor } from "~/utils";

/**
 * The interface that the Player for the Catastrophe game
 * must implement from mixed in game logic.
 */
export interface BaseCatastrophePlayer
    extends BasePlayer,
        TwoPlayerPlayer,
        TurnBasedPlayer,
        TiledPlayer {}

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

/** The base AI class for the Catastrophe game will mixin logic. */
class BaseCatastropheAI extends mixed.AI {}

/** The base Game class for the Catastrophe game will mixin logic. */
class BaseCatastropheGame extends mixed.Game {}

/** The base GameManager class for the Catastrophe game will mixin logic. */
class BaseCatastropheGameManager extends mixed.GameManager {}

/** The base GameObject class for the Catastrophe game will mixin logic. */
class BaseCatastropheGameObject extends mixed.GameObject {}

/** The base GameSettings class for the Catastrophe game will mixin logic. */
class BaseCatastropheGameSettings extends mixed.GameSettings {}

/** The Base classes that game classes build off of. */
export const BaseClasses = {
    AI: BaseCatastropheAI,
    Game: BaseCatastropheGame,
    GameManager: BaseCatastropheGameManager,
    GameObject: BaseCatastropheGameObject,
    GameSettings: BaseCatastropheGameSettings,
};

// Now all the base classes are created;
// so we can start importing/exporting the classes that need them.

/** All the possible properties for GameObject instances. */
export interface GameObjectProperties {}

/** All the possible properties for Job instances. */
export interface JobProperties {
    /**
     * The amount of energy this Job normally uses to perform its actions.
     */
    actionCost?: number;

    /**
     * How many combined resources a Unit with this Job can hold at once.
     */
    carryLimit?: number;

    /**
     * The number of moves this Job can make per turn.
     */
    moves?: number;

    /**
     * The amount of energy normally regenerated when resting at a shelter.
     */
    regenRate?: number;

    /**
     * The Job title.
     */
    title?:
        | "fresh human"
        | "cat overlord"
        | "soldier"
        | "gatherer"
        | "builder"
        | "missionary";

    /**
     * The amount of food per turn this Unit consumes. If there isn't enough
     * food for every Unit, all Units become starved and do not consume food.
     */
    upkeep?: number;
}

/** All the possible properties for Player instances. */
export interface PlayerProperties {
    /**
     * The overlord cat Unit owned by this Player.
     */
    cat?: Unit;

    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType?: string;

    /**
     * The amount of food owned by this player.
     */
    food?: number;

    /**
     * If the player lost the game or not.
     */
    lost?: boolean;

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
     * Every Structure owned by this Player.
     */
    structures?: Structure[];

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    timeRemaining?: number;

    /**
     * Every Unit owned by this Player.
     */
    units?: Unit[];

    /**
     * The total upkeep of every Unit owned by this Player. If there isn't
     * enough food for every Unit, all Units become starved and do not consume
     * food.
     */
    upkeep?: number;

    /**
     * If the player won the game or not.
     */
    won?: boolean;
}

/** All the possible properties for Structure instances. */
export interface StructureProperties {
    /**
     * The range of this Structure's effect. For example, a radius of 1 means
     * this Structure affects a 3x3 square centered on this Structure.
     */
    effectRadius?: number;

    /**
     * The number of materials in this Structure. Once this number reaches 0,
     * this Structure is destroyed.
     */
    materials?: number;

    /**
     * The owner of this Structure if any, otherwise undefined.
     */
    owner?: Player;

    /**
     * The Tile this Structure is on.
     */
    tile?: Tile;

    /**
     * The type of Structure this
     * is ('shelter', 'monument', 'wall', 'road', 'neutral').
     */
    type?: "neutral" | "shelter" | "monument" | "wall" | "road";
}

/** All the possible properties for Tile instances. */
export interface TileProperties {
    /**
     * The number of food dropped on this Tile.
     */
    food?: number;

    /**
     * The amount of food that can be harvested from this Tile per turn.
     */
    harvestRate?: number;

    /**
     * The number of materials dropped on this Tile.
     */
    materials?: number;

    /**
     * The Structure on this Tile if present, otherwise undefined.
     */
    structure?: Structure;

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
     * The amount of turns before this resource can be harvested.
     */
    turnsToHarvest?: number;

    /**
     * The Unit on this Tile if present, otherwise undefined.
     */
    unit?: Unit;

    /**
     * The x (horizontal) position of this Tile.
     */
    x?: number;

    /**
     * The y (vertical) position of this Tile.
     */
    y?: number;
}

/** All the possible properties for Unit instances. */
export interface UnitProperties {
    /**
     * Whether this Unit has performed its action this turn.
     */
    acted?: boolean;

    /**
     * The amount of energy this Unit has (from 0 to 100).
     */
    energy?: number;

    /**
     * The amount of food this Unit is holding.
     */
    food?: number;

    /**
     * The Job this Unit was recruited to do.
     */
    job?: Job;

    /**
     * The amount of materials this Unit is holding.
     */
    materials?: number;

    /**
     * The tile this Unit is moving to. This only applies to neutral fresh
     * humans spawned on the road. Otherwise, the tile this Unit is on.
     */
    movementTarget?: Tile;

    /**
     * How many moves this Unit has left this turn.
     */
    moves?: number;

    /**
     * The Player that owns and can control this Unit, or undefined if the Unit
     * is neutral.
     */
    owner?: Player;

    /**
     * The Units in the same squad as this Unit. Units in the same squad attack
     * and defend together.
     */
    squad?: Unit[];

    /**
     * Whether this Unit is starving. Starving Units regenerate energy at half
     * the rate they normally would while resting.
     */
    starving?: boolean;

    /**
     * The Tile this Unit is on.
     */
    tile?: Tile;

    /**
     * The number of turns before this Unit dies. This only applies to neutral
     * fresh humans created from combat. Otherwise, 0.
     */
    turnsToDie?: number;
}

/**
 * Argument overrides for Unit's attack function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface UnitAttackArgs {
    /**
     * The Tile to attack.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Unit's changeJob function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface UnitChangeJobArgs {
    /**
     * The name of the Job to change to.
     */
    job?: "soldier" | "gatherer" | "builder" | "missionary";
}

/**
 * Argument overrides for Unit's construct function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface UnitConstructArgs {
    /**
     * The Tile to construct the Structure on. It must have enough materials on
     * it for a Structure to be constructed.
     */
    tile?: Tile;
    /**
     * The type of Structure to construct on that Tile.
     */
    type?: "neutral" | "shelter" | "monument" | "wall" | "road";
}

/**
 * Argument overrides for Unit's convert function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface UnitConvertArgs {
    /**
     * The Tile with the Unit to convert.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Unit's deconstruct function. If you return an object
 * of this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface UnitDeconstructArgs {
    /**
     * The Tile to deconstruct. It must have a Structure on it.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Unit's drop function. If you return an object of this
 * interface from the invalidate functions, the value(s) you set will be used in
 * the actual function.
 */
export interface UnitDropArgs {
    /**
     * The Tile to drop materials/food on.
     */
    tile?: Tile;
    /**
     * The type of resource to drop ('materials' or 'food').
     */
    resource?: "materials" | "food";
    /**
     * The amount of the resource to drop. Amounts <= 0 will drop as much as
     * possible.
     */
    amount?: number;
}

/**
 * Argument overrides for Unit's harvest function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface UnitHarvestArgs {
    /**
     * The Tile you want to harvest.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Unit's move function. If you return an object of this
 * interface from the invalidate functions, the value(s) you set will be used in
 * the actual function.
 */
export interface UnitMoveArgs {
    /**
     * The Tile this Unit should move to.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Unit's pickup function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface UnitPickupArgs {
    /**
     * The Tile to pickup materials/food from.
     */
    tile?: Tile;
    /**
     * The type of resource to pickup ('materials' or 'food').
     */
    resource?: "materials" | "food";
    /**
     * The amount of the resource to pickup. Amounts <= 0 will pickup as much
     * as possible.
     */
    amount?: number;
}

/**
 * Argument overrides for Unit's rest function. If you return an object of this
 * interface from the invalidate functions, the value(s) you set will be used in
 * the actual function.
 */
export interface UnitRestArgs {}

/**
 * The default args passed to a constructor function for class
 * instances of GameObject.
 */
export type GameObjectConstructorArgs<T extends {} = {}> = Readonly<
    GameObjectProperties & T
>;

/**
 * The default args passed to a constructor function for class
 * instances of Job.
 */
export type JobConstructorArgs<T extends {} = {}> = Readonly<
    JobProperties & T
>;

/**
 * The default args passed to a constructor function for class
 * instances of Player.
 */
export type PlayerConstructorArgs<T extends {} = {}> = Readonly<
    BaseCatastrophePlayer & PlayerProperties & T
>;

/**
 * The default args passed to a constructor function for class
 * instances of Structure.
 */
export type StructureConstructorArgs<T extends {} = {}> = Readonly<
    StructureProperties & T
>;

/**
 * The default args passed to a constructor function for class
 * instances of Tile.
 */
export type TileConstructorArgs<T extends {} = {}> = Readonly<
    TileProperties & T
>;

/**
 * The default args passed to a constructor function for class
 * instances of Unit.
 */
export type UnitConstructorArgs<T extends {} = {}> = Readonly<
    UnitProperties & T
>;

export * from "./game-object";
export * from "./job";
export * from "./player";
export * from "./structure";
export * from "./tile";
export * from "./unit";
export * from "./game";
export * from "./game-manager";
export * from "./ai";

import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Structure } from "./structure";
import { Tile } from "./tile";
import { Unit } from "./unit";

import { AI } from "./ai";
import { CatastropheGame } from "./game";
import { CatastropheGameManager } from "./game-manager";
import { CatastropheGameSettingsManager } from "./game-settings";

/** The arguments used to construct a Job. */
export type JobArgs = FirstArgumentFromConstructor<typeof Job>;

/** The arguments used to construct a Structure. */
export type StructureArgs = FirstArgumentFromConstructor<typeof Structure>;

/** The arguments used to construct a Tile. */
export type TileArgs = FirstArgumentFromConstructor<typeof Tile>;

/** The arguments used to construct a Unit. */
export type UnitArgs = FirstArgumentFromConstructor<typeof Unit>;

/**
 * The factory that **must** be used to create any game objects in
 * the Catastrophe game.
 */
export class CatastropheGameObjectFactory extends BaseGameObjectFactory {
    /**
     * Creates a new Job in the Game and tracks it for all players.
     *
     * @param args - Data about the Job to set. Any keys matching a property in
     * the game object's class will be automatically set for you.
     * @returns A new Job hooked up in the game and ready for you to use.
     */
    public job<T extends JobArgs>(args: Readonly<T>): Job & T {
        return this.createGameObject("Job", Job, args);
    }

    /**
     * Creates a new Structure in the Game and tracks it for all players.
     *
     * @param args - Data about the Structure to set. Any keys matching a
     * property in the game object's class will be automatically set for you.
     * @returns A new Structure hooked up in the game and ready for you to use.
     */
    public structure<T extends StructureArgs>(
        args: Readonly<T>,
    ): Structure & T {
        return this.createGameObject("Structure", Structure, args);
    }

    /**
     * Creates a new Tile in the Game and tracks it for all players.
     *
     * @param args - Data about the Tile to set. Any keys matching a property in
     * the game object's class will be automatically set for you.
     * @returns A new Tile hooked up in the game and ready for you to use.
     */
    public tile<T extends TileArgs>(args: Readonly<T>): Tile & T {
        return this.createGameObject("Tile", Tile, args);
    }

    /**
     * Creates a new Unit in the Game and tracks it for all players.
     *
     * @param args - Data about the Unit to set. Any keys matching a property in
     * the game object's class will be automatically set for you.
     * @returns A new Unit hooked up in the game and ready for you to use.
     */
    public unit<T extends UnitArgs>(args: Readonly<T>): Unit & T {
        return this.createGameObject("Unit", Unit, args);
    }
}

/**
 * The shared namespace for Catastrophe that is used to
 * initialize each game instance.
 */
export const Namespace = makeNamespace({
    AI,
    Game: CatastropheGame,
    GameManager: CatastropheGameManager,
    GameObjectFactory: CatastropheGameObjectFactory,
    GameSettingsManager: CatastropheGameSettingsManager,
    Player,

    // These are generated metadata that allow delta-merging values from
    // clients.
    // They are never intended to be directly interfaced with outside of the
    // Cerveau core developers.
    gameName: "Catastrophe",
    gameSettingsManager: new CatastropheGameSettingsManager(),
    gameObjectsSchema: {
        AI: {
            attributes: {},
            functions: {
                runTurn: {
                    args: [],
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Game: {
            attributes: {
                catEnergyMult: {
                    typeName: "float",
                },
                currentPlayer: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                currentTurn: {
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
                harvestCooldown: {
                    typeName: "int",
                },
                jobs: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Job,
                        nullable: false,
                    },
                },
                lowerHarvestAmount: {
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
                monumentCostMult: {
                    typeName: "float",
                },
                monumentMaterials: {
                    typeName: "int",
                },
                neutralMaterials: {
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
                shelterMaterials: {
                    typeName: "int",
                },
                startingFood: {
                    typeName: "int",
                },
                starvingEnergyMult: {
                    typeName: "float",
                },
                structures: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Structure,
                        nullable: false,
                    },
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
                turnsBetweenHarvests: {
                    typeName: "int",
                },
                turnsToCreateHuman: {
                    typeName: "int",
                },
                turnsToLowerHarvest: {
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
                wallMaterials: {
                    typeName: "int",
                },
            },
            functions: {},
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
                actionCost: {
                    typeName: "float",
                },
                carryLimit: {
                    typeName: "int",
                },
                moves: {
                    typeName: "int",
                },
                regenRate: {
                    typeName: "float",
                },
                title: {
                    typeName: "string",
                    defaultValue: "fresh human",
                    literals: [
                        "fresh human",
                        "cat overlord",
                        "soldier",
                        "gatherer",
                        "builder",
                        "missionary",
                    ],
                },
                upkeep: {
                    typeName: "int",
                },
            },
            functions: {},
        },
        Player: {
            parentClassName: "GameObject",
            attributes: {
                cat: {
                    typeName: "gameObject",
                    gameObjectClass: Unit,
                    nullable: false,
                },
                clientType: {
                    typeName: "string",
                },
                food: {
                    typeName: "int",
                },
                lost: {
                    typeName: "boolean",
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
                structures: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Structure,
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
                upkeep: {
                    typeName: "int",
                },
                won: {
                    typeName: "boolean",
                },
            },
            functions: {},
        },
        Structure: {
            parentClassName: "GameObject",
            attributes: {
                effectRadius: {
                    typeName: "int",
                },
                materials: {
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
                type: {
                    typeName: "string",
                    defaultValue: "neutral",
                    literals: [
                        "neutral",
                        "shelter",
                        "monument",
                        "wall",
                        "road",
                    ],
                },
            },
            functions: {},
        },
        Tile: {
            parentClassName: "GameObject",
            attributes: {
                food: {
                    typeName: "int",
                },
                harvestRate: {
                    typeName: "int",
                },
                materials: {
                    typeName: "int",
                },
                structure: {
                    typeName: "gameObject",
                    gameObjectClass: Structure,
                    nullable: true,
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
                turnsToHarvest: {
                    typeName: "int",
                },
                unit: {
                    typeName: "gameObject",
                    gameObjectClass: Unit,
                    nullable: true,
                },
                x: {
                    typeName: "int",
                },
                y: {
                    typeName: "int",
                },
            },
            functions: {},
        },
        Unit: {
            parentClassName: "GameObject",
            attributes: {
                acted: {
                    typeName: "boolean",
                },
                energy: {
                    typeName: "float",
                },
                food: {
                    typeName: "int",
                },
                job: {
                    typeName: "gameObject",
                    gameObjectClass: Job,
                    nullable: false,
                },
                materials: {
                    typeName: "int",
                },
                movementTarget: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                moves: {
                    typeName: "int",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: true,
                },
                squad: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Unit,
                        nullable: false,
                    },
                },
                starving: {
                    typeName: "boolean",
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                turnsToDie: {
                    typeName: "int",
                },
            },
            functions: {
                attack: {
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
                changeJob: {
                    args: [
                        {
                            argName: "job",
                            typeName: "string",
                            defaultValue: "soldier",
                            literals: [
                                "soldier",
                                "gatherer",
                                "builder",
                                "missionary",
                            ],
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                construct: {
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
                            defaultValue: "neutral",
                            literals: [
                                "neutral",
                                "shelter",
                                "monument",
                                "wall",
                                "road",
                            ],
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                convert: {
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
                deconstruct: {
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
                drop: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "resource",
                            typeName: "string",
                            defaultValue: "materials",
                            literals: ["materials", "food"],
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                            defaultValue: 0,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                harvest: {
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
                pickup: {
                    args: [
                        {
                            argName: "tile",
                            typeName: "gameObject",
                            gameObjectClass: Tile,
                            nullable: false,
                        },
                        {
                            argName: "resource",
                            typeName: "string",
                            defaultValue: "materials",
                            literals: ["materials", "food"],
                        },
                        {
                            argName: "amount",
                            typeName: "int",
                            defaultValue: 0,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                rest: {
                    args: [],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
    },
    gameVersion:
        "ede84ab86376b00287c09558f05e8f2a61b92109d93aad9ebd3379ff4215fb53",
});
