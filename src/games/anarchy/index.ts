// This file is generated by Creer, do not modify it
// This basically sets up all the classes we need for TypeScript to know the
// base classes with minimal code for developers to be forced to fill out

// tslint:disable:max-classes-per-file - because we need to build a bunch of base class wrappers here

import {
    BaseAI, BaseGame, BaseGameManager, BaseGameObject, BaseGameObjectFactory,
    BaseGameSettings, IBaseGameSettings, IBasePlayer,
    ITurnBasedGameSettings, ITurnBasedPlayer,
    ITwoPlayerGameSettings, ITwoPlayerPlayer, makeNamespace, mixTurnBased, mixTwoPlayer,
} from "src/core/game";

import {
    IBuildingProperties,
    IFireDepartmentProperties,
    IForecastProperties,
    IPoliceDepartmentProperties,
    IWarehouseProperties,
    IWeatherStationProperties,
} from "./game-interfaces";

export interface IBaseAnarchyGameSettings extends IBaseGameSettings, ITurnBasedGameSettings, ITwoPlayerGameSettings {}
export interface IBaseAnarchyPlayer extends IBasePlayer, ITurnBasedPlayer, ITwoPlayerPlayer {}

const baseA = {
    AI: BaseAI,
    Game: BaseGame,
    GameManager: BaseGameManager,
    GameObject: BaseGameObject,
    GameSettings: BaseGameSettings,
};

const baseB = mixTurnBased(baseA);
const baseC = mixTwoPlayer(baseB);

const mixed = baseC;

export class BaseAnarchyAI extends mixed.AI {}
class BaseAnarchyGame extends mixed.Game {}
class BaseAnarchyGameManager extends mixed.GameManager {}
class BaseAnarchyGameObject extends mixed.GameObject {}
class BaseAnarchyGameSettings extends mixed.GameSettings {}

export const BaseClasses = {
    AI: BaseAnarchyAI,
    Game: BaseAnarchyGame,
    GameManager: BaseAnarchyGameManager,
    GameObject: BaseAnarchyGameObject,
    GameSettings: BaseAnarchyGameSettings,
};

// now all the base classes are created, so we can start importing/exporting the classes that need them

export * from "./game-object";
export * from "./building";
export * from "./forecast";
export * from "./fire-department";
export * from "./player";
export * from "./police-department";
export * from "./warehouse";
export * from "./weather-station";
export * from "./game";
export * from "./game-manager";
export * from "./ai";

import { Building } from "./building";
import { FireDepartment } from "./fire-department";
import { Forecast } from "./forecast";
import { Game } from "./game";
import { GameManager } from "./game-manager";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { PoliceDepartment } from "./police-department";
import { Warehouse } from "./warehouse";
import { WeatherStation } from "./weather-station";

import { AI } from "./ai";
import { AnarchyGameSettings } from "./game-settings";

export class AnarchyGameObjectFactory extends BaseGameObjectFactory {
    public Building(data: IBuildingProperties): Building {
        return this.createGameObject("Building", Building, data);
    }

    public FireDepartment(data: IFireDepartmentProperties): FireDepartment {
        return this.createGameObject("FireDepartment", FireDepartment, data);
    }

    public Forecast(data: IForecastProperties): Forecast {
        return this.createGameObject("Forecast", Forecast, data);
    }

    public PoliceDepartment(data: IPoliceDepartmentProperties): PoliceDepartment {
        return this.createGameObject("PoliceDepartment", PoliceDepartment, data);
    }

    public Warehouse(data: IWarehouseProperties): Warehouse {
        return this.createGameObject("Warehouse", Warehouse, data);
    }

    public WeatherStation(data: IWeatherStationProperties): WeatherStation {
        return this.createGameObject("WeatherStation", WeatherStation, data);
    }
}

const gameSettings = new AnarchyGameSettings();

export const Namespace = makeNamespace({
    AI,
    Game,
    GameManager,
    GameObjectFactory: AnarchyGameObjectFactory,
    Player,

    gameSettings,
    defaultGameSettings: gameSettings.defaults,

    // these are generated metadata that allow delta-merging values from clients
    // they are never intended to be directly interfaced with outside of
    // Cerveau core developers
    gameAISchema: {
        orders: {
            runTurn: {
                args: [],
                returns: {
                    typeName: "boolean",
                },
            },
        },
    },
    gameObjectsSchema: {
        Game: {
            attributes: {
                baseBribesPerTurn: {
                    typeName: "int",
                },
                buildings: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Building,
                    },
                },
                currentForecast: {
                    typeName: "gameObject",
                    gameObjectClass: Forecast,
                },
                currentPlayer: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                },
                currentTurn: {
                    typeName: "int",
                },
                forecasts: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Forecast,
                    },
                },
                gameObjects: {
                    typeName: "dictionary",
                    keyType: {
                        typeName: "string",
                    },
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: GameObject,
                    },
                },
                maxFire: {
                    typeName: "int",
                },
                maxForecastIntensity: {
                    typeName: "int",
                },
                maxTurns: {
                    typeName: "int",
                },
                nextForecast: {
                    typeName: "gameObject",
                    gameObjectClass: Forecast,
                },
                mapWidth: {
                    typeName: "int",
                },
                mapHeight: {
                    typeName: "int",
                },
                players: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Player,
                    },
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
                    invalidValue: undefined,
                    returns: {
                        typeName: "void",
                    },
                },
            },
        },
        Building: {
            parentClassName: "GameObject",
            attributes: {
                bribed: {
                    typeName: "boolean",
                },
                buildingEast: {
                    typeName: "gameObject",
                    gameObjectClass: Building,
                },
                buildingNorth: {
                    typeName: "gameObject",
                    gameObjectClass: Building,
                },
                buildingSouth: {
                    typeName: "gameObject",
                    gameObjectClass: Building,
                },
                buildingWest: {
                    typeName: "gameObject",
                    gameObjectClass: Building,
                },
                fire: {
                    typeName: "int",
                },
                health: {
                    typeName: "int",
                },
                isHeadquarters: {
                    typeName: "boolean",
                },
                owner: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
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
        FireDepartment: {
            parentClassName: "Building",
            attributes: {
                fireExtinguished: {
                    typeName: "int",
                },
            },
            functions: {
                extinguish: {
                    args: [
                        {
                            argName: "building",
                            typeName: "gameObject",
                            gameObjectClass: Building,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Forecast: {
            parentClassName: "GameObject",
            attributes: {
                controllingPlayer: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                },
                direction: {
                    typeName: "string",
                },
                intensity: {
                    typeName: "int",
                },
            },
            functions: {},
        },
        Player: {
            parentClassName: "GameObject",
            attributes: {
                timeRemaining: {
                    typeName: "float",
                },
                name: {
                    typeName: "string",
                },
                clientType: {
                    typeName: "string",
                },
                lost: {
                    typeName: "boolean",
                },
                reasonLost: {
                    typeName: "string",
                },
                won: {
                    typeName: "boolean",
                },
                reasonWon: {
                    typeName: "string",
                },
                bribesRemaining: {
                    typeName: "int",
                },
                buildings: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Building,
                    },
                },
                fireDepartments: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: FireDepartment,
                    },
                },
                headquarters: {
                    typeName: "gameObject",
                    gameObjectClass: Building,
                },
                opponent: {
                    typeName: "gameObject",
                    gameObjectClass: Player,
                },
                policeDepartments: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: PoliceDepartment,
                    },
                },
                warehouses: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: Warehouse,
                    },
                },
                weatherStations: {
                    typeName: "list",
                    valueType: {
                        typeName: "gameObject",
                        gameObjectClass: WeatherStation,
                    },
                },
            },
            functions: {},
        },
        PoliceDepartment: {
            parentClassName: "Building",
            attributes: {},
            functions: {
                raid: {
                    args: [
                        {
                            argName: "warehouse",
                            typeName: "gameObject",
                            gameObjectClass: Warehouse,
                        },
                    ],
                    invalidValue: undefined,
                    returns: {
                        typeName: "boolean",
                    },
                },
            },
        },
        Warehouse: {
            parentClassName: "Building",
            attributes: {
                exposure: {
                    typeName: "int",
                },
                fireAdded: {
                    typeName: "int",
                },
            },
            functions: {},
        },
        WeatherStation: {
            parentClassName: "Building",
            attributes: {
            },
            functions: {
                intensify: {
                    args: [
                        {
                            argName: "negative",
                            typeName: "boolean",
                            defaultValue: true,
                        },
                    ],
                    invalidValue: false,
                    returns: {
                        typeName: "boolean",
                    },
                },
                rotate: {
                    args: [
                        {
                            argName: "counterClockwise",
                            typeName: "boolean",
                            defaultValue: false,
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
});
