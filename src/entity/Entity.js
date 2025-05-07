//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Character base, includes methods for basic movement
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
 */

panicCity.entity.Entity = function (x, y, width, height, texture) {
    rune.display.Sprite.call(this, x, y, width, height, texture);

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * The default acceleration
     *
     * @type {number}
     * @public
     */
    this.acceleration = 1;

    /**
     * the default speed
     *
     * @type {number}
     * @public
     */
    this.speed = 1.1;

    /**
     * The default hitbox for the entity
     * @public
     * @type {Object}
     */
    this.hitbox.set(0, 0, 27, 26);

    this.m_initVelocity();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Entity.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Entity.prototype.constructor = panicCity.entity.Entity;

/**
 * Method for moving up
 * @public
 * @returns (undefined)
 */
panicCity.entity.Entity.prototype.moveUp = function () {
    this.velocity.y -= this.acceleration;
};

/**
 * Method for moving right
 * @public
 * @returns (undefined)
 */
panicCity.entity.Entity.prototype.moveRight = function () {
    this.velocity.x += this.acceleration;
    this.flippedX = true;
};

/**
 * Method for moving down
 * @public
 * @returns (undefined)
 */
panicCity.entity.Entity.prototype.moveDown = function () {
    this.velocity.y += this.acceleration;
};

/**
 * Method for moving left
 * @public
 * @returns (undefined)
 */
panicCity.entity.Entity.prototype.moveLeft = function () {
    this.velocity.x -= this.acceleration;
    this.flippedX = false;
};

/**
 * Initiates velocity
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
