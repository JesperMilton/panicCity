//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.Graphic
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
panicCity.entity.Items = function (x, y, width, height, texture, game) {
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

panicCity.entity.Items.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Items.prototype.constructor = panicCity.entity.Items;

panicCity.entity.Items.prototype.init = function () {
    this.m_initAnimations();
    this.game.timers.create({
        duration: 5000,
        onComplete: function () {
            this.m_delete();
        }.bind(this),
    });
};

panicCity.entity.Items.prototype.m_initAnimations = function () {
    this.animation.create("idle", [0, 1], 2, true);
};


panicCity.entity.Items.prototype.heal = function (target) {
    target.forEachMember(function (target){
        target.heal(this.hp);
    }, this);
    this.m_delete();
}

panicCity.entity.Items.prototype.m_delete = function () {
    this.game.items.removeMember(this, true);
}