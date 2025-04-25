//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * ...
 */

panicCity.entity.Entity = function (x, y, width, height, texture) {
    rune.display.Sprite.call(this, x, y, width, height, texture);

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {number}
     */
    this.acceleration = 1.6;

    /**
     * ...
     *
     * @type {number}
     */
    this.speed = 1.8;

    this.hitbox.set(0, 0, 27, 26);

    // this.debug = true;
    // this.hitbox.debug = true;

    this.m_initVelocity();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Entity.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Entity.prototype.constructor = panicCity.entity.Entity;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------


panicCity.entity.Entity.prototype.moveUp = function () {
    this.velocity.y -= this.acceleration;
};

panicCity.entity.Entity.prototype.moveRight = function () {
    this.velocity.x += this.acceleration;
    this.flippedX = true;
};

panicCity.entity.Entity.prototype.moveDown = function () {
    this.velocity.y += this.acceleration;
};

panicCity.entity.Entity.prototype.moveLeft = function () {
    this.velocity.x -= this.acceleration;
    this.flippedX = false;
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @private
 */
panicCity.entity.Entity.prototype.m_initVelocity = function () {
    this.velocity.drag.y = 0.08;
    this.velocity.drag.x = 0.08;
    this.velocity.max.x = this.speed;
    this.velocity.max.y = this.speed;
};
