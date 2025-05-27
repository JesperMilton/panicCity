//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the InvincibilityPlayer class.
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
panicCity.entity.InvincibilityPlayer = function (x, y, width, height, texture, game) {
    /**
     * The type of powerup
     * 
     * @type {string}
     * @public
     */
    this.type = "INVINCIBILITY_PLAYER";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    panicCity.entity.Powerups.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.InvincibilityPlayer.prototype = Object.create(panicCity.entity.Powerups.prototype);
panicCity.entity.InvincibilityPlayer.prototype.constructor = panicCity.entity.InvincibilityPlayer;

/**
 * Makes player invincible for 5 seconds
 * 
 * @param {Object} target - The target to be affected
 * 
 * @return {undefined}
 * @public
 */
panicCity.entity.InvincibilityPlayer.prototype.initPower = function (target) {
    this.target = target;
    panicCity.entity.Powerups.prototype.initPower.call(this);
    this.target.changeHealthColor("#27dcf5");
    this.target.invincible = true;
}

/**
 * @inheritdoc
 */
panicCity.entity.InvincibilityPlayer.prototype.revertPower = function () {
    this.target.invincible = false;
    this.target.changeHealthColor("#6fff2c");
    panicCity.entity.Powerups.prototype.revertPower.call(this);
}