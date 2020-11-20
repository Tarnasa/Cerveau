import { BaseGameRequiredData } from "~/core/game";
import { BaseClasses } from "./";
import { Creature } from "./creature";
import { GalapagosGameManager } from "./game-manager";
import { GameObject } from "./game-object";
import { GalapagosGameSettingsManager } from "./game-settings";
import { Plant } from "./plant";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * Adapt, Evolve, Segfault.
 */
export class GalapagosGame extends BaseClasses.Game {
    /** The manager of this game, that controls everything around it. */
    public readonly manager!: GalapagosGameManager;

    /** The settings used to initialize the game, as set by players. */
    public readonly settings = Object.freeze(this.settingsManager.values);

    /**
     * The amount of health that a creature with a 0 endurance stat starts
     * with.
     */
    public readonly baseHealth!: number;

    /**
     * Every Creature in the game.
     */
    public creatures!: Creature[];

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
     * How much to damage an opponent per difference of carnivorism and
     * defense.
     */
    public readonly damageMultiplier!: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    public gameObjects!: { [id: string]: GameObject };

    /**
     * The amount of extra health from both breeding creatures required if you
     * have more total health than your opponent.
     */
    public readonly healthPerBreed!: number;

    /**
     * Multiplied by carnivorism to determine health gained from eating
     * creatures.
     */
    public readonly healthPerCarnivorism!: number;

    /**
     * The amount of extra health for each point of endurance.
     */
    public readonly healthPerEndurance!: number;

    /**
     * Multiplied by herbivorism to determine health gained from biting plants.
     */
    public readonly healthPerHerbivorism!: number;

    /**
     * The amount of health required to move.
     */
    public readonly healthPerMove!: number;

    /**
     * The amount of health lost after each of your turns.
     */
    public readonly healthPerTurn!: number;

    /**
     * The number of Tiles in the map along the y (vertical) axis.
     */
    public readonly mapHeight!: number;

    /**
     * The number of Tiles in the map along the x (horizontal) axis.
     */
    public readonly mapWidth!: number;

    /**
     * The maximum size a plant to grow to.
     */
    public readonly maxPlantSize!: number;

    /**
     * The maximum number of creatures that each player will start with.
     */
    public readonly maxStartingCreatures!: number;

    /**
     * The maximum number of plants that the map will start with.
     */
    public readonly maxStartingPlants!: number;

    /**
     * The maxmimum value that a stat (carnivorism, herbivorism, defense,
     * endurance, speed) can have.
     */
    public readonly maxStatValue!: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    public readonly maxTurns!: number;

    /**
     * The minimum number of creatures that each player will start with.
     */
    public readonly minStartingCreatures!: number;

    /**
     * The minimum number of plants that the map will start with.
     */
    public readonly minStartingPlants!: number;

    /**
     * Every Plant in the game.
     */
    public plants!: Plant[];

    /**
     * List of all the players in the game.
     */
    public players!: Player[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    public readonly session!: string;

    /**
     * All the tiles in the map, stored in Row-major order. Use `x + y *
     * mapWidth` to access the correct index.
     */
    public tiles!: Tile[];

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    public readonly timeAddedPerTurn!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    public newCreatures: Creature[];

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Game is created.
     *
     * @param settingsManager - The manager that holds initial settings.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        protected settingsManager: GalapagosGameSettingsManager,
        required: Readonly<BaseGameRequiredData>,
    ) {
        super(settingsManager, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        this.newCreatures = [] as Creature[];
        this.spawnPlants();
        this.spawnCreaturesNearPlants();
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
        return super.getTile(x, y) as Tile | undefined;
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    private spawnPlants(): void {
        const random = this.manager.random;
        let numPlants = random.int(
            Math.ceil(this.minStartingPlants / 2),
            Math.ceil(this.maxStartingPlants / 2),
        );
        while (numPlants) {
            const tryX = random.int(0, this.mapWidth / 2 - 1);
            const tryY = random.int(0, this.mapHeight - 1);
            const mirroredX = this.mapWidth - tryX - 1;
            const mirroredY = this.mapHeight - tryY - 1;
            const tile = this.getTile(tryX, tryY);
            const mirroredTile = this.getTile(mirroredX, mirroredY);
            if (
                !tile ||
                !mirroredTile ||
                tile.creature ||
                tile.plant ||
                mirroredTile.creature ||
                mirroredTile.plant
            ) {
                continue;
            }
            tile.plant = this.manager.create.plant({
                tile: tile,
                size: random.int(1, 15),
                growthRate: random.int(1, 10),
            });
            mirroredTile.plant = this.manager.create.plant({
                tile: mirroredTile,
                size: tile.plant.size,
                growthRate: tile.plant.growthRate,
            });
            this.plants.push(tile.plant);
            this.plants.push(mirroredTile.plant);
            numPlants -= 1;
        }
    }

    private spawnCreaturesNearPlants(): void {
        const random = this.manager.random;
        let numCreatures = random.int(
            this.minStartingCreatures,
            this.maxStartingCreatures,
        );
        const spawnZones = [] as Tile[];
        for (const plant of this.plants) {
            if (!plant.tile || plant.tile.x >= this.mapWidth / 2) {
                continue;
            }
            for (const tile of plant.tile.getNeighbors()) {
                if (
                    !tile.plant &&
                    !tile.creature &&
                    spawnZones.indexOf(tile) === -1
                ) {
                    spawnZones.push(tile);
                }
            }
        }
        let creaturesToSpawnRandomly = 0;
        if (numCreatures > spawnZones.length) {
            creaturesToSpawnRandomly = numCreatures - spawnZones.length;
            numCreatures = spawnZones.length;
        }
        let tries = 1000;
        while (numCreatures > 0 && tries > 0) {
            tries -= 1;
            const spawnZone = spawnZones[random.int(0, spawnZones.length - 1)];
            const mirroredX = this.mapWidth - spawnZone.x - 1;
            const mirroredY = this.mapHeight - spawnZone.y - 1;
            const mirroredTile = this.getTile(mirroredX, mirroredY);
            if (
                !spawnZone ||
                !mirroredTile ||
                spawnZone.creature ||
                mirroredTile.creature
            ) {
                continue;
            }
            this.spawnMirroredCreatures(spawnZone, mirroredTile);
            numCreatures -= 1;
        }
        creaturesToSpawnRandomly += numCreatures;
        this.spawnCreaturesAnywhere(creaturesToSpawnRandomly);
    }

    private spawnCreaturesAnywhere(numCreatures: number): void {
        const random = this.manager.random;
        while (numCreatures) {
            const tryX = random.int(0, this.mapWidth / 2 - 1);
            const tryY = random.int(0, this.mapHeight - 1);
            const mirroredX = this.mapWidth - tryX - 1;
            const mirroredY = this.mapHeight - tryY - 1;
            const tile = this.getTile(tryX, tryY);
            const mirroredTile = this.getTile(mirroredX, mirroredY);
            if (
                !tile ||
                !mirroredTile ||
                tile.creature ||
                tile.plant ||
                mirroredTile.creature ||
                mirroredTile.plant
            ) {
                continue;
            }
            this.spawnMirroredCreatures(tile, mirroredTile);
            numCreatures -= 1;
        }
    }

    private spawnMirroredCreatures(tile: Tile, mirroredTile: Tile): void {
        const random = this.manager.random;
        const maxStartingStatValue = Math.ceil(this.maxStatValue / 2);
        const newCreature = this.manager.create.creature({
            owner: this.players[0],
            tile: tile,
            parents: [],
            carnivorism: random.int(1, maxStartingStatValue),
            herbivorism: random.int(1, maxStartingStatValue),
            defense: random.int(1, maxStartingStatValue),
            speed: random.int(1, maxStartingStatValue),
            endurance: random.int(1, maxStartingStatValue),
        });
        const mirroredCreature = this.manager.create.creature({
            owner: this.players[1],
            tile: mirroredTile,
            parents: [],
            carnivorism: newCreature.carnivorism,
            herbivorism: newCreature.herbivorism,
            defense: newCreature.defense,
            speed: newCreature.speed,
            endurance: newCreature.endurance,
        });
        tile.creature = newCreature;
        mirroredTile.creature = mirroredCreature;
        this.newCreatures.push(newCreature);
        this.newCreatures.push(mirroredCreature);
    }

    // <<-- /Creer-Merge: protected-private-functions -->>
}
