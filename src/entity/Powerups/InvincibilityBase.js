//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the InvincibilityBase class.
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
panicCity.entity.InvincibilityBase = function (x, y, width, height, texture, game) {

    /**
     * The type of powerup
     * 
     * @type {string}
     * @public
     */
    this.type = "INVINCIBILITY_BASE";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    panicCity.entity.Powerups.call(this, x, y, width, height, texture, game);

    /**
     * Delay time for flicker effect
     * 
     * @type {number}
     * @public
     */
    this.flickerDelay = 8000;

    /**
    * Delay time for powerup revert effect
    * 
    * @type {number}
    * @public
    */
    this.timeDelay = 10000;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.InvincibilityBase.prototype = Object.create(panicCity.entity.Powerups.prototype);
panicCity.entity.InvincibilityBase.prototype.constructor = panicCity.entity.InvincibilityBase;

/**
 * Makes base invincible for 10 seconds
 * 
 * @param {panicCity.entity.Base} target - The target to be affected
 * 
 * @return {undefined}
 * @public
 */
panicCity.entity.InvincibilityBase.prototype.initPower = function (target) {
    this.target = target;
    panicCity.entity.Powerups.prototype.initPower.call(this);
    this.target.changeHealthColor("#27dcf5");
    this.target.invincible = true;
}

/**
 * @inheritdoc
 */
panicCity.entity.InvincibilityBase.prototype.revertPower = function () {
    this.target.invincible = false;
    this.target.changeHealthColor("red");
    panicCity.entity.Powerups.prototype.revertPower.call(this);
}