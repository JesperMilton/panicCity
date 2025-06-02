//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Zombie class.
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
 * The basic class for Zombie, includes methods for basic animations and functions such as die, attack, findClosestPlayer
 */
panicCity.entity.Zombie = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Entity.call(this, x, y, width, height, texture);

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * The closet player.
     * 
     * @type {panicCity.entity.Entity}
     * @public
     */
    this.newTarget = null;

    /**
     * Flag to control if the zombie is attacking.
     * 
     * @type {boolean}
     * @public
     */
    this.isAttacking = false;

    /**
     * The mass of the zombie.
     * 
     * @type {number}
     * @public
     */
    this.mass = 0;

    /**
     * The direction of the zombie.
     * 
     * @type {string}
     * @public
     */
    this.direction = null;

    /**
     * A counter fo the animations ticks.
     * 
     * @type {number}
     * @private
     */
    this.m_animationCounter = 0;

    /**
     * Controls the delayed attack pattern of the zombie.
     * 
     * @type {number}
     * @private
     */
    this.m_lastAttack = 0;

    /**
     * Cooldown for the zombie attacks.
     * 
     * @type {number}
     * @private
     */
    this.m_coolDown = 2000;

    /**
     * Sound file for when zombie gets hit
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_damageSound = null;

    /**
     * Used for dropping items from the zombies.
     * 
     * @type {panicCity.managers.ItemSpawner}
     * @public
     */
    this.itemSpawner = new panicCity.managers.ItemSpawner(this.game);

    /**
     * Emitter for when the zombie dies.
     * 
     * @type {rune.particle.Emitter}
     * @public
     */
    this.bloodEmitter = new rune.particle.Emitter(0, 0, 0, 0, {
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
     * Hitbox for the zombie
     * 
     * @type {Object}
     * @public
     */
    this.hitbox.set(5, 6, 14, 17);

    this.game.stage.addChild(this.bloodEmitter);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Zombie.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Zombie.prototype.constructor = panicCity.entity.Zombie;

/**
 * @inheritDoc
 */
panicCity.entity.Zombie.prototype.init = function () {
    this.m_damageSound = this.application.sounds.sound.get("hitHurt");
    this.useQaudtree = true;
    this.m_initAnimations();
    this.m_initStats();
};

/**
 * @inheritDoc
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
    this.m_animationCounter++;

    if (this.m_animationCounter >= 20) {
        this.m_animationCounter = 0;

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
 * Attacks a target.
 * 
 * @param {panicCity.entity.Entity} target The closest player.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.attack = function (target) {
    var now = Date.now();
    if (target && now > this.m_lastAttack) {
        target.takeDamage(this.damage);

        this.m_lastAttack = now + this.m_coolDown;
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
    this.m_damageSound.play();
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
}

/**
 * Kills the zombie and removes the zombie from the enemies group.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Zombie.prototype.m_die = function () {
    if (this.bloodEmitter) {
        this.bloodEmitter.centerX = this.centerX;
        this.bloodEmitter.centerY = this.centerY;
        this.bloodEmitter.emit(20);
    }
    this.game.enemies.removeMember(this, true);
    this.game.updateScoretext(5);
    this.itemSpawner.spawnItem(this.x, this.y);
}