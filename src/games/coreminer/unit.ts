import { IBaseGameObjectRequiredData } from "~/core/game";
import { IUnitBuildArgs, IUnitDumpArgs, IUnitMineArgs, IUnitMoveArgs,
         IUnitProperties, IUnitTransferArgs, IUnitUpgradeArgs } from "./";
import { GameObject } from "./game-object";
import { Job } from "./job";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A unit in the game.
 */
export class Unit extends GameObject {
    /**
     * The number of bombs being carried by this Unit. (0 to job cargo capacity
     * - other carried materials).
     */
    public bombs!: number;

    /**
     * The number of building materials carried by this Unit. (0 to job cargo
     * capacity - other carried materials).
     */
    public buildingMaterials!: number;

    /**
     * The amount of dirt carried by this Unit. (0 to job cargo capacity -
     * other carried materials).
     */
    public dirt!: number;

    /**
     * The remaining health of a Unit.
     */
    public health!: number;

    /**
     * The Job this Unit has.
     */
    public readonly job: Job;

    /**
     * The maximum amount of cargo this Unit can carry.
     */
    public maxCargoCapacity!: number;

    /**
     * The maximum health of this Unit.
     */
    public maxHealth!: number;

    /**
     * The maximum mining power of this Unit.
     */
    public maxMiningPower!: number;

    /**
     * The maximum moves this Unit can have.
     */
    public maxMoves!: number;

    /**
     * The remaining mining power this Unit has this turn.
     */
    public miningPower!: number;

    /**
     * The number of moves this Unit has left this turn.
     */
    public moves!: number;

    /**
     * The amount of ore carried by this Unit. (0 to job capacity - other
     * carried materials).
     */
    public ore!: number;

    /**
     * The Player that owns and can control this Unit.
     */
    public owner?: Player;

    /**
     * The Tile this Unit is on.
     */
    public tile?: Tile;

    /**
     * The upgrade level of this unit. Starts at 0.
     */
    public upgradeLevel!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Unit is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: Readonly<IUnitProperties & {
            // <<-- Creer-Merge: constructor-args -->>
            /** The job this unit will have */
            job: Job;
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
        required: Readonly<IBaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        this.job = args.job;
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Invalidation function for build. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to build on.
     * @param type - The structure to build (support, ladder, or shield).
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateBuild(
        player: Player,
        tile: Tile,
        type: "support" | "ladder" | "shield",
    ): void | string | IUnitBuildArgs {
        // <<-- Creer-Merge: invalidate-build -->>
        if (!this) {
            return "This unit does not exist!";
        }

        if (this.health === 0) {
            return "You can't build with a dead unit.";
        }

        if (tile.isBase) {
            return "You cannot build on a base.";
        }

        if (tile.isSupport) {
            return "You cannot build on a support.";
        }

        if (tile.isBase) {
            return "You cannot build on a ladder.";
        }

        if (tile.isFalling) {
            return "You cannot build on a falling tile.";
        }

        // Tile must be adjacent to or the same as the tile the unit is on
        if (tile !== this.tile?.tileEast && tile !== this.tile?.tileNorth &&
            tile !== this.tile?.tileWest && tile !== this.tile?.tileSouth && tile !== this.tile) {
            return "That tile is too far away to be built on.";
        }
        switch (type) {
            case "support":
                if (tile.dirt > 0 || tile.ore > 0) {
                    return "You can only build a support on an empty tile.";
                }
                else if (this.buildingMaterials < this.game.supportCost) {
                    return "You don't have enough building materials to build a support";
                }
                break;

            case "ladder":
                if (tile.dirt > 0 || tile.ore > 0) {
                    return "You can only build a ladder on an empty tile.";
                }
                else if (this.buildingMaterials < this.game.ladderCost) {
                    return "You don't have enough building materials to build a ladder";
                }
                break;

            case "shield":
                if (tile.dirt === 0 && tile.ore === 0) {
                    return "You can't build a shield on an empty tile.";
                }
                else if (tile.shielding === 2) {
                    return "This tile already has full shield.";
                }
                else if (this.buildingMaterials < this.game.shieldCost) {
                    return "You don't have enough building materials to build a shield";
                }
                break;

            default:
                return "Invalid build type.";
        }
        // <<-- /Creer-Merge: invalidate-build -->>
    }

    /**
     * Builds a support, shield, or ladder on Unit's tile, or an adjacent Tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to build on.
     * @param type - The structure to build (support, ladder, or shield).
     * @returns True if successfully built, False otherwise.
     */
    protected async build(
        player: Player,
        tile: Tile,
        type: "support" | "ladder" | "shield",
    ): Promise<boolean> {
        // <<-- Creer-Merge: build -->>
        switch (type) {
            case "support":
                tile.isSupport = true;
                this.buildingMaterials -= this.game.supportCost; // decrement building materials used
                break;

            case "ladder":
                tile.isLadder = true;
                this.buildingMaterials -= this.game.ladderCost;
                break;

            case "shield":
                tile.shielding = 2;
                this.buildingMaterials -= this.game.shieldCost;
        }

        return true;
        // <<-- /Creer-Merge: build -->>
    }

    /**
     * Invalidation function for dump. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The tile the materials will be dumped on.
     * @param material - The material the Unit will drop. 'dirt', 'ore', or
     * 'bomb'.
     * @param amount - The number of materials to drop. Amounts <= 0 will drop
     * all the materials.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateDump(
        player: Player,
        tile: Tile,
        material: "dirt" | "ore" | "bomb",
        amount: number,
    ): void | string | IUnitDumpArgs {
        // <<-- Creer-Merge: invalidate-dump -->>
        if (this.owner !== player || this.owner === undefined) {
            return `${this} isn't owned by you.`;
        }

        // Make sure the unit is alive.
        if (this.health <= 0) {
            return `${this} is dead.`;
        }

        // Make sure the unit is on a tile.
        if (!this.tile) {
            return `${this} is not on a tile.`;
        }

        // Checks if the tile is a ladder
        if (this.tile.isLadder && (material === `dirt` || material === `ore`)) {
            return `You cannot dump dirt or ore onto a ladder tile.`;
        }

        // Checks if the tile is a support
        if (this.tile.isSupport && (material === `dirt` || material === `ore`)) {
            return `You cannot dump dirt or ore onto a support tile.`;
        }

        // Checks if tile is falling.
        if (this.tile.isFalling && (material === `dirt` || material === `ore`)) {
            return `This tile is falling, you have bigger things to worry about than dumping dirt or ore.`;
        }

        // Checks if you have negative dirt.
        if (material === `dirt` && this.dirt < 0) {
            return "You have negative dirt. This should not happen. Contact devs.";
        }

        // Checks if you have dirt to dump
        if (material === `dirt` && this.dirt === 0) {
            return "You have no dirt to dump.";
        }

        if (material === `bomb` && this.bombs === 0) {
            return `You have no bombs to dump.`;
        }

        if (material === `bomb` && this.bombs < 0) {
            return `You have negative bombs. This should not happen. Contact devs.`;
        }

        if (material === `ore` && this.ore === 0) {
            return `You have no ore to dump.`;
        }

        if (material === `ore` && this.ore < 0) {
            return `You have negative ore. This should not happen. Contact devs.`;
        }
        // <<-- /Creer-Merge: invalidate-dump -->>
    }

    /**
     * Dumps materials from cargo to an adjacent tile. If the tile is a base or
     * hopper tile, materials are sold instead of placed.
     *
     * @param player - The player that called this.
     * @param tile - The tile the materials will be dumped on.
     * @param material - The material the Unit will drop. 'dirt', 'ore', or
     * 'bomb'.
     * @param amount - The number of materials to drop. Amounts <= 0 will drop
     * all the materials.
     * @returns True if successfully dumped materials, false otherwise.
     */
    protected async dump(
        player: Player,
        tile: Tile,
        material: "dirt" | "ore" | "bomb",
        amount: number,
    ): Promise<boolean> {
        // <<-- Creer-Merge: dump -->>
        if ((tile.isHopper || tile.isBase) && material === `ore`) {
            player.money += amount * this.game.oreValue;
            player.value += amount * this.game.oreValue;
            this.ore -= amount;
        }

        else if ((tile.isHopper || tile.isBase) && material === `dirt`) {
            player.money += amount;
            // Dirt grants no value
            this.dirt -= amount;
        }

        else if ((tile.isHopper || tile.isBase) && material === `bomb`) {
            player.money += amount * this.game.bombPrice; // sell bombs at sale price
            this.bombs -= amount;
        }

        else {
            // Not dumping into base/hopper
            if (material === `dirt`) {
                tile.dirt += amount;
                this.dirt -= amount;
            }

            if (material === `ore`) {
                tile.ore += amount;
                this.ore -= amount;
            }

            if (material === `bomb`) {
                const bomb = this.game.manager.create.unit({
                    job: this.game.jobs[1],
                    tile,
                });
                tile.units.push(bomb);
                this.bombs -= amount;
            }
        }

        return true;
        // <<-- /Creer-Merge: dump -->>
    }

    /**
     * Invalidation function for mine. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile the materials will be mined from.
     * @param amount - The amount of material to mine up. Amounts <= 0 will
     * mine all the materials that the Unit can.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMine(
        player: Player,
        tile: Tile,
        amount: number,
    ): void | string | IUnitMineArgs {
        // <<-- Creer-Merge: invalidate-mine -->>
        if (!this) {
            return `Unit doesn't exist`;
        }

        if (!this.health) {
            return `This unit is destroyed!`;
        }

        if (!tile) {
            return `Tile doesn't exist`;
        }

        if (player !== this.owner) {
            return `You do not own this unit`;
        }

        if (this.job.title !== this.game.jobs[0].title) {
            return `${this} must be a miner to mine.`;
        }

        const newLoad = (this.bombs * this.game.bombSize)
        + this.buildingMaterials + this.dirt + this.ore + amount;
        if (this.maxCargoCapacity <= newLoad) {
            return `${this} cannot hold ${amount} more materials!`;
        }

        if (tile.dirt + tile.ore <= 0) {
            return `No dirt or ore to mine!`;
        }
        // <<-- /Creer-Merge: invalidate-mine -->>
    }

    /**
     * Mines the Tile the Unit is on or an adjacent tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile the materials will be mined from.
     * @param amount - The amount of material to mine up. Amounts <= 0 will
     * mine all the materials that the Unit can.
     * @returns True if successfully mined, false otherwise.
     */
    protected async mine(
        player: Player,
        tile: Tile,
        amount: number,
    ): Promise<boolean> {
        // <<-- Creer-Merge: mine -->>

        // --- 80 Columns ---------------------------------------------------- #
        // A unit may mine ore and dirt from a tile. If a tile contains both, we
        // can make them mine ore first, then dirt, or vice versa, or alternate
        // between the two. Balancing will decide, just clearly pick one.
        // Update isFalling variables
        // Supports give support to 3 in a horizontal line sbove them (T shape
        // kinda)
        // Supports 3 above (add ore + dirt) - 3 * material (ore and dirt) of
        // block support is on

        const currentLoad = this.bombs + this.buildingMaterials +
                            this.dirt + this.ore;
        if (tile.dirt > 0) {
            const actualAmount = Math.min(tile.dirt, this.miningPower,
                this.job.cargoCapacity[this.upgradeLevel] - currentLoad);
            tile.dirt -= actualAmount;
            this.dirt += actualAmount;
        }
        else {
            const actualAmount = Math.min(tile.ore, this.miningPower,
                this.job.cargoCapacity[this.upgradeLevel] - currentLoad);
            tile.ore -= actualAmount;
            this.ore += actualAmount;
        }

        // Handle falling
        // if (tile.ore + tile.dirt <= 0 && tile.tileNorth && tile.tileNorth.) {
        //     tile.isFalling = true;
        // }
        // for (i = tile.x - 1; tile.x + 1 <= i; i++) {
        //     for (j = tile.y; tile.y + 3 <= j; j++) {
        //         if (!this.checkForSupport(
        //             this.game.tiles[i+(j*this.game.mapWidth)])) {
        //             this.game.tiles[i+(j*this.game.mapWidth)].isFalling = true;
        //         }
        //     }
        // }

        return true;

        // <<-- /Creer-Merge: mine -->>
    }

    /**
     * Invalidation function for move. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile this Unit should move to.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMove(
        player: Player,
        tile: Tile,
    ): void | string | IUnitMoveArgs {
        // <<-- Creer-Merge: invalidate-move -->>

        // Check all the arguments for move here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.
        if (!this) {
            return `This unit does not exist!`;
        }

        if (this.owner !== player) {
            return `This is not your unit!`;
        }

        if (this.game.currentPlayer !== player) {
            return `It is not your turn!`;
        }

        if (this.moves <= 0) {
            return `This unit is out of moves!`;
        }

        if (!this.tile) {
            return `This unit is not on a tile!`;
        }

        if (this.tile.dirt + this.tile.ore > 0) {
            return `This unit is stuck in a filled tile and cannot move!`;
        }

        if (this.tile.getNeighbor("North") === tile && !this.tile.isLadder) {
            return `This unit cannot fly upwards! It needs a ladder!`;
        }

        if (tile.dirt + tile.ore !== 0) {
            return `This unit cannot enter a filled tile!`;
        }

        // <<-- /Creer-Merge: invalidate-move -->>
    }

    /**
     * Moves this Unit from its current Tile to an adjacent Tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile this Unit should move to.
     * @returns True if it moved, false otherwise.
     */
    protected async move(player: Player, tile: Tile): Promise<boolean> {
        // <<-- Creer-Merge: move -->>
        let tilesFallen = 0;
        let tileBelow = tile.tileSouth;

        // Move unit
        if (!this.tile) {
            throw new Error(`${this} has no Tile to move from!`);
        }
        this.tile.units = this.tile.units.filter((value) => value !== this);
        this.tile = tile;
        tile.units.push(this);
        this.moves -= 1;

        // Checks the amount fallen
        while (tileBelow && tileBelow.dirt + tileBelow.ore === 0) {
            this.tile.units = this.tile.units.filter((value) => value !== this);
            this.tile = tileBelow;
            tileBelow = this.tile.tileSouth;
            tilesFallen++;
        }
        // Calculates the fall damage
        if (tilesFallen) {
            this.health = Math.min(this.health, this.health -
                ((tilesFallen - this.upgradeLevel) * (this.health * 0.5)));
        }

        return true;

        // <<-- /Creer-Merge: move -->>
    }

    /**
     * Invalidation function for transfer. Try to find a reason why the passed
     * in parameters are invalid, and return a human readable string telling
     * them why it is invalid.
     *
     * @param player - The player that called this.
     * @param unit - The Unit to transfer materials to.
     * @param resource - The type of resource to transfer.
     * @param amount - The amount of resource to transfer.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateTransfer(
        player: Player,
        unit: Unit,
        resource: "dirt" | "ore" | "bomb" | "buildingMaterials",
        amount: number,
    ): void | string | IUnitTransferArgs {
        // <<-- Creer-Merge: invalidate-transfer -->>

        if (!this) {
            return `This unit does not exist!`;
        }

        if (!this.health) {
            return `This unit is destroyed!`;
        }

        if (!unit) {
            return `The target unit does not exist!`;
        }

        if (!this.tile) {
            return `This unit is not on a tile!`;
        }

        if (!unit.tile) {
            return `The target unit is not on a tile!`;
        }

        if (this.tile.getNeighbors().indexOf(unit.tile) === -1 && this.tile !== unit.tile) {
            return `The target unit is not adjacent to this unit!`;
        }

        let actualAmount;
        switch (resource) {
            case "dirt":
                if (this.dirt < amount) {
                    return `This unit cannot transfer more dirt than they have!`;
                }
                actualAmount = amount === -1 ? this.dirt : amount;
                break;
            case "ore":
                if (this.ore < amount) {
                    return `This unit cannot transfer more ore than they have!`;
                }
                actualAmount = amount === -1 ? this.ore : amount;
                break;
            case "bomb":
                if (this.bombs < amount) {
                    return `This unit cannot transfer more bombs than they have!`;
                }
                actualAmount = amount === -1 ? this.bombs : amount;
                break;
            case "buildingMaterials":
                if (this.buildingMaterials < amount) {
                    return `This unit cannot transfer more building materials than they have!`;
                }
                actualAmount = amount === -1 ? this.buildingMaterials : amount;
                break;
            default:
                return `Invalid transfer material!`;
        }

        const unitCargoCapacity = unit.dirt + unit.ore + (unit.bombs * this.game.bombSize) + unit.buildingMaterials;
        if (actualAmount > unitCargoCapacity) {
            return `The target unit cannot hold that many materials!`;
        }

        // <<-- /Creer-Merge: invalidate-transfer -->>
    }

    /**
     * Transfers a resource from the one Unit to another.
     *
     * @param player - The player that called this.
     * @param unit - The Unit to transfer materials to.
     * @param resource - The type of resource to transfer.
     * @param amount - The amount of resource to transfer.
     * @returns True if successfully transfered, false otherwise.
     */
    protected async transfer(
        player: Player,
        unit: Unit,
        resource: "dirt" | "ore" | "bomb" | "buildingMaterials",
        amount: number,
    ): Promise<boolean> {
        // <<-- Creer-Merge: transfer -->>

        let actualAmount;
        switch (resource) {
            case "dirt":
                actualAmount = amount === -1 ? this.dirt : amount;
                this.dirt -= actualAmount;
                unit.dirt += actualAmount;
                break;
            case "ore":
                actualAmount = amount === -1 ? this.ore : amount;
                this.ore -= actualAmount;
                unit.ore += actualAmount;
                break;
            case "bomb":
                actualAmount = amount === -1 ? this.bombs : amount;
                this.bombs -= actualAmount;
                unit.bombs += actualAmount;
                break;
            case "buildingMaterials":
                actualAmount = amount === -1 ? this.buildingMaterials : amount;
                this.buildingMaterials -= actualAmount;
                unit.buildingMaterials += actualAmount;
        }

        return true;

        // <<-- /Creer-Merge: transfer -->>
    }

    /**
     * Invalidation function for upgrade. Try to find a reason why the passed
     * in parameters are invalid, and return a human readable string telling
     * them why it is invalid.
     *
     * @param player - The player that called this.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateUpgrade(
        player: Player,
    ): void | string | IUnitUpgradeArgs {
        // <<-- Creer-Merge: invalidate-upgrade -->>
        if (!player || player !== this.game.currentPlayer) {
            return `It's not your turn to dig deeper, ${player}.`;
        }

        if (!this) {
            return `This unit does not exist and can't dig deeper.`;
        }

        if (this.owner !== player || this.owner === undefined) {
            return `${this} isn't under your control to dig deeper.`;
        }

        if (this.health <= 0) {
            return `${this} is dead, it can't dig any deeper :(`;
        }

        if (!this.tile) {
            return `${this} is not on a tile. I think you might have dug too deep.`;
        }

        if (this.tile.owner !== player || !(this.tile.isBase || this.tile.isHopper)) {
            return `${this} must be on your base or hopper to upgrade!`;
        }

        if (this.upgradeLevel >= this.game.upgradePrice.length) {
            return `This unit is already fully upgraded!`;
        }

        if (player.money < this.game.upgradePrice[this.upgradeLevel + 1]) {
            return `You cannot afford this upgrade!`;
        }
        // <<-- /Creer-Merge: invalidate-upgrade -->>
    }

    /**
     * Upgrade this Unit.
     *
     * @param player - The player that called this.
     * @returns True if successfully upgraded, False otherwise.
     */
    protected async upgrade(player: Player): Promise<boolean> {
        // <<-- Creer-Merge: upgrade -->>
        this.upgradeLevel++;
        this.maxCargoCapacity = this.job.cargoCapacity[this.upgradeLevel];
        this.maxHealth = this.job.health[this.upgradeLevel];
        this.maxMiningPower = this.job.miningPower[this.upgradeLevel];
        this.maxMoves = this.job.moves[this.upgradeLevel];

        return true;

        // <<-- /Creer-Merge: upgrade -->>
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
