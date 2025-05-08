//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the ZombieBoss class.
 *
 * @constructor
 * @extends panicCity.entity.Entity
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
 * Class for ZombieBoss, handles movment and attack functions of the ZombieBoss.
 */

panicCity.entity.ZombieBoss = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Entity.call(this, x, y, width, height, texture, game);
    /**
     * The Game object.
     * 
     * @type (rune.scene.Scene)
     * @public
     */
    this.game = game;

    this.isAttacking = false;

    /**
     * Array of the zombiesBosses targets.
     * 
     * @type (Array)
     * @public
     */
    this.targets = [];

    /**
     * The closet player.
     * 
     * @type (panicCity.entity.Entity)
     * @public
     */
    this.newTarget;

    /**
     * Makes the zombieBoss immovable.
     * 
     * @type (boolean)
     * @public
     */
    this.immovable = true;

    /**
     * Controls the delayed attack pattern of the zombieBoss.
     * 
     * @type (number)
     * @public
     */
    this.lastShot = 0;

    /**
     * Controls the delayed of the thorw attack.
     * 
     * @type (number)
     * @public
     */
    this.lastThow = 0;

    /**
     * Cooldown for the zombieBoss attacks.
     * 
     * @type (number)
     * @public
     */
    this.coolDown = 2000;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.ZombieBoss.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.ZombieBoss.prototype.constructor = panicCity.entity.ZombieBoss;

/**
 * @inheritdoc
 */
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

/**
 * @inheritdoc
 */
panicCity.entity.ZombieBoss.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_findClosestPlayer();
    this.m_updateInput();
    this.m_throwAttack();
    this.m_updateHealthbar();
};

/**
 * Updates the zombieBosses movement.
 *
 * @return {undefined}
 * @private
 * 
 */
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

/**
 * Finds the closest player to the zombieBoss.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_findClosestPlayer = function () {
    this.closetPlayer = Infinity;
    this.newTarget = null;

    var checkTarget = function (target) {
        if (target.isDowned) {
            return;
        }
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

/**
 * Does a throwing attack to the closest target to the ZombieBoss.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_throwAttack = function () {
    var now = Date.now();
    if (this.velocity.x == 0.0 && now > this.lastThow) {
        this.animation.gotoAndPlay("attack");
        var projectile = new panicCity.entity.Projectile(15, 15, this, this.newTarget, 35, "image_Stone", this.game);
        this.game.projectiles.addMember(projectile);

        this.lastThow = now + this.coolDown;
    }
};

/**
 * Attacks a target.
 * 
 * @param {panicCity.entity.Entity} target The closest player.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.attack = function (target) {
    var now = Date.now();
    if (target && now > this.lastShot) {
        target.takeDamage(this.damage);

        this.lastShot = now + this.coolDown;
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

/**
 * Updates the ZombieBoss healthbar.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_updateHealthbar = function () {
    this.healthBar.progress = (this.health / 500);
    this.healthBar.x = 100;
    this.healthBar.y = 20;
}

/**
 * Damages the ZombieBoss.
 * 
 * @param {number} damage The amount to be damaged.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.ZombieBoss.prototype.takeDamage = function (damage) {
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
};

/**
 * Method to remove the ZombieBoss from the enemies groups.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.ZombieBoss.prototype.m_die = function () {
    this.game.enemies.removeMember(this, true);
    this.game.cameras.getCameraAt(1).removeChild(this.healthBar, true);
    this.game.updateScoretext(50);
};