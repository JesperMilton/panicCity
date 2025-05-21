//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Shotgun class.
 *
 * @constructor
 * @extends panicCity.entity.Powerups
 *
 * @class
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {rune.scene.Scene} game - The Game object
 * 
 * The class for the basic Zombie, includes methods such as initStatus and movement logic
 */
 panicCity.entity.Shotgun = function (x, y, width, height, texture, game) {

    /**
     * The type of powerup
     * 
     * @type {string}
     * @public
     */
    this.type = "SHOTGUN";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    panicCity.entity.Powerups.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Shotgun.prototype = Object.create(panicCity.entity.Powerups.prototype);
panicCity.entity.Shotgun.prototype.constructor = panicCity.entity.Shotgun;

/**
 * Gives player a shotgun for 5 seconds
 * 
 * @param {Object} target - The target to be affected
 * 
 * @return {undefined}
 * @public
 */
panicCity.entity.Shotgun.prototype.initPower = function(target){
    panicCity.entity.Powerups.prototype.initPower.call(this);
    target.shotgun = true;
    this.game.timers.create({
        duration: 3000,
        onComplete: function () {
                target.initFlicker(2000, 150);
        }
    });
    this.game.timers.create({
        duration: 5000,
        onComplete: function () {
            target.shotgun = false;
        },
    });
}