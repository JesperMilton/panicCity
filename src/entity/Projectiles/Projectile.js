//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @class
 * 
 * @param {number} origin - The origin object
 * @param {number} target - The Target object
 * @param {panicCity.entity.Entity} origin - The Game object
 * @param {panicCity.entity.Entity} target - The Game object
 * @param {number} damage - The Game object
 * @param {string} texture - The Game object
 * @param {rune.scene.Scene} game - The Game object
 * 
 * Class for the generic projectile thrown by enemies, includes methods for movement
 */
panicCity.entity.Projectile = function (width, height, origin, target, damage, texture, game) {

    /**
     * The Game scene.
     *
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * The amount of damage the projectile causes.
     *
     * @type {number}
     * @public
     */
    this.damage = damage;

    /**
     * The targets Y value.
     *
     * @type {number}
     * @public
     */
    this.tY = target.centerY;

    /**
     * The targets X value.
     *
     * @type {number}
     * @public
     */
    this.tX = target.centerX;

    /**
     * The projectiles speed.
     *
     * @type {number}
     * @public
     */
    this.m_speed = 2;

    /**
     * The origin of the one throwing the projectile.
     *
     * @type {panicCity.entity.Entity}
     * @public
     */
    this.origin = origin;

    /**
     * Where the projectile should be thrown from (DELETE??)
     *
     * @type {number}
     * @public
     */
    var y = this.origin.y + 17;
    var x = this.origin.x + 13;

    this.dEmitter = new rune.particle.Emitter(0, 0, 0, 0, {
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

    this.game.stage.addChild(this.dEmitter);

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Graphic.call(this, x, y, width, height, texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Projectile.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.entity.Projectile.prototype.constructor = panicCity.entity.Projectile;

/**
 * @inheritDoc
 */
panicCity.entity.Projectile.prototype.update = function () {
    this.m_followTarget()
};

/**
 * Makes the projectile follow the target.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Projectile.prototype.m_followTarget = function () {
    var currentPosition = new rune.geom.Point(this.x, this.y);
    var targetPosition = new rune.geom.Point(this.tX, this.tY);

    var disX = this.tX - this.x;
    var disY = this.tY - this.y;

    var distance = currentPosition.distance(targetPosition);

    var threshold = 2;

    if (distance < threshold) {
        if (this.dEmitter) {
            this.dEmitter.centerX = this.centerX;
            this.dEmitter.centerY = this.centerY + 10;
            this.dEmitter.emit(20);
        }
        this.game.projectiles.removeMember(this);
    }

    var dirX = disX / distance;
    var dirY = disY / distance;

    this.x += dirX * this.m_speed;
    this.y += dirY * this.m_speed;

    this.rotation += 5;
};