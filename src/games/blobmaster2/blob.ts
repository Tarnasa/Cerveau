import { IBaseGameObjectRequiredData } from "~/core/game";
import { IBlobMoveArgs, IBlobProperties, IBlobSwapArgs } from "./";
import { GameObject } from "./game-object";
import { Player } from "./player";
import { Tile } from "./tile";

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be placed here safely between creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * A Blob.  Can move and collect slime.
 */
export class Blob extends GameObject {
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
                    const blob = occupiedTile.blob;
                    if (blob.isBlobmaster || blob.owner !== this.owner) {
                        return false;
                    }
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
                if (occupiedTile.blob) {
                    occupiedTile.blob.applyDamage(999);
                }
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
            tile.slime += this.game.deathSlime;
        }
        this.tiles.length = 0;
        this.tile = undefined;
        this.movesLeft = 0;
    }

    // <<-- /Creer-Merge: public-functions -->>

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
            return `${tile} is not adjacent to ${this} on ${this.tile} with size ${this.size}.`;
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

    /**
     * Invalidation function for swap. Try to find a reason why the passed in
     * parameters are invalid, and return a human readable string telling them
     * why it is invalid.
     *
     * @param player - The player that called this.
     * @param blob - The blob to swap with.
     * @returns If the arguments are invalid, return a string explaining to
     * human players why it is invalid. If it is valid return nothing, or an
     * object with new arguments to use in the actual function.
     */
    protected invalidateSwap(
        player: Player,
        blob: Blob,
    ): void | string | IBlobSwapArgs {
        // <<-- Creer-Merge: invalidate-swap -->>

        // Check all the arguments for swap here and try to
        // return a string explaining why the input is wrong.
        // If you need to change an argument for the real function, then
        // changing its value in this scope is enough.

        const reason = this.invalidate(player);
        if (reason) {
            return reason;
        }
        if (!blob) {
            return `No blob provided to swap with.`;
        }
        if (this.movesLeft <= 0) {
            return `${this} does not have any moves left this turn.`;
        }
        if (this.size !== 1) {
            return `Cannot swap, this ${this} is not a small (size=1) blob.`;
        }
        if (blob.size !== 1) {
            return `Cannot swap, other ${this} is not a small (size=1) blob.`;
        }
        if (blob.tile === undefined) {
            return `Cannot swap, other blob ${blob} is dead.`;
        }

        const direction = this.getMoveDirection(blob.tile);
        if (!direction) {
            return `Cannot swap, ${this} is not adjacent to ${blob}.`;
        }

        // <<-- /Creer-Merge: invalidate-swap -->>
    }

    /**
     * Swaps this Blob with an adjacent blob.
     *
     * @param player - The player that called this.
     * @param blob - The blob to swap with.
     * @returns True if the swap worked, false otherwise.
     */
    protected async swap(player: Player, blob: Blob): Promise<boolean> {
        // <<-- Creer-Merge: swap -->>

        const thisOldTile = this.tile;
        this.tile = blob.tile as Tile;
        blob.tile = thisOldTile as Tile;
        {
            this.tiles[0] = this.tile;
            blob.tiles[0] = blob.tile;
            this.tile.blob = this;
            blob.tile.blob = blob;
        }
        this.movesLeft -= 1;
        return true;

        // <<-- /Creer-Merge: swap -->>
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
        return undefined;
    }

    // Any additional protected or pirate methods can go here.

    // <<-- /Creer-Merge: protected-private-functions -->>
}
