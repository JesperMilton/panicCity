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
    this.health = 40;
    this.damage = 10;

    this.acceleration = 0.4;
    this.speed = 0.3;
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
                this.direction = "DOWN";
            } else if (dY < 0) {
                this.moveUp();
                this.direction = "UP";
            }
        } else {
            if (dX > 0) {
                this.moveRight();
                this.direction = "SIDE";
            } else if (dX < 0) {
                this.moveLeft();
                this.direction = "SIDE";
            }
        }
    }
};

/**
 * Method to initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBasic.prototype.m_initAnimations = function () {
    panicCity.entity.Zombie.prototype.m_initAnimations.call(this);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    this.animation.create("attack", [9, 10, 11, 12, 13], 8, true);
    this.animation.create("walkDown", [14, 15, 16, 17, 18], 8, true);
    this.animation.create("attackDown", [19, 20, 21, 22], 8, true);
    this.animation.create("walkUp", [23, 24, 25, 26, 27], 8, true);
    this.animation.create("attackUp", [28, 29, 30, 31, 32], 8, true); 
};