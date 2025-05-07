//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *  The base class for all Powerups. Responsible for  all base functions such as delete and heal.
 * 
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {object} game - The Game object
 * 
 * ...
 */
 panicCity.entity.Powerups = function (x, y, width, height, texture, game) {
    /**
     * The Game object
     * 
     * @type (Object)
     * @public
     */
    this.game = game;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Sprite.call(this, x, y, width, height, texture);
    // this.hitbox.debug = true;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Powerups.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Powerups.prototype.constructor = panicCity.entity.Powerups;

panicCity.entity.Powerups.prototype.init = function () {
    this.m_initAnimations();
    this.game.timers.create({
        duration: 5000,
        onComplete: function () {
            this.m_delete();
        }.bind(this),
    });
};

panicCity.entity.Powerups.prototype.m_initAnimations = function () {
    this.animation.create("idle", [0, 1], 2, true);
};


panicCity.entity.Powerups.prototype.heal = function (target) {
    target.forEachMember(function (target){
        target.heal(this.hp);
    }, this);
    this.game.updateScoretext(this.pointValue);
    this.m_delete();
}

panicCity.entity.Powerups.prototype.m_delete = function () {
    this.game.powerups.removeMember(this, true);
}