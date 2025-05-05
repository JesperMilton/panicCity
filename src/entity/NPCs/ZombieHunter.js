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
panicCity.entity.ZombieHunter = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    panicCity.entity.Zombie.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.ZombieHunter.prototype = Object.create(panicCity.entity.Zombie.prototype);
panicCity.entity.ZombieHunter.prototype.constructor = panicCity.entity.ZombieHunter;

panicCity.entity.ZombieHunter.prototype.m_initStats = function () {
    panicCity.entity.Zombie.prototype.m_initStats.call(this);
    this.health = 30;
    this.damage = 15;

    this.acceleration = 0.6;
    this.speed = 0.6;
    this.velocity.max.x = 0.8;
    this.velocity.max.y = 0.8;
};

panicCity.entity.ZombieHunter.prototype.m_updateInput = function () {
    var dX = this.newTarget.x - this.x;
    var dY = this.newTarget.y - this.y;

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
panicCity.entity.ZombieHunter.prototype.m_initAnimations = function () {
    panicCity.entity.Zombie.prototype.m_initAnimations.call(this);
    this.animation.create("walk", [0, 1, 2, 3, 4], 8, true);
    this.animation.create("attack", [5, 6, 7, 8, 9, 10], 8, true);
    this.animation.create("walkDown", [11, 12, 13, 14, 15], 8, true);
    this.animation.create("attackDown", [16, 17, 18, 19, 20], 8, true);
    this.animation.create("walkUp", [21, 22, 23, 24, 25], 8, true);
    this.animation.create("attackUp", [26, 27, 28, 29, 30], 8, true);
};