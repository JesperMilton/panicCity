//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *  The base class for all items. Responsible for  all base functions such as delete and heal.
 * 
 * @constructor
 * @extends rune.display.Sprite
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
 */
panicCity.entity.Items = function (x, y, width, height, texture, game) {
    
    /**
     * The Game object
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Sprite.call(this, x, y, width, height, texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Items.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Items.prototype.constructor = panicCity.entity.Items;

/**
 * @inheritDoc
 */
panicCity.entity.Items.prototype.init = function () {
    this.m_initAnimations();
    this.startTime = Date.now();
};

/**
 * @inheritDoc
 */
panicCity.entity.Items.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    
    if (Date.now() - this.startTime >= 5000) {
        this.m_delete();
    }
};

/**
 * Initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Items.prototype.m_initAnimations = function () {
    this.animation.create("idle", [0, 1], 2, true);
};

/**
 * Heals the specified target with the the items health points
 *
 * @return {undefined}
 * @public
 * 
 * @param {panicCity.entity.Entity} target - The target to be healed
 */
panicCity.entity.Items.prototype.heal = function (target) {
    target.forEachMember(function (target){
        target.heal(this.hp);
    }, this);
    this.game.updateScoretext(this.pointValue);
    this.m_delete();
}

/**
 * Removes the item from the game
 * 
 * @returns {undefined}
 * @private
 */
panicCity.entity.Items.prototype.m_delete = function () {
    this.game.items.removeMember(this, true);
}