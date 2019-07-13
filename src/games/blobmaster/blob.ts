import { IBaseGameObjectRequiredData } from "~/core/game";
import { IBlobDropArgs, IBlobHardenArgs, IBlobMoveArgs, IBlobProperties,
       } from "./";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
import { logger } from "~/core/logger";
// <<-- /Creer-Merge: imports -->>

/**
 * A Blob.  Can move and collect slime.
 */
export class Blob extends GameObject {
    /**
     * How many more Blobs this Blobmaster can spawn this turn.
     */
    public dropsLeft!: number;

    /**
     * Whether this Blob is a Blobmaster.
     */
    public isBlobmaster!: boolean;

    /**
     * Whether this Blob is dead and has been removed from the game.
     */
    public isDead!: boolean;

    /**
     * How many more moves this Blob can do this turn.
     */
    public movesLeft!: number;

    /**
     * The Player that owns and can control this Blob, or undefined if this is
     * a wall.
     */
    public owner?: Player;

    /**
     * The width and height of this Blob.
     */
    public size!: number;

    /**
     * The top-left (smallest x,y) Tile that this Blob occupies.
     */
    public tile?: Tile;

    /**
     * How many more turns till this wall disappears, or negative.
     */
    public turnsTillDead!: number;

    /**
     * How many more turns till this blob becomes a wall, or negative.
     */
    public turnsTillHardened!: number;

    // <<-- Creer-Merge: attributes -->>

    // Any additional member attributes can go here
    public tiles: Tile[];
    // NOTE: They will not be sent to the AIs, those must be defined
    // in the creer file.

    // <<-- /Creer-Merge: attributes -->>

    /**
     * Called when a Blob is created.
     *
     * @param args - Initial value(s) to set member variables to.
     * @param required - Data required to initialize this (ignore it).
     */
    constructor(
        args: Readonly<IBlobProperties & {
            // <<-- Creer-Merge: constructor-args -->>
            // You can add more constructor args in here
            owner: Player | undefined,
            tile: Tile,
            size: number,
            isBlobmaster: boolean,
            // <<-- /Creer-Merge: constructor-args -->>
        }>,
        required: Readonly<IBaseGameObjectRequiredData>,
    ) {
        super(args, required);

        // <<-- Creer-Merge: constructor -->>
        // setup any thing you need here
        this.owner = args.owner;
        this.size = args.size;
        this.isBlobmaster = args.isBlobmaster;
        this.tile = args.tile;
        this.tiles = [] as Tile[];
        for (let y = 0; y < this.size; y += 1) {
            for (let x = 0; x < this.size; x += 1) {
                const occupiedTile = this.game.getTile(
                    args.tile.x + x,
                    args.tile.y + y) as Tile;
                occupiedTile.blob = this;
                this.tiles.push(occupiedTile);
            }
        }
        this.isDead = false;
        this.turnsTillHardened = -1;
        this.turnsTillDead = -1;
        // <<-- /Creer-Merge: constructor -->>
    }

    // <<-- Creer-Merge: public-functions -->>

    // Any public functions can go here for other things in the game to use.
    // NOTE: Client AIs cannot call these functions, those must be defined
    // in the creer file.

    public resetMoves(): void {
        if (this.owner === this.game.currentPlayer && !this.isDead) {
            if (this.size === 1) {
                this.movesLeft = this.game.smallBlobSpeed;
            } else {
                this.movesLeft = this.game.bigBlobSpeed;
            }
            if (this.isBlobmaster) {
                this.dropsLeft = this.game.maxDropsPerTurn;
            }
        }
    }

    public handleHardenAndWallDeath(): void {
        if (this.owner !== undefined && this.turnsTillHardened === 0) {
            this.turnsTillHardened = -1;
            this.owner.slime += this.game.hardenReward;
            this.owner = undefined;
            this.turnsTillDead = this.game.wallLifespan;
        } else if (this.turnsTillHardened > 0) {
            this.turnsTillHardened -= 1;
        } else if (this.turnsTillDead === 0) {
            this.applyDamage(1);
        } else if (this.turnsTillDead > 0) {
            this.turnsTillDead -= 1;
        }
    }

    public pickupSlimeUnderneath(): void {
        if (this.owner !== undefined && this.tile !== undefined) {
            if (this.size === 1) {
                this.owner.slime += this.tile.slime;
                this.tile.slime = 0;
            }
        }
    }

    public canResize(newSize: number): boolean {
        if (this.tile === undefined) {
            return false;
        }
        const shift = (this.size - newSize) / 2;
        const newTile = this.game.getTile(
            this.tile.x + shift,
            this.tile.y + shift);
        if (newTile === undefined) {
            return false;
        }
        for (let y = 0; y < newSize; y += 1) {
            for (let x = 0; x < newSize; x += 1) {
                const occupiedTile = this.game.getTile(
                    newTile.x + x,
                    newTile.y + y);
                if (!occupiedTile) {
                    return false;
                } else if (occupiedTile.blob && occupiedTile.blob !== this) {
                    return false;
                }
            }
        }

        return true;
    }

    public resize(newSize: number): void {
        if (!this.canResize(newSize) || this.tile === undefined) {
            return;
        }
        for (const tile of this.tiles) {
            tile.blob = undefined;
        }
        const shift = (this.size - newSize) / 2;
        this.tile = this.game.getTile(
            this.tile.x + shift,
            this.tile.y + shift) as Tile;
        this.tiles = [] as Tile[];
        this.size = newSize;
        for (let y = 0; y < this.size; y += 1) {
            for (let x = 0; x < this.size; x += 1) {
                const occupiedTile = this.game.getTile(
                    this.tile.x + x,
                    this.tile.y + y) as Tile;
                this.tiles.push(occupiedTile);
                occupiedTile.blob = this;
            }
        }
    }

    public getMoveDirection(tile: Tile): string | undefined {
        let direction: string | undefined;
        for (const blobTile of this.tiles) {
            const maybeDirection = blobTile.getAdjacentDirection(tile);
            if (maybeDirection) {
                // If the direction is ambiguous, return undefined
                if (direction) {
                    return undefined;
                }
                direction = maybeDirection;
            }
        }
        return direction;
    }

    public applyDamage(damage: number): void {
        if (this.isDead) {
            return;
        }
        this.isDead = true;
        for (const tile of this.tiles) {
            tile.blob = undefined;
            tile.slime += this.game.deathSlime;  // Even walls spawn slime
        }
        this.tiles.length = 0;
        this.tile = undefined;
        this.movesLeft = 0;
    }

    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Invalidation function for drop. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to spawn a Blob on.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateDrop(
        player: Player,
        tile: Tile,
    ): void | string | IBlobDropArgs {
        // <<-- Creer-Merge: invalidate-drop -->>

        // Check all the arguments for drop here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }
        if (!tile) {
            return `No tile provided to move to.`;
        }
        if (!this.isBlobmaster) {
            return `Only the Blobmaster can drop() blobs.`;
        }
        if (player.slime < this.game.blobCost) {
            return `You do not have enough slime to drop a blob`;
        }
        if (tile.dropOwner) {
            return `A blob is already being dropped onto ${tile}`;
        }
        if (this.dropsLeft <= 0) {
            return `${this} does not have any drops left this turn.`;
        }

        // <<-- /Creer-Merge: invalidate-drop -->>
    }

    /**
     * Spawns a Blob in the air above the given tile.
     *
     * @param player - The player that called this.
     * @param tile - The Tile to spawn a Blob on.
     * @returns True if the drop worked, false otherwise.
     */
    protected async drop(player: Player, tile: Tile): Promise<boolean> {
        // <<-- Creer-Merge: drop -->>

        // Add logic here for drop.

        tile.dropOwner = player;
        if (this.tile === undefined) {
            logger.warn("Blobmaster's tile was undefined!");
            return false;
        }
        const xd = Math.abs(tile.x - this.tile.x);
        const yd = Math.abs(tile.y - this.tile.y);
        tile.dropTurnsLeft = Math.ceil((xd + yd) * this.game.perTileDropDelay);
        player.slime -= this.game.blobCost;
        player.drops.push(tile);
        this.dropsLeft -= 1;
        return true;

        // <<-- /Creer-Merge: drop -->>
    }

    /**
     * Invalidation function for harden. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateHarden(
        player: Player,
    ): void | string | IBlobHardenArgs {
        // <<-- Creer-Merge: invalidate-harden -->>

        // Check all the arguments for harden here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }
        if (this.isBlobmaster) {
            return `The Blobmaster cannot harden()`;
        }

        // <<-- /Creer-Merge: invalidate-harden -->>
    }

    /**
     * Initiates the process of hardening this blob into a wall.
     *
     * @param player - The player that called this.
     * @returns True if the harden worked, false otherwise.
     */
    protected async harden(player: Player): Promise<boolean> {
        // <<-- Creer-Merge: harden -->>

        // Add logic here for harden.

        this.turnsTillHardened = this.game.hardenTime;
        return true;

        // <<-- /Creer-Merge: harden -->>
    }

    /**
     * Invalidation function for move. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param tile - The tile for this Blob to move onto.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateMove(
        player: Player,
        tile: Tile,
    ): void | string | IBlobMoveArgs {
        // <<-- Creer-Merge: invalidate-move -->>

        // Check all the arguments for move here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }
        if (!tile) {
            return `No tile provided to move to.`;
        }
        if (this.movesLeft <= 0) {
            return `${this} does not have any moves left this turn.`;
        }

        const direction = this.getMoveDirection(tile);
        if (!direction) {
            return `${tile} is not adjacent to ${this} on ${this.tile}.`;
        }
        // Remove this blob from the map temporarily.
        for (const blobTile of this.tiles) {
            blobTile.blob = undefined;
        }
        let blocker = "";
        for (const blobTile of this.tiles) {
            const newTile = blobTile.getNeighbor(direction);
            if (!newTile) {
                blocker = `it would move off of the map.`;
                break;
            } else if (newTile.blob) {
                blocker = `it would hit ${newTile.blob} on ${newTile}`;
                break;
            }
        }
        // Add this blob back to the map.
        for (const blobTile of this.tiles) {
            blobTile.blob = this;
        }
        if (blocker) {
            return `${this} cannot move because ${blocker}.`;
        }

        // <<-- /Creer-Merge: invalidate-move -->>
    }

    /**
     * Moves this Blob onto the given tile.
     *
     * @param player - The player that called this.
     * @param tile - The tile for this Blob to move onto.
     * @returns True if the move worked, false otherwise.
     */
    protected async move(player: Player, tile: Tile): Promise<boolean> {
        // <<-- Creer-Merge: move -->>

        // Add logic here for move.

        // Remove this blob from the map temporarily.
        for (const blobTile of this.tiles) {
            blobTile.blob = undefined;
        }
        const direction = this.getMoveDirection(tile) as string;
        const tilesCopy = this.tiles.slice();
        let i = 0;
        for (const blobTile of tilesCopy) {
            const newTile = blobTile.getNeighbor(direction);
            if (!newTile || newTile.blob) {
                return false;
            }
            this.tiles[i] = newTile;
            i += 1;
        }
        // Add this blob back to the map.
        for (const blobTile of this.tiles) {
            blobTile.blob = this;
        }
        this.pickupSlimeUnderneath();
        this.tile = this.tiles[0];
        this.movesLeft -= 1;
        return true;

        // <<-- /Creer-Merge: move -->>
    }

    // <<-- Creer-Merge: protected-private-functions -->>

    private invalidate(player: Player): string | undefined {
        if (player !== this.game.currentPlayer) {
            return `It is not your turn, ${player}.`;
        }
        if (this.owner !== player) {
            return `You do not own ${this}.`;
        }
        if (this.isDead) {
            return `${this} is dead.`;
        }
        if (this.turnsTillHardened >= 0) {
            return `${this} is in the process of hardening.`;
        }
        return undefined;
    }

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
