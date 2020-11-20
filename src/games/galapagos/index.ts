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
 * The interface that the Player for the Galapagos game
 * must implement from mixed in game logic.
 */
export interface BaseGalapagosPlayer
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

/** The base AI class for the Galapagos game will mixin logic. */
class BaseGalapagosAI extends mixed.AI {}

/** The base Game class for the Galapagos game will mixin logic. */
class BaseGalapagosGame extends mixed.Game {}

/** The base GameManager class for the Galapagos game will mixin logic. */
class BaseGalapagosGameManager extends mixed.GameManager {}

/** The base GameObject class for the Galapagos game will mixin logic. */
class BaseGalapagosGameObject extends mixed.GameObject {}

/** The base GameSettings class for the Galapagos game will mixin logic. */
class BaseGalapagosGameSettings extends mixed.GameSettings {}

/** The Base classes that game classes build off of. */
export const BaseClasses = {
    AI: BaseGalapagosAI,
    Game: BaseGalapagosGame,
    GameManager: BaseGalapagosGameManager,
    GameObject: BaseGalapagosGameObject,
    GameSettings: BaseGalapagosGameSettings,
};

// Now all the base classes are created;
// so we can start importing/exporting the classes that need them.

/** All the possible properties for Creature instances. */
export interface CreatureProperties {
    /**
     * Indicates whether or not this creature can bite this turn.
     */
    canBite?: boolean;

    /**
     * Indicates whether or not this creature can breed this turn.
     */
    canBreed?: boolean;

    /**
     * The carnivore level of the creature. This increases damage to other
     * other creatures and health restored on kill.
     */
    carnivorism?: number;

    /**
     * The current amount of health that this creature has.
     */
    currentHealth?: number;

    /**
     * The defense of the creature. This reduces the amount of damage this
     * creature takes from being eaten.
     */
    defense?: number;

    /**
     * The endurance level of the creature. This increases the max health a
     * creature can have.
     */
    endurance?: number;

    /**
     * The herbivore level of the creature. This increases health restored from
     * eating plants.
     */
    herbivorism?: number;

    /**
     * Indicates whether or not this creature is still in an egg and cannot
     * bite, breed, or be bitten.
     */
    isEgg?: boolean;

    /**
     * The maximum amount of health this creature can have.
     */
    maxHealth?: number;

    /**
     * The amount of moves this creature has left this turn.
     */
    movementLeft?: number;

    /**
     * The owner of the creature.
     */
    owner?: Player;

    /**
     * The creatures that gave birth to this one.
     */
    parents?: Creature[];

    /**
     * The speed of the creature. This determines how many times a creature can
     * move in one turn.
     */
    speed?: number;

    /**
     * The Tile this Creature occupies.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Creature's bite function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface CreatureBiteArgs {
    /**
     * The Tile with a plant or creature to bite.
     */
    tile?: Tile;
}

/**
 * Argument overrides for Creature's breed function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface CreatureBreedArgs {
    /**
     * The Creature to breed with.
     */
    mate?: Creature;
}

/**
 * Argument overrides for Creature's move function. If you return an object of
 * this interface from the invalidate functions, the value(s) you set will be
 * used in the actual function.
 */
export interface CreatureMoveArgs {
    /**
     * The Tile to move to.
     */
    tile?: Tile;
}

/** All the possible properties for GameObject instances. */
export interface GameObjectProperties {}

/** All the possible properties for Plant instances. */
export interface PlantProperties {
    /**
     * The total number of turns it takes this plant to grow in size.
     */
    growthRate?: number;

    /**
     * The size of the plant.
     */
    size?: number;

    /**
     * The Tile this Plant occupies.
     */
    tile?: Tile;

    /**
     * The number of turns left until this plant will grow again.
     */
    turnsUntilGrowth?: number;
}

/** All the possible properties for Player instances. */
export interface PlayerProperties {
    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType?: string;

    /**
     * Every creature owned by this Player.
     */
    creatures?: Creature[];

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
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    timeRemaining?: number;

    /**
     * The combined health of all creatures this player had at the beginning of
     * this turn.
     */
    totalHealth?: number;

    /**
     * If the player won the game or not.
     */
    won?: boolean;
}

/** All the possible properties for Tile instances. */
export interface TileProperties {
    /**
     * The Creature on this Tile or undefined.
     */
    creature?: Creature;

    /**
     * The unhatched Creature on this Tile or undefined.
     */
    egg?: Creature;

    /**
     * The Plant on this Tile or undefined.
     */
    plant?: Plant;

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
     * The x (horizontal) position of this Tile.
     */
    x?: number;

    /**
     * The y (vertical) position of this Tile.
     */
    y?: number;
}

/**
 * The default args passed to a constructor function for class
 * instances of Creature.
 */
export type CreatureConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<CreatureProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of GameObject.
 */
export type GameObjectConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<GameObjectProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of Plant.
 */
export type PlantConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<PlantProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of Player.
 */
export type PlayerConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<BaseGalapagosPlayer & PlayerProperties & T>;

/**
 * The default args passed to a constructor function for class
 * instances of Tile.
 */
export type TileConstructorArgs<
    T extends Record<string, unknown> = Record<string, unknown>
> = Readonly<TileProperties & T>;

export * from "./creature";
export * from "./game-object";
export * from "./plant";
export * from "./player";
export * from "./tile";
export * from "./game";
export * from "./game-manager";
export * from "./ai";

import { Creature } from "./creature";
import { GameObject } from "./game-object";
import { Plant } from "./plant";
import { Player } from "./player";
import { Tile } from "./tile";

import { AI } from "./ai";
import { GalapagosGame } from "./game";
import { GalapagosGameManager } from "./game-manager";
import { GalapagosGameSettingsManager } from "./game-settings";

/** The arguments used to construct a Creature. */
export type CreatureArgs = FirstArgumentFromConstructor<typeof Creature>;

/** The arguments used to construct a Plant. */
export type PlantArgs = FirstArgumentFromConstructor<typeof Plant>;

/** The arguments used to construct a Tile. */
export type TileArgs = FirstArgumentFromConstructor<typeof Tile>;

/**
 * The factory that **must** be used to create any game objects in
 * the Galapagos game.
 */
export class GalapagosGameObjectFactory extends BaseGameObjectFactory {
    /**
     * Creates a new Creature in the Game and tracks it for all players.
     *
     * @param args - Data about the Creature to set. Any keys matching a
     * property in the game object's class will be automatically set for you.
     * @returns A new Creature hooked up in the game and ready for you to use.
     */
    public creature<T extends CreatureArgs>(args: Readonly<T>): Creature & T {
        return this.createGameObject("Creature", Creature, args);
    }

    /**
     * Creates a new Plant in the Game and tracks it for all players.
     *
     * @param args - Data about the Plant to set. Any keys matching a property
     * in the game object's class will be automatically set for you.
     * @returns A new Plant hooked up in the game and ready for you to use.
     */
    public plant<T extends PlantArgs>(args: Readonly<T>): Plant & T {
        return this.createGameObject("Plant", Plant, args);
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
}

/**
 * The shared namespace for Galapagos that is used to
 * initialize each game instance.
 */
export const Namespace = makeNamespace({
    AI,
    Game: GalapagosGame,
    GameManager: GalapagosGameManager,
    GameObjectFactory: GalapagosGameObjectFactory,
    GameSettingsManager: GalapagosGameSettingsManager,
    Player,

    // These are generated metadata that allow delta-merging values from
    // clients.
    // They are never intended to be directly interfaced with outside of the
    // Cerveau core developers.
    gameName: "Galapagos",
    gameSettingsManager: new GalapagosGameSettingsManager(),
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
                baseHealth: {
                    typeName: "int",
                },
                creatures: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Creature,
                        nullable: false,
                    },
                },
                currentPlayer: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: false,
                },
                currentTurn: {
                    typeName: "int",
                },
                damageMultiplier: {
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
                healthPerBreed: {
                    typeName: "int",
                },
                healthPerCarnivorism: {
                    typeName: "int",
                },
                healthPerEndurance: {
                    typeName: "int",
                },
                healthPerHerbivorism: {
                    typeName: "int",
                },
                healthPerMove: {
                    typeName: "int",
                },
                healthPerTurn: {
                    typeName: "int",
                },
                mapHeight: {
                    typeName: "int",
                },
                mapWidth: {
                    typeName: "int",
                },
                maxPlantSize: {
                    typeName: "int",
                },
                maxStartingCreatures: {
                    typeName: "int",
                },
                maxStartingPlants: {
                    typeName: "int",
                },
                maxStatValue: {
                    typeName: "int",
                },
                maxTurns: {
                    typeName: "int",
                },
                minStartingCreatures: {
                    typeName: "int",
                },
                minStartingPlants: {
                    typeName: "int",
                },
                plants: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Plant,
                        nullable: false,
                    },
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
            },
            functions: {},
        },
        Creature: {
            parentClassName: "GameObject",
            attributes: {
                canBite: {
                    typeName: "boolean",
                },
                canBreed: {
                    typeName: "boolean",
                },
                carnivorism: {
                    typeName: "int",
                },
                currentHealth: {
                    typeName: "int",
                },
                defense: {
                    typeName: "int",
                },
                endurance: {
                    typeName: "int",
                },
                herbivorism: {
                    typeName: "int",
                },
                isEgg: {
                    typeName: "boolean",
                },
                maxHealth: {
                    typeName: "int",
                },
                movementLeft: {
                    typeName: "int",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                    nullable: true,
                },
                parents: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Creature,
                        nullable: false,
                    },
                },
                speed: {
                    typeName: "int",
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
            },
            functions: {
                bite: {
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
                breed: {
                    args: [
                        {
                            argName: "mate",
                            typeName: "gameObject",
                            gameObjectClass: Creature,
                            nullable: false,
                        },
                    ],
                    invalidValue: undefined,
                    returns: {
                        typeName: "gameObject",
                        gameObjectClass: Creature,
                        nullable: true,
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
        Plant: {
            parentClassName: "GameObject",
            attributes: {
                growthRate: {
                    typeName: "int",
                },
                size: {
                    typeName: "int",
                },
                tile: {
                    typeName: "gameObject",
                    gameObjectClass: Tile,
                    nullable: true,
                },
                turnsUntilGrowth: {
                    typeName: "int",
                },
            },
            functions: {},
        },
        Player: {
            parentClassName: "GameObject",
            attributes: {
                clientType: {
                    typeName: "string",
                },
                creatures: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Creature,
                        nullable: false,
                    },
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
                timeRemaining: {
                    typeName: "float",
                },
                totalHealth: {
                    typeName: "int",
                },
                won: {
                    typeName: "boolean",
                },
            },
            functions: {},
        },
        Tile: {
            parentClassName: "GameObject",
            attributes: {
                creature: {
                    typeName: "gameObject",
                    gameObjectClass: Creature,
                    nullable: true,
                },
                egg: {
                    typeName: "gameObject",
                    gameObjectClass: Creature,
                    nullable: true,
                },
                plant: {
                    typeName: "gameObject",
                    gameObjectClass: Plant,
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
                x: {
                    typeName: "int",
                },
                y: {
                    typeName: "int",
                },
            },
            functions: {},
        },
    },
    gameVersion:
        "9337bc3d0f54640d13df30becf2e1bbda2e85a7be44fea6b072e638afc7e8dd7",
});