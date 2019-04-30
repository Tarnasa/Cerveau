import { SettingsFromSchema } from "~/core/game/base/base-game-settings";
import { UnknownObject } from "~/utils";
import { BaseClasses } from "./";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * The settings manager for the Blobmaster game.
 */
export class BlobmasterGameSettingsManager extends BaseClasses.GameSettings {
    /**
     * This describes the structure of the game settings, and is used to
     * generate the values, as well as basic type and range checking.
     */
    public get schema() { // tslint:disable-line:typedef
        return this.makeSchema({
            // HACK: `super` should work. but schema is undefined on it at run time.
            // tslint:disable-next-line:no-any
            ...(super.schema || (this as any).schema),

            // Blobmaster game specific settings
            bigBlobSpeed: {
                description: "Blobs of size > 1 can move this many tiles per "
                           + "turn.",
                // <<-- Creer-Merge: bigBlobSpeed -->>
                default: 1,
                // <<-- /Creer-Merge: bigBlobSpeed -->>
            },
            blobCost: {
                description: "How much slime it costs to spawn a blob.",
                // <<-- Creer-Merge: blobCost -->>
                default: 50,
                // <<-- /Creer-Merge: blobCost -->>
            },
            blobUpkeep: {
                description: "Every blob costs its owner this amount of slime "
                           + "every turn.",
                // <<-- Creer-Merge: blobUpkeep -->>
                default: 10,  // This is related to the maximum number of maintainable blobs
                // Size (512) / blobUpKeep (10) == maximum 51 blobs
                // <<-- /Creer-Merge: blobUpkeep -->>
            },
            bonusSlimeForFewerBlobs: {
                description: "The player with fewer blobs is given this much "
                           + "slime per less blobs every turn.",
                // <<-- Creer-Merge: bonusSlimeForFewerBlobs -->>
                default: 5,
                // <<-- /Creer-Merge: bonusSlimeForFewerBlobs -->>
            },
            deathSlime: {
                description: "The amount of slime added to a blob or wall's "
                           + "tiles when it dies.",
                // <<-- Creer-Merge: deathSlime -->>
                default: 10,  // Make sure that grow+kill is not *always* better than scrounging
                // size**2(9)*deathSlime(10) - blobCost(50)*size+1/2(2) = 90 - 100 = -10
                // size**2(25)*deathSlime(10) - blobCost(50)*size+1/2(3) = 250 - 150 = 100 over 2 turns with 4 blobs
                // size**2(49)*deathSlime(10) - blobCost(50)*size+1/2(4) = 490 - 200 = 290 over 4 turns with 6 blobs
                // <<-- /Creer-Merge: deathSlime -->>
            },
            hardenReward: {
                description: "The amount of slime given back to a blob's owner "
                           + "when it turns into a wall.",
                // <<-- Creer-Merge: hardenReward -->>
                default: 50,  // This should probably make up for the upkeep cost of hardening
                // hardenTime(4) * upKeep(10) = 40
                // <<-- /Creer-Merge: hardenReward -->>
            },
            hardenTime: {
                description: "The number of turns it takes a blob to harden "
                           + "into a wall.",
                // <<-- Creer-Merge: hardenTime -->>
                default: 4,
                // <<-- /Creer-Merge: hardenTime -->>
            },
            maxDropsPerTurn: {
                description: "A Blobmaster can drop at most this many blobs "
                           + "per turn.",
                // <<-- Creer-Merge: maxDropsPerTurn -->>
                default: 1,
                // <<-- /Creer-Merge: maxDropsPerTurn -->>
            },
            maxPlayerSlime: {
                description: "The maximum amount of slime a player can hold at "
                           + "any one time.",
                // <<-- Creer-Merge: maxPlayerSlime -->>
                default: 1000,
                // Make sure a player can't win instantly
                // tilesCoveredToWin (256) / (blobSize**2)(9) * (blobCost(50)*blobSize(3)) = 4266
                // tilesCoveredToWin (256) / (blobSize**2)(25) * (blobCost(50)*blobSize(5)) = 2560
                // tilesCoveredToWin (256) / (blobSize**2)(49) * (blobCost(50)*blobSize(7)) = 1828
                // <<-- /Creer-Merge: maxPlayerSlime -->>
            },
            maxSlimeSpawnedOnTile: {
                description: "No more slime will spawn on a tile with at least "
                           + "this much slime already on it.",
                // <<-- Creer-Merge: maxSlimeSpawnedOnTile -->>
                default: 20,  // This becomes the optimal number of tiles owned by a single foraging blob
                // Size(512) / maxSlimeSpawnedOnTile(20) * (slimeSpeed(2) / myTurn(2)) == 25.6 blobs for optimal income
                // This also becomes the optimal income per-blob per-turn
                // maxSlimeSpawnedOnTile(20) * slimeSpeed(2) / myTurn(2) - upKeep(10) = 10
                // 12.8 * 10 = 120 per turn optimal if players balanced
                // <<-- /Creer-Merge: maxSlimeSpawnedOnTile -->>
            },
            perTileDropDelay: {
                description: "It takes the ceiling of this many turns times "
                           + "the number tiles away from your blobmaster to "
                           + "drop a blob onto a tile.",
                // <<-- Creer-Merge: perTileDropDelay -->>
                default: 0.5,
                // <<-- /Creer-Merge: perTileDropDelay -->>
            },
            pointsToWin: {
                description: "A player wins if they can reach this many "
                           + "cumulative tiles covered.",
                // <<-- Creer-Merge: pointsToWin -->>
                default: 25600,  // 200 * 16 * 32 = 102400
                // <<-- /Creer-Merge: pointsToWin -->>
            },
            slimeSpawnRate: {
                description: "This much slime is added to every empty tile "
                           + "every turn.",
                // <<-- Creer-Merge: slimeSpawnRate -->>
                default: 1,
                // <<-- /Creer-Merge: slimeSpawnRate -->>
            },
            smallBlobSpeed: {
                description: "1x1 blobs can move this many tiles per turn.",
                // <<-- Creer-Merge: smallBlobSpeed -->>
                default: 2,
                // <<-- /Creer-Merge: smallBlobSpeed -->>
            },
            tilesCoveredToWin: {
                description: "A player wins if they can cover this many tiles "
                           + "with their blobs on a single turn.",
                // <<-- Creer-Merge: tilesCoveredToWin -->>
                default: 256,  // 32 * 16 = 512
                // <<-- /Creer-Merge: tilesCoveredToWin -->>
            },
            wallLifespan: {
                description: "The number of turns a hardened blob wall lasts.",
                // <<-- Creer-Merge: wallLifespan -->>
                default: 25,
                // <<-- /Creer-Merge: wallLifespan -->>
            },
            // <<-- Creer-Merge: schema -->>

        // you can add more settings here, e.g.:
        /*
        someVariableLikeUnitHealth: {
            description: "Describe what this setting does for the players.",
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
                description: "The amount of time (in nano-seconds) to add after each player performs a turn.",
            },
            maxTurns: {
                // <<-- Creer-Merge: max-turns -->>
                default: 200,
                // <<-- /Creer-Merge: max-turns -->>
                min: 1,
                description: "The maximum number of turns before the game is force ended and a winner is determined.",
            },

            // Tiled settings
            mapWidth: {
                // <<-- Creer-Merge: map-width -->>
                default: 32,
                // <<-- /Creer-Merge: map-width -->>
                min: 2,
                description: "The width (in Tiles) for the game map to be initialized to.",
            },
            mapHeight: {
                // <<-- Creer-Merge: map-height -->>
                default: 16,
                // <<-- /Creer-Merge: map-height -->>
                min: 2,
                description: "The height (in Tiles) for the game map to be initialized to.",
            },

        });
    }

    /**
     * The current values for the game's settings
     */
    public values!: SettingsFromSchema<BlobmasterGameSettingsManager["schema"]>;

    /**
     * Try to invalidate all the game settings here, so invalid values do not
     * reach the game.
     * @param someSettings A subset of settings that will be tested
     * @returns An error if the settings fail to validate.
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