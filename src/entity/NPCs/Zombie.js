//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends panicCity.entity.Entity
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
panicCity.entity.Zombie = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Entity.call(this, x, y, width, height, texture);

    this.game = game;
    this.newTarget;
    this.isAttacking;
    this.coolDown = false;
    this.attackTimer;
    this.mass = 0;
    this.direction;
    this.animationCounter = 0;
    this.itemSpawner = new panicCity.managers.ItemSpawner(this.game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Zombie.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Zombie.prototype.constructor = panicCity.entity.Zombie;

panicCity.entity.Zombie.prototype.init = function () {
    this.m_initAnimations();
    this.m_initStats();
};

panicCity.entity.Zombie.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations();
    this.m_findClosestPlayer();
    this.m_updateInput();
};

panicCity.entity.Zombie.prototype.m_updateInput = function () {
    //@note: Override from child
};

panicCity.entity.Zombie.prototype.m_initAnimations = function () {
    //@note: Override from child
};

panicCity.entity.Zombie.prototype.m_initStats = function () {
    //@note: Override from child
};


panicCity.entity.Zombie.prototype.m_updateAnimations = function () {
    this.animationCounter++;
    
    if (this.animationCounter >= 20) {
        this.animationCounter = 0; 
        
        if (this.isAttacking) {
            if (this.direction == "SIDE") {
                this.animation.gotoAndPlay("attack");
                this.isAttacking = false;
            } else if (this.direction == "UP") {
                this.animation.gotoAndPlay("attackUp");
                this.isAttacking = false;
            } else if (this.direction == "DOWN") {
                this.animation.gotoAndPlay("attackDown");
                this.isAttacking = false;
            }
        } else if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
            if (this.direction == "SIDE") {
                this.animation.gotoAndPlay("walk");
            } else if (this.direction == "UP") {
                this.animation.gotoAndPlay("walkUp");
            } else if (this.direction == "DOWN") {
                this.animation.gotoAndPlay("walkDown");
            }
        }
    }

    // if (this.isAttacking) {
    //     this.animation.gotoAndPlay("attack");
    //     this.isAttacking = false;
    // } else if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
    //     this.animation.gotoAndPlay("walk");
    // }
};

panicCity.entity.Zombie.prototype.m_findClosestPlayer = function () {
    this.closetPlayer = Infinity;
    this.targets.forEachMember(function (target) {
        var dX = target.x - this.x;
        var dY = target.y - this.y;
        var distance = dY * dY + dX * dX;
        if (this.closetPlayer > distance) {
            this.closetPlayer = distance;
            this.newTarget = target;
        }
    }, this);
}

panicCity.entity.Zombie.prototype.attack = function (target) {
    if (target && !this.coolDown) {

        target.takeDamage(this.damage);
        this.coolDown = true;

        this.attackTimer = this.game.timers.create({
            duration: 3000,
            onComplete: function () {
                this.coolDown = false;
            }.bind(this)
        });
    }
};

panicCity.entity.Zombie.prototype.takeDamage = function (damage) {
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
}

/**
 * Method to dispose of the Zombie and its Timers.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.m_die = function () {
    this.game.enemies.removeMember(this, true);
    if (this.attackTimer) {
        this.attackTimer.disposed = true;
    }
    this.game.updateScoretext(5);
    this.itemSpawner.spawnItem(this.x, this.y);
}