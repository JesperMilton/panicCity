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

    this.type = "INVINCIBILITY_BASE";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    panicCity.entity.Powerups.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.InvincibilityBase.prototype = Object.create(panicCity.entity.Powerups.prototype);
panicCity.entity.InvincibilityBase.prototype.constructor = panicCity.entity.InvincibilityBase;

panicCity.entity.InvincibilityBase.prototype.initPower = function(target){
    panicCity.entity.Powerups.prototype.initPower.call(this);
    target.forEachMember(function (target){
        console.log(target);
        target.invincible = true;
        this.game.timers.create({
            duration: 10000,
            onComplete: function () {
                target.invincible = false;
            },
        });
    }, this);
}