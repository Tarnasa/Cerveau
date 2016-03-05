// Generated by Creer at 04:24PM on March 02, 2016 UTC, git hash: '0cc14891fb0c7c6bec65a23a8e2497e80f8827c1'

var Class = require(__basedir + "/utilities/class");
var serializer = require(__basedir + "/gameplay/serializer");
var log = require(__basedir + "/gameplay/log");
var GameObject = require("./gameObject");

//<<-- Creer-Merge: requires -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

// any additional requires you want can be required here safely between Creer re-runs

//<<-- /Creer-Merge: requires -->>

// @class Spider: A Spider in the game. The most basic unit.
var Spider = Class(GameObject, {
    /**
     * Initializes Spiders.
     *
     * @param {Object} data - a simple mapping passsed in to the constructor with whatever you sent with it. GameSettings are in here by key/value as well.
     */
    init: function(data) {
        GameObject.init.apply(this, arguments);

        /**
         * If this Spider is dead and has been removed from the game.
         *
         * @type {boolean}
         */
        this._addProperty("isDead", serializer.defaultBoolean(data.isDead));

        /**
         * The Nest that this Spider is currently on. Null when moving on a Web.
         *
         * @type {Nest}
         */
        this._addProperty("nest", serializer.defaultGameObject(data.nest));

        /**
         * The Player that owns this Spider, and can command it.
         *
         * @type {Player}
         */
        this._addProperty("owner", serializer.defaultGameObject(data.owner));


        //<<-- Creer-Merge: init -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

        // put any initialization logic here. the base variables should be set from 'data' above

        this.isDead = false;
        this.nest.spiders.push(this);
        //this.owner.spiders.push(this);

        //<<-- /Creer-Merge: init -->>
    },

    gameObjectName: "Spider",


    //<<-- Creer-Merge: added-functions -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.

    // You can add additional functions here. These functions will not be directly callable by client AIs

    //<<-- /Creer-Merge: added-functions -->>

});

module.exports = Spider;
