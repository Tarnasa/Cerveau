// Unit: A unit in the game.

const Class = require("classe");
const log = require(`${__basedir}/gameplay/log`);
const GameObject = require("./gameObject");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Unit: A unit in the game.
let Unit = Class(GameObject, {
    /**
     * Initializes Units.
     *
     * @param {Object} data - a simple mapping passed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        GameObject.init.apply(this, arguments);

        /**
         * Whether this Unit has performed its action this turn.
         *
         * @type {boolean}
         */
        this.acted = this.acted || false;

        /**
         * The amount of energy this Unit has (from 0.0 to 100.0).
         *
         * @type {number}
         */
        this.energy = this.energy || 0;

        /**
         * The amount of food this Unit is holding.
         *
         * @type {number}
         */
        this.food = this.food || 0;

        /**
         * The Job this Unit was recruited to do.
         *
         * @type {Job}
         */
        this.job = this.job || null;

        /**
         * The amount of materials this Unit is holding.
         *
         * @type {number}
         */
        this.materials = this.materials || 0;

        /**
         * The tile this Unit is moving to. This only applies to neutral fresh humans spawned on the road. Otherwise, the tile this Unit is on.
         *
         * @type {Tile}
         */
        this.movementTarget = this.movementTarget || null;

        /**
         * How many moves this Unit has left this turn.
         *
         * @type {number}
         */
        this.moves = this.moves || 0;

        /**
         * The Player that owns and can control this Unit, or null if the Unit is neutral.
         *
         * @type {Player}
         */
        this.owner = this.owner || null;

        /**
         * The Units in the same squad as this Unit. Units in the same squad attack and defend together.
         *
         * @type {Array.<Unit>}
         */
        this.squad = this.squad || [];

        /**
         * Whether this Unit is starving. Starving Units regenerate energy at half the rate they normally would while resting.
         *
         * @type {boolean}
         */
        this.starving = this.starving || false;

        /**
         * The Tile this Unit is on.
         *
         * @type {Tile}
         */
        this.tile = this.tile || null;

        /**
         * The number of turns before this Unit dies. This only applies to neutral fresh humans created from combat. Otherwise, 0.
         *
         * @type {number}
         */
        this.turnsToDie = this.turnsToDie || 0;


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        this.energy = data.energy || 100;
        this.job = data.job || this.game.jobs[0];
        this.moves = this.job.moves;
        this.owner = data.owner || null;
        this.tile = data.tile || null;
        this.turnsToDie = data.turnsToDie || -1;
        this.movementTarget = data.movementTarget || null;

        // Soldiers are in their own squad, and other units, while not in squads, should be in their own squad for ease of use.
        this.calculateSquad();

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Unit",


    /**
     * Invalidation function for attack
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to attack.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateAttack: function(player, tile, args) {
        // <<-- Creer-Merge: invalidateAttack -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: try to invalidate the game logic for Unit's attack function here
        return undefined; // meaning valid

        // <<-- /Creer-Merge: invalidateAttack -->>
    },

    /**
     * Attacks an adjacent Tile. Costs an action for each Unit in this Unit's squad. Units in the squad without an action don't participate in combat. Units in combat cannot move afterwards.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to attack.
     * @returns {boolean} True if successfully attacked, false otherwise.
     */
    attack: function(player, tile) {
        // <<-- Creer-Merge: attack -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: Put your game logic for the Unit's attack function here
        return false;

        // <<-- /Creer-Merge: attack -->>
    },


    /**
     * Invalidation function for changeJob
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {string} job - The name of the Job to change to.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateChangeJob: function(player, job, args) {
        // <<-- Creer-Merge: invalidateChangeJob -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: try to invalidate the game logic for Unit's changeJob function here
        return undefined; // meaning valid

        // <<-- /Creer-Merge: invalidateChangeJob -->>
    },

    /**
     * Changes this Unit's Job. Must be at max energy (100.0) to change Jobs.
     *
     * @param {Player} player - the player that called this.
     * @param {string} job - The name of the Job to change to.
     * @returns {boolean} True if successfully changed Jobs, false otherwise.
     */
    changeJob: function(player, job) {
        // <<-- Creer-Merge: changeJob -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: Put your game logic for the Unit's changeJob function here
        return false;

        // <<-- /Creer-Merge: changeJob -->>
    },


    /**
     * Invalidation function for construct
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to construct the Structure on. It must have enough materials on it for a Structure to be constructed.
     * @param {string} type - The type of Structure to construct on that Tile.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateConstruct: function(player, tile, type, args) {
        // <<-- Creer-Merge: invalidateConstruct -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        const reason = this._invalidate(player, true, true);

        if(reason) {
            return reason;
        }
        else if(this.job.title !== "builder") {
            return "Only builders can construct!";
        }
        else if(tile.structure) {
            return "This tile already has a structure! You cannot construct here!";
        }

        // Check structure type and if they have enough materials
        type = type.toLowerCase();
        let matsNeeded = 0;
        if(type === "wall") {
            matsNeeded = 50;
        }
        else if(type === "shelter") {
            matsNeeded = 100;
        }
        else if(type === "monument") {
            matsNeeded = 150;
        }
        else {
            return `Unknown structure '${type}'. You can only build 'wall', 'shelter', or 'monument'.`;
        }

        if(tile.materials < matsNeeded) {
            return `There aren't enough materials on that tile. You need ${matsNeeded} to construct a ${type}.`;
        }
        // <<-- /Creer-Merge: invalidateConstruct -->>
    },

    /**
     * Constructs a Structure on an adjacent Tile.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to construct the Structure on. It must have enough materials on it for a Structure to be constructed.
     * @param {string} type - The type of Structure to construct on that Tile.
     * @returns {boolean} True if successfully constructed a structure, false otherwise.
     */
    construct: function(player, tile, type) {
        // <<-- Creer-Merge: construct -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        tile.structure = this.create("Structure", {
            type: type.toLowerCase(),
            tile: tile,
        });

        const mult = this.inRange("monument") ? 0.5 : 1;
        this.energy -= this.job.actionCost * mult;
        tile.materials -= tile.structure.materials;

        return true;
        // <<-- /Creer-Merge: construct -->>
    },


    /**
     * Invalidation function for convert
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile with the Unit to convert.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateConvert: function(player, tile, args) {
        // <<-- Creer-Merge: invalidateConvert -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        const reason = this._invalidate(player, true, true);
        if(reason) {
            return reason;
        }

        if(this.job.title !== "missionary") {
            return "You unit isn't a missionary and is thus unable to convince units to join you cul- I mean kingdom.";
        }
        if(!tile) {
            return "You can't convert a nonexistent tile to your cause.";
        }
        if(tile !== this.tile.tileNorth && tile !== this.tile.tileSouth && tile !== this.tile.tileEast && tile !== this.tile.tileWest) {
            return "You can only convert units on ajacent tiles.";
        }
        if(!tile.unit) {
            return "You must convert a unit.";
        }
        if(tile.unit.owner) {
            return "That unit is already owned by somebody.";
        }
        // <<-- /Creer-Merge: invalidateConvert -->>
    },

    /**
     * Converts an adjacent Unit to your side.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile with the Unit to convert.
     * @returns {boolean} True if successfully converted, false otherwise.
     */
    convert: function(player, tile) {
        // <<-- Creer-Merge: convert -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        tile.unit.turnsToDie = -1;
        tile.unit.owner = player;
        tile.unit.energy = 100;
        tile.unit.acted = true;
        tile.unit.moves = 0;
        const mult = this.inRange("monument") ? 0.5 : 1;
        this.energy -= this.job.actionCost * mult;
        this.acted = true;
        player.units.push(tile.unit);
        return true;
        // <<-- /Creer-Merge: convert -->>
    },


    /**
     * Invalidation function for deconstruct
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to deconstruct. It must have a Structure on it.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateDeconstruct: function(player, tile, args) {
        // <<-- Creer-Merge: invalidateDeconstruct -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: try to invalidate the game logic for Unit's deconstruct function here
        return undefined; // meaning valid

        // <<-- /Creer-Merge: invalidateDeconstruct -->>
    },

    /**
     * Removes materials from an adjacent Tile's Structure. Soldiers do not gain materials from doing this, but can deconstruct friendly Structures as well.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to deconstruct. It must have a Structure on it.
     * @returns {boolean} True if successfully deconstructed, false otherwise.
     */
    deconstruct: function(player, tile) {
        // <<-- Creer-Merge: deconstruct -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: Put your game logic for the Unit's deconstruct function here
        return false;

        // <<-- /Creer-Merge: deconstruct -->>
    },


    /**
     * Invalidation function for drop
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to drop materials/food on.
     * @param {string} resource - The type of resource to drop ('material' or 'food').
     * @param {number} amount - The amount of the resource to drop. Amounts <= 0 will drop as much as possible.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateDrop: function(player, tile, resource, amount, args) {
        // <<-- Creer-Merge: invalidateDrop -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        const reason = this._invalidate(player, false, false);
        if(reason) {
            return reason;
        }

        if(!tile) {
            return "You must pass a tile to drop the resources onto.";
        }
        if(this.tile !== tile && tile !== this.tile.tileNorth && tile !== this.tile.tileSouth && tile !== this.tile.tileEast && tile !== this.tile.tileWest) {
            return "You can only drop things on or adjacent to your tile.";
        }
        if(!resource || resource === "") {
            return "You need to pass something in for resource";
        }
        if(resource[0] !== "f" && resource[0] !== "F" && resource[0] !== "m" && resource[0] !== "M") {
            return "Resource must be either 'food' or 'materials'.";
        }
        if(tile.structure) {
            if(tile.structure.type === "shelter") {
                if(tile.structure.owner !== player) {
                    return "You can't drop things in enemy shelters. Nice thought though.";
                }
                else if(resource[0] !== "f" && resource[0] !== "F") {
                    return "You can only drop food on shelters.";
                }
            }
            else if(tile.structure.type !== "road") {
                return "You can't drop resources on structures.";
            }
        }
        // <<-- /Creer-Merge: invalidateDrop -->>
    },

    /**
     * Drops some of the given resource on or adjacent to the Unit's Tile. Does not count as an action.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to drop materials/food on.
     * @param {string} resource - The type of resource to drop ('material' or 'food').
     * @param {number} amount - The amount of the resource to drop. Amounts <= 0 will drop as much as possible.
     * @returns {boolean} True if successfully dropped the resource, false otherwise.
     */
    drop: function(player, tile, resource, amount) {
        // <<-- Creer-Merge: drop -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        // Calculate how much is being dropped
        if(amount < 1) {
            // Drop it all
            if(resource[0] === "f" && resource[0] === "F") {
                amount = this.food;
            }
            else {
                amount = this.materials;
            }
        }

        // Drop the resource
        if(resource[0] === "f" && resource[0] === "F") {
            amount = Math.min(amount, this.food);
            if(tile.structure && tile.structure.type === "shelter") {
                this.player.food = this.player.food + amount;
            }
            else {
                tile.food += amount;
            }
            this.food -= amount;
        }
        else {
            amount = Math.min(amount, this.materials);
            tile.materials += amount;
            this.materials -= amount;
        }

        return true;
        // <<-- /Creer-Merge: drop -->>
    },


    /**
     * Invalidation function for harvest
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile you want to harvest.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateHarvest: function(player, tile, args) {
        // <<-- Creer-Merge: invalidateHarvest -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: try to invalidate the game logic for Unit's harvest function here
        return undefined; // meaning valid

        // <<-- /Creer-Merge: invalidateHarvest -->>
    },

    /**
     * Harvests the food on an adjacent Tile.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile you want to harvest.
     * @returns {boolean} True if successfully harvested, false otherwise.
     */
    harvest: function(player, tile) {
        // <<-- Creer-Merge: harvest -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: Put your game logic for the Unit's harvest function here
        return false;

        // <<-- /Creer-Merge: harvest -->>
    },


    /**
     * Invalidation function for move
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile this Unit should move to.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateMove: function(player, tile, args) {
        // <<-- Creer-Merge: invalidateMove -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
        const reason = this._invalidate(player, false, false);
        if(reason) {
            return reason;
        }

        if(tile === null) {
            return "You can't move to a tile that doesn't exist.";
        }
        if(tile.unit !== null) {
            return `Can't move because the tile is already occupied by ${tile.unit}.`;
        }
        if(this.moves < 1) {
            return "Your unit is out of moves!";
        }
        if(tile !== this.tile.tileEast && tile !== this.tile.tileWest && tile !== this.tile.tileNorth && tile !== this.tile.tileSouth) {
            return "Your unit must move to a tile to the north, south, east, or west.";
        }
        if(tile.structure && tile.structure.type !== "road" && (tile.structure.type !== "shelter" || tile.structure.owner !== this.owner)) {
            return "Units cannot move onto structures other than roads and friendly shelters.";
        }
        // <<-- /Creer-Merge: invalidateMove -->>
    },

    /**
     * Moves this Unit from its current Tile to an adjacent Tile.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile this Unit should move to.
     * @returns {boolean} True if it moved, false otherwise.
     */
    move: function(player, tile) {
        // <<-- Creer-Merge: move -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Deduct the move from the unit
        this.moves -= 1;

        // Update the tiles
        this.tile.unit = null;
        this.tile = tile;
        tile.unit = this;

        // Recalculate squads
        this.owner.calculateSquads();
        return true;

        // <<-- /Creer-Merge: move -->>
    },


    /**
     * Invalidation function for pickup
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to pickup materials/food from.
     * @param {string} resource - The type of resource to pickup ('material' or 'food').
     * @param {number} amount - The amount of the resource to pickup. Amounts <= 0 will pickup as much as possible.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidatePickup: function(player, tile, resource, amount, args) {
        // <<-- Creer-Merge: invalidatePickup -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: try to invalidate the game logic for Unit's pickup function here
        return undefined; // meaning valid

        // <<-- /Creer-Merge: invalidatePickup -->>
    },

    /**
     * Picks up some materials or food on or adjacent to the Unit's Tile. Does not count as an action.
     *
     * @param {Player} player - the player that called this.
     * @param {Tile} tile - The Tile to pickup materials/food from.
     * @param {string} resource - The type of resource to pickup ('material' or 'food').
     * @param {number} amount - The amount of the resource to pickup. Amounts <= 0 will pickup as much as possible.
     * @returns {boolean} True if successfully picked up a resource, false otherwise.
     */
    pickup: function(player, tile, resource, amount) {
        // <<-- Creer-Merge: pickup -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: Put your game logic for the Unit's pickup function here
        return false;

        // <<-- /Creer-Merge: pickup -->>
    },


    /**
     * Invalidation function for rest
     * Try to find a reason why the passed in parameters are invalid, and return a human readable string telling them why it is invalid
     *
     * @param {Player} player - the player that called this.
     * @param {Object} args - a key value table of keys to the arg (passed into this function)
     * @returns {string|undefined} a string that is the invalid reason, if the arguments are invalid. Otherwise undefined (nothing) if the inputs are valid.
     */
    invalidateRest: function(player, args) {
        // <<-- Creer-Merge: invalidateRest -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: try to invalidate the game logic for Unit's rest function here
        return undefined; // meaning valid

        // <<-- /Creer-Merge: invalidateRest -->>
    },

    /**
     * Regenerates energy. Must be in range of a friendly shelter to rest. Costs an action. Units cannot move after resting.
     *
     * @param {Player} player - the player that called this.
     * @returns {boolean} True if successfully rested, false otherwise.
     */
    rest: function(player) {
        // <<-- Creer-Merge: rest -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // Developer: Put your game logic for the Unit's rest function here
        return false;

        // <<-- /Creer-Merge: rest -->>
    },


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    /**
     * Tries to invalidate args for an action function
     *
     * @param {Player} player - the player commanding this Unit
     * @param {boolean} [checkAction] - true to check if this Unit has an action
     * @param {boolean} [checkEnergy] - true to check if this Unit has enough energy
     * @returns {string|undefined} the reason this is invalid, undefined if looks valid so far
     */
    _invalidate: function(player, checkAction, checkEnergy) {
        if(!player || player !== this.game.currentPlayer) {
            return `It isn't your turn, ${player}.`;
        }

        if(this.owner !== player) {
            return `${this} isn't owned by you.`;
        }

        if(checkAction && !this.action) {
            return `${this} cannot perform another action this turn.`;
        }

        const mult = this.inRange("monument") ? 0.5 : 1;
        if(checkEnergy && this.energy < this.job.actionCost * mult) {
            return `${this} doesn't have enough energy.`;
        }
    },

    /**
     * Checks if this unit is in range of a structure of the given type.
     *
     * @param {string} type - the type of structure to search for
     * @returns {Structure|undefined} the structure this unit is in range of, or undefined if none exist
     */
    inRange: function(type) {
        return this.game.tiles.find(function(tile) {
            const structure = tile.structure;
            if(!structure || structure.owner !== this.owner || structure.type !== type) {
                return false;
            }

            const radius = structure.effectRadius;
            return Math.abs(this.tile.x - tile.x) <= radius && Math.abs(this.tile.y - tile.y) <= radius;
        }, this);
    },
    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Unit;