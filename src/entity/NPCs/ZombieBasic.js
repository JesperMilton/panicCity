//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends panicCity.entity.Zombie
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
 * ...
 */
panicCity.entity.ZombieBasic = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    panicCity.entity.Zombie.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.ZombieBasic.prototype = Object.create(panicCity.entity.Zombie.prototype);
panicCity.entity.ZombieBasic.prototype.constructor = panicCity.entity.ZombieBasic;

panicCity.entity.ZombieBasic.prototype.m_initStats = function () {
    panicCity.entity.Zombie.prototype.m_initStats.call(this);
    this.health = 20;
    this.damage = 10;

    this.acceleration = 0.5;
    this.speed = 0.5;
    this.velocity.max.x = 0.7;
    this.velocity.max.y = 0.7;
};

panicCity.entity.ZombieBasic.prototype.m_updateInput = function () {
    var dX = this.targets.getMemberAt(0).x - this.x;
    var dY = this.targets.getMemberAt(0).y - this.y;

    if (!this.isAttacking) {
        if (dY * dY > dX * dX) {
            if (dY > 0) {
                this.moveDown();
            } else if (dY < 0) {
                this.moveUp();
            }
        } else {
            if (dX > 0) {
                this.moveRight();
            } else if (dX < 0) {
                this.moveLeft();
            }
        }
    }
};

panicCity.entity.ZombieBasic.prototype.m_initAnimations = function () {
    panicCity.entity.Zombie.prototype.m_initAnimations.call(this);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    this.animation.create("attack", [9, 10, 11, 12, 13], 8, true);
};