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

panicCity.entity.ZombieBoss = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Entity.call(this, x, y, width, height, texture, game);

    this.game = game;

    this.throwColdown = false;
    this.isThrowing = false;

    this.isAttacking = false;
    this.coolDown = false;

    this.targets = [];
    this.newTarget;

    this.immovable = true;
    this.attackTimer;
    this.throwTimer;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.ZombieBoss.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.ZombieBoss.prototype.constructor = panicCity.entity.ZombieBoss;

panicCity.entity.ZombieBoss.prototype.init = function () {
    this.m_initAnimations();
    this.m_initStats();
    this.m_initHealthBar();
};

/**
 * Method to initialize the ZombieBoss statistics.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_initStats = function () {
    this.hitbox.set(10, 20, 60, 50);
    this.health = 500;
    this.damage = 15;

    this.acceleration = 0.6;
    this.speed = 1.5;
    this.velocity.max.x = 1;
    this.velocity.max.y = 1;
};

panicCity.entity.ZombieBoss.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_findClosestPlayer();
    this.m_updateInput();
    this.m_throwAttack();
    this.m_updateHealthbar();
};

panicCity.entity.ZombieBoss.prototype.m_updateInput = function () {
    var dX = this.targets[0].getMemberAt(0).x - this.x;
    var dY = this.targets[0].getMemberAt(0).y - this.y;

    var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
    var targetPosition = new rune.geom.Point(this.targets[0].getMemberAt(0).centerX, this.targets[0].getMemberAt(0).centerY);

    var distance = currentPosition.distance(targetPosition);

    var threshold = 190.0;

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
    }
};

panicCity.entity.ZombieBoss.prototype.m_findClosestPlayer = function () {
    this.closetPlayer = Infinity;
    this.newTarget = null;

    var checkTarget = function (target) {
        var dX = target.x - this.x;
        var dY = target.y - this.y;
        var distance = dX * dX + dY * dY;

        if (distance < this.closetPlayer) {
            this.closetPlayer = distance;
            this.newTarget = target;
        }
    };

    this.game.players.forEachMember(checkTarget, this);
    this.game.baseSta.forEachMember(checkTarget, this);
};

panicCity.entity.ZombieBoss.prototype.m_throwAttack = function () {
    if (this.velocity.x == 0.0 && !this.throwColdown && this.newTarget.isDowned == false) {
        this.animation.gotoAndPlay("attack");
        this.isThrowing = true;
        this.throwColdown = true;
        var stone = new panicCity.entity.Stone(15, 15, this, this.newTarget, 30, this.game);
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

panicCity.entity.ZombieBoss.prototype.attack = function (target) {
    if (target && !this.coolDown) {
        this.animation.gotoAndPlay("attack");
        this.isAttacking = true;
        this.coolDown = true;
        target.takeDamage(this.damage);

        this.attackTimer = this.game.timers.create({
            duration: 800,
            onComplete: function () {
                this.coolDown = false;
                this.isAttacking = false;
            }.bind(this)
        });
    }
};

/**
 * Method to initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_initAnimations = function () {
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 3, true);
    this.animation.create("attack", [9, 10, 11, 12, 13], 3, true);
};

/**
 * Method to initialize the healthbar.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_initHealthBar = function () {
    this.healthBar = new rune.ui.Progressbar(200, 6, "gray", "red");
    this.game.cameras.getCameraAt(1).addChild(this.healthBar);
}

panicCity.entity.ZombieBoss.prototype.m_updateHealthbar = function () {
    this.healthBar.progress = (this.health / 500);
    this.healthBar.x = 100;
    this.healthBar.y = 20;
}

panicCity.entity.ZombieBoss.prototype.takeDamage = function (damage) {
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
};

/**
 * Method to dispose of the ZombieBoss and its Timers.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_die = function () {
    this.game.enemies.removeMember(this, true);
    if (this.attackTimer) {
        this.attackTimer.disposed = true;
    }
    if (this.throwTimer) {
        this.throwTimer.disposed = true;
    }
    this.game.cameras.getCameraAt(1).removeChild(this.healthBar, true);
    this.game.updateScoretext(50);
};