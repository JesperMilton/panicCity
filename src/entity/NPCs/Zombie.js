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

    /**
     * The Game object.
     * 
     * @type (Object)
     * @public
     */
    this.game = game;

    /**
     * The closet player.
     * 
     * @type (panicCity.entity.Entity)
     * @public
     */
    this.newTarget;

    /**
     * Flag to control if the zombie is attacking.
     * 
     * @public
     */
    this.isAttacking;

    /**
     * The mass of the zombie.
     * 
     * @type (number)
     * @public
     */
    this.mass = 0;

    /**
     * The direction of the zombie.
     * 
     * @public
     */
    this.direction;

    /**
     * A counter fo the animations ticks.
     * 
     * @type (number)
     * @public
     */
    this.animationCounter = 0;

    /**
     * Controls the delayed attack pattern of the zombie.
     * 
     * @type (number)
     * @public
     */
    this.lastShot = 0;

    /**
     * Cooldown for the zombie attacks.
     * 
     * @type (number)
     * @public
     */
    this.coolDown = 2000;

    /**
     * Used for dropping items from the zombies.
     * 
     * @type (panicCity.managers.ItemSpawner)
     * @public
     */
    this.itemSpawner = new panicCity.managers.ItemSpawner(this.game);

    /**
     * Emitter for when the zombie dies.
     * 
     * @type (rune.particle.Emitter)
     * @public
     */
    this.emitterTest = new rune.particle.Emitter(0, 0, 0, 0, {
        particles: [panicCity.entity.Blood],
        minLifespan: 500,
        maxLifespan: 1000,
        accelerationY: 0.025,
        maxVelocityX: 0.625,
        minVelocityX: -0.5,
        maxVelocityY: -1.25,
        minVelocityY: -0.85,
        minRotation: -2,
        maxRotation: 2
    });

    /**
     * The stage of the game.
     * 
     * @type (Object)
     * @public
     */
    this.game.stage.addChild(this.emitterTest);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Zombie.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Zombie.prototype.constructor = panicCity.entity.Zombie;

/**
 * Initialize the zombie.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Zombie.prototype.init = function () {
    this.m_initAnimations();
    this.m_initStats();
};

/**
 * Update lopp.
 * 
 * @param {number} step The update ticks.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Zombie.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations();
    this.m_findClosestPlayer();
    this.m_updateInput();
};

/**
 * Updates the zombies inputs.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.m_updateInput = function () {
    //@note: Override from child
};

/**
 * Initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.m_initAnimations = function () {
    //@note: Override from child
};

/**
 * Initialize the Zombie statistics.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.m_initStats = function () {
    //@note: Override from child
};

/**
 * Updates the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
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

/**
 * Finds the closest player to the zombie.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.m_findClosestPlayer = function () {
    this.closetPlayer = Infinity;
    this.targets.forEachMember(function (target) {
        if (target.isDowned) {
            return;
        }
        var dX = target.x - this.x;
        var dY = target.y - this.y;
        var distance = dY * dY + dX * dX;
        if (this.closetPlayer > distance) {
            this.closetPlayer = distance;
            this.newTarget = target;
        }
    }, this);
}

/**
 * Finds the closest player to the zombie.
 * 
 * @param {Object} target The closest player.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.attack = function (target) {
    var now = Date.now();
    if (target && now > this.lastShot) {
        console.log("Attacking!!");
        target.takeDamage(this.damage);

        this.lastShot = now + this.coolDown;
    }
};

/**
 * Damages the zombie.
 * 
 * @param {number} damage The amount to be damaged.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Zombie.prototype.takeDamage = function (damage) {
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
}

/**
 * Removes the zombie from the enemies group.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.m_die = function () {
    if (this.emitterTest) {
        this.emitterTest.centerX = this.centerX;
        this.emitterTest.centerY = this.centerY + 10;
        this.emitterTest.emit(20);
    }
    this.game.enemies.removeMember(this, true);
    this.game.updateScoretext(5);
    this.itemSpawner.spawnItem(this.x, this.y);
}