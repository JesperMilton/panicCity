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

panicCity.entity.InvincibilityPlayer.prototype.initPower = function(target){
    panicCity.entity.Powerups.prototype.initPower.call(this);
    target.invincible = true;
    this.game.timers.create({
        duration: 5000,
        onComplete: function () {
            target.invincible = false;
        },
    });
}