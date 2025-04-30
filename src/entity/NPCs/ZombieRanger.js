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
panicCity.entity.ZombieRanger = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Zombie.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.ZombieRanger.prototype = Object.create(panicCity.entity.Zombie.prototype);
panicCity.entity.ZombieRanger.prototype.constructor = panicCity.entity.ZombieRanger;

panicCity.entity.ZombieRanger.prototype.m_initStats = function () {
    panicCity.entity.Zombie.prototype.m_initStats.call(this);
    this.health = 10;
    this.damage = 5;

    this.acceleration = 0.6;
    this.speed = 1.5;
    this.velocity.max.x = 1;
    this.velocity.max.y = 1;
};

panicCity.entity.ZombieRanger.prototype.m_updateInput = function () {
    var dX = this.newTarget.x - this.x;
    var dY = this.newTarget.y - this.y;
    
    var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
    var targetPosition = new rune.geom.Point(this.newTarget.centerX, this.newTarget.centerY);

    var distance = currentPosition.distance(targetPosition);

    var threshold = 80.0;

    if (!this.isAttacking && distance > threshold) {
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
    }else{
        this.m_throwAttack();
    }
};

/**
 * Method to initialize the animations. 
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieRanger.prototype.m_initAnimations = function () {
    panicCity.entity.Zombie.prototype.m_initAnimations.call(this);
    this.animation.create("walk", [0, 1, 2, 3, 4], 8, true);
    this.animation.create("attack", [5, 6, 7, 8, 9, 10], 8, true);
    this.animation.create("walkDown", [11, 12, 13, 14, 15], 8, true);
    this.animation.create("attackDown", [16, 17, 18, 19, 20], 8, true);
    this.animation.create("walkUp", [21, 22, 23, 24, 25], 8, true);
    this.animation.create("attackUp", [26, 27, 28, 29, 30], 8, true);
};

panicCity.entity.ZombieRanger.prototype.m_throwAttack = function () {
    if (this.velocity.x == 0.0 && !this.throwColdown) {
        this.animation.gotoAndPlay("attack");
        this.isThrowing = true;
        this.throwColdown = true;
        var stone = new panicCity.entity.Stone(5, 5, this, this.newTarget, 5, this.game);
        this.game.stones.addMember(stone);

        this.throwTimer = this.game.timers.create({
            duration: 2000,
            onComplete: function () {
                this.throwColdown = false;
                this.isThrowing = false;
            }.bind(this)
        });
    }
};