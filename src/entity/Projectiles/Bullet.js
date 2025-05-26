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
 * @param {Object} player - The player object that initialized the bullet
 * 
 * Class for the Bullet projectile, includes methods for movement
 */
panicCity.entity.Bullet = function (player) {
    /**
     * The amount of damage the bullet causes.
     *
     * @type {number}
     * @default 10
     */
    this.damage = 10.0;

    /**
     * The speed of the bullet.
     *
     * @type {number}
     * @protected
     */
    this.m_speed = 5;

    /**
     * The object of the player that intiated the projectile
     * 
     * @type {panicCity.entity.Entity}
     * @public
     */
    this.player = player;

    /**
     * The Y-coordinate of the bullet
     * 
     * @type {number}
     * @public
     */
    this.y = this.player.y + 17;

    /**
     * The X-coordinate of the bullet
     * 
     * @type {number}
     * @public
     */
    this.x = this.player.x + 13;

    /**
     * The texture of the bullet
     * 
     * @type {string}
     * @public
     */
    this.bulletTexture = "image_Bullet";

    /**
     * The direction of the bullet
     * 
     * @type {string}
     * @public
     */
    this.direction = this.player.direction;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    rune.display.Graphic.call(this, this.x, this.y, 5, 5, this.bulletTexture);
    
    /**
     * The hitbox of the bullet
     * @type {Object}
     * @public
     */
    this.hitbox.set(0, 0, 5, 5);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Bullet.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.entity.Bullet.prototype.constructor = panicCity.entity.Bullet;

/**
 * @inheritDoc
 */
panicCity.entity.Bullet.prototype.init = function () {
    this.useQaudtree = true;
};

/**
 * @inheritDoc
 */
panicCity.entity.Bullet.prototype.update = function (step) {
    this.m_updateMotion();
};

/**
 * Checks which direction the bullet is facing and calls the respective method
 * @private
 * @returns {undefined}
 */
panicCity.entity.Bullet.prototype.m_updateMotion = function () {
    switch (this.direction) {
        case "UP":
            this.m_moveUp();
            break;
        case "DOWN":
            this.m_moveDown();
            break;
        case "RIGHT":
            this.m_moveRight();
            break;
        case "LEFT":
            this.m_moveLeft();
            break;
        case "UP-LEFT":
            this.m_moveUp();
            this.m_moveLeft();
            break;
        case "UP-RIGHT":
            this.m_moveUp();
            this.m_moveRight();
            break;
        case "DOWN-LEFT":
            this.m_moveDown();
            this.m_moveLeft();
            break;
        case "DOWN-RIGHT":
            this.m_moveDown();
            this.m_moveRight();
            break;
        default:
            this.m_moveUp();
            break;
    }
}

/**
 * Moves the bullet up
 * @private
 * @returns {undefined}
 */
panicCity.entity.Bullet.prototype.m_moveUp = function () {
    this.y -= this.m_speed;
}

/**
 * Moves the bullet down
 * @private
 * @returns {undefined}
 */
panicCity.entity.Bullet.prototype.m_moveDown = function () {
    this.y += this.m_speed;
}

/**
 * Moves the bullet left
 * @private
 * @returns {undefined}
 */
panicCity.entity.Bullet.prototype.m_moveLeft = function () {
    this.x -= this.m_speed;
}

/**
 * Moves the bullet right
 * @private
 * @returns {undefined}
 */
panicCity.entity.Bullet.prototype.m_moveRight = function () {
    this.x += this.m_speed;
}