import { SettingsFromSchema } from "~/core/game/base/base-game-settings";
import { UnknownObject } from "~/utils";
import { BaseClasses } from "./";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * The settings manager for the Galapagos game.
 */
export class GalapagosGameSettingsManager extends BaseClasses.GameSettings {
    /**
     * This describes the structure of the game settings, and is used to
     * generate the values, as well as basic type and range checking.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public get schema() {
        return this.makeSchema({
            // HACK: `super` should work. but schema is undefined on it at run time.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            ...(super.schema || (this as any).schema),

            // Galapagos game specific settings
            baseHealth: {
                description:
                    "The amount of health that a creature with a 0 " +
                    "endurance stat starts with.",
                // <<-- Creer-Merge: baseHealth -->>
                default: 100,
                min: 1,
                // <<-- /Creer-Merge: baseHealth -->>
            },

            damageMultiplier: {
                description:
                    "How much to damage an opponent per difference of " +
                    "carnivorism and defense.",
                // <<-- Creer-Merge: damageMultiplier -->>
                default: 5,
                min: 1,
                // <<-- /Creer-Merge: damageMultiplier -->>
            },

            healthPerBreed: {
                description:
                    "The amount of extra health from both breeding " +
                    "creatures required if you have more total health than " +
                    "your opponent.",
                // <<-- Creer-Merge: healthPerBreed -->>
                default: 5,
                // <<-- /Creer-Merge: healthPerBreed -->>
            },

            healthPerCarnivorism: {
                description:
                    "Multiplied by carnivorism to determine health gained " +
                    "from eating creatures.",
                // <<-- Creer-Merge: healthPerCarnivorism -->>
                default: 10,
                // <<-- /Creer-Merge: healthPerCarnivorism -->>
            },

            healthPerEndurance: {
                description:
                    "The amount of extra health for each point of " +
                    "endurance.",
                // <<-- Creer-Merge: healthPerEndurance -->>
                default: 10,
                // <<-- /Creer-Merge: healthPerEndurance -->>
            },

            healthPerHerbivorism: {
                description:
                    "Multiplied by herbivorism to determine health gained " +
                    "from biting plants.",
                // <<-- Creer-Merge: healthPerHerbivorism -->>
                default: 5,
                // <<-- /Creer-Merge: healthPerHerbivorism -->>
            },

            healthPerMove: {
                description: "The amount of health required to move.",
                // <<-- Creer-Merge: healthPerMove -->>
                default: 1,
                // <<-- /Creer-Merge: healthPerMove -->>
            },

            healthPerTurn: {
                description:
                    "The amount of health lost after each of your turns.",
                // <<-- Creer-Merge: healthPerTurn -->>
                default: 2,
                // <<-- /Creer-Merge: healthPerTurn -->>
            },

            maxPlantSize: {
                description: "The maximum size a plant to grow to.",
                // <<-- Creer-Merge: maxPlantSize -->>
                default: 10,
                min: 1,
                // <<-- /Creer-Merge: maxPlantSize -->>
            },

            maxStartingCreatures: {
                description:
                    "The maximum number of creatures that each player will " +
                    "start with.",
                // <<-- Creer-Merge: maxStartingCreatures -->>
                default: 8,
                min: 1,
                // <<-- /Creer-Merge: maxStartingCreatures -->>
            },

            maxStartingPlants: {
                description:
                    "The maximum number of plants that the map will start " +
                    "with.",
                // <<-- Creer-Merge: maxStartingPlants -->>
                default: 40,
                // <<-- /Creer-Merge: maxStartingPlants -->>
            },

            maxStatValue: {
                description:
                    "The maxmimum value that a stat (carnivorism, " +
                    "herbivorism, defense, endurance, speed) can have.",
                // <<-- Creer-Merge: maxStatValue -->>
                default: 10,
                // <<-- /Creer-Merge: maxStatValue -->>
            },

            minStartingCreatures: {
                description:
                    "The minimum number of creatures that each player will " +
                    "start with.",
                // <<-- Creer-Merge: minStartingCreatures -->>
                default: 4,
                min: 1,
                // <<-- /Creer-Merge: minStartingCreatures -->>
            },

            minStartingPlants: {
                description:
                    "The minimum number of plants that the map will start " +
                    "with.",
                // <<-- Creer-Merge: minStartingPlants -->>
                default: 10,
                // <<-- /Creer-Merge: minStartingPlants -->>
            },

            // <<-- Creer-Merge: schema -->>

            // you can add more settings here, e.g.:
            /*
            someVariableLikeUnitHealth: {
                description: "Describe what this does for the players.",
                default: 1337,
                min: 1,
            },
            */

            // <<-- /Creer-Merge: schema -->>

            // Base settings
            playerStartingTime: {
                // <<-- Creer-Merge: player-starting-time -->>
                default: 6e10, // 1 min in ns
                // <<-- /Creer-Merge: player-starting-time -->>
                min: 0,
                description: "The starting time (in ns) for each player.",
            },

            // Turn based settings
            timeAddedPerTurn: {
                // <<-- Creer-Merge: time-added-per-turn -->>
                default: 1e9, // 1 sec in ns,
                // <<-- /Creer-Merge: time-added-per-turn -->>
                min: 0,
                description:
                    "The amount of time (in nano-seconds) to add after " +
                    "each player performs a turn.",
            },
            maxTurns: {
                // <<-- Creer-Merge: max-turns -->>
                default: 200,
                // <<-- /Creer-Merge: max-turns -->>
                min: 1,
                description:
                    "The maximum number of turns before the game " +
                    "is force ended and a winner is determined.",
            },

            // Tiled settings
            mapWidth: {
                // <<-- Creer-Merge: map-width -->>
                default: 24,
                // <<-- /Creer-Merge: map-width -->>
                min: 2,
                description:
                    "The width (in Tiles) for the game map to be " +
                    "initialized to.",
            },
            mapHeight: {
                // <<-- Creer-Merge: map-height -->>
                default: 12,
                // <<-- /Creer-Merge: map-height -->>
                min: 2,
                description:
                    "The height (in Tiles) for the game map to be " +
                    "initialized to.",
            },
        });
    }

    /**
     * The current values for the game's settings.
     */
    public values!: SettingsFromSchema<GalapagosGameSettingsManager["schema"]>;

    /**
     * Try to invalidate all the game settings here, so invalid values do not
     * reach the game.
     *
     * @param someSettings - A subset of settings that will be tested.
     * @returns An error if the settings fail to validate, otherwise the
     * valid game settings for this game.
     */
    protected invalidate(someSettings: UnknownObject): UnknownObject | Error {
        const invalidated = super.invalidate(someSettings);
        if (invalidated instanceof Error) {
            return invalidated;
        }

        const settings = { ...this.values, ...someSettings, ...invalidated };

        // <<-- Creer-Merge: invalidate -->>

        // Write logic here to check the values in `settings`. If there is a
        // problem with the values a player sent, return an error with a string
        // describing why their value(s) are wrong

        // <<-- /Creer-Merge: invalidate -->>

        return settings;
    }
}
