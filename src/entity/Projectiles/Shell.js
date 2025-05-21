//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @class
 * 
 * @param {Object} player - The player object that initialized the Shell
 * @param {Object} game - The game object
 * 
 * Class for the Shell projectile, includes methods for movement
 */
 panicCity.entity.Shell = function (player, game) {

    /**
     * The object of the player that intiated the projectile
     * 
     * @type {panicCity.entity.Entity}
     * @public
     */
    this.player = player;

    /**
     * The game Object
     * 
     * @type {Object}
     * @public
     */
    this.game = game;

    /**
     * Array to keep track of all the bullets
     * 
     * @type {Array}
     * @public
     */
    this.bulletsArray = [];

    /**
     * The direction of the Shell
     * 
     * @type {string}
     * @public
     */
    this.direction = this.player.direction;

    this.m_updateMotion();
    this.m_timer();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Shell.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.entity.Shell.prototype.constructor = panicCity.entity.Shell;

/**
 * Checks which direction the player is facing and calls spawnBullets method
 * @private
 * @returns {undefined}
 */
 panicCity.entity.Shell.prototype.m_updateMotion = function () {
    var directionMap = {
        "UP":       ["UP", "UP-RIGHT", "UP-LEFT"],
        "DOWN":     ["DOWN", "DOWN-RIGHT", "DOWN-LEFT"],
        "LEFT":     ["LEFT", "DOWN-LEFT", "UP-LEFT"],
        "RIGHT":    ["RIGHT", "DOWN-RIGHT", "UP-RIGHT"],
        "UP-LEFT":  ["LEFT", "UP", "UP-LEFT"],
        "UP-RIGHT": ["RIGHT", "UP", "UP-RIGHT"],
        "DOWN-LEFT":["LEFT", "DOWN", "DOWN-LEFT"],
        "DOWN-RIGHT":["RIGHT", "DOWN", "DOWN-RIGHT"]
    };

    var directions = directionMap[this.direction] || ["UP", "UP-RIGHT", "UP-LEFT"];
    this.m_spawnBullets(directions);
};

/**
 * Spawns three bullets and adds it to the stage and array
 * 
 * @param {string} directions - The list of directions
 * 
 * @private
 * @returns {undefined}
 */
panicCity.entity.Shell.prototype.m_spawnBullets = function (directions) {
    directions.forEach(function(dir){
        var originalDirection = this.player.direction;
        this.player.direction = dir;
        var bullet = new panicCity.entity.Bullet(this.player);
        this.game.bullets.addMember(bullet);
        this.bulletsArray.push(bullet);
        this.player.direction = originalDirection;
    }.bind(this));
};

/**
 * Creates a timer and deletes the bullets after timer is up
 * 
 * @private
 * @returns {undefined}
 */
panicCity.entity.Shell.prototype.m_timer = function(){
    var timer = this.game.timers.create({
        duration: 300,
        onComplete: function () {
            this.bulletsArray.forEach(function (bullet) {
                this.game.bullets.removeMember(bullet, true);
            }, this);
            this.bulletsArray = [];
        }.bind(this)
    });
}