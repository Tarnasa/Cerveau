import { BaseGameObjectRequiredData } from "~/core/game";
import { PlantConstructorArgs } from "./";
import { GameObject } from "./game-object";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Plant in the game.
 */
export class Plant extends GameObject {
    /**
     * The total number of turns it takes this plant to grow in size.
     */
    public growthRate!: number;

    /**
     * The size of the plant.
     */
    public size!: number;

    /**
     * The Tile this Plant occupies.
     */
    public tile?: Tile;

    /**
     * The number of turns left until this plant will grow again.
     */
    public turnsUntilGrowth!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Plant is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: PlantConstructorArgs<{
            // <<-- Creer-Merge: constructor-args -->>
            // You can add more constructor args in here
            tile: Tile;
            size: number;
            growthRate: number;
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
        required: Readonly<BaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        this.tile = args.tile;
        this.size = args.size;
        this.growthRate = args.growthRate;
        this.turnsUntilGrowth = this.growthRate;
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
