//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @class
 * @classdesc
 * 
 * @param {object} player - The player object
 * ...
 */
panicCity.entity.Bullet = function (player) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * The amount of damage the bullet causes.
     *
     * @type {number}
     * @default 10
     */
    this.damage = 10.0;

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * The speed of the bullet.
     *
     * @type {number}
     * @protected
     */
    this.m_speed = 5;

    this.player = player;
    var y = this.player.y + 17;
    var x = this.player.x + 13;
    var bulletTexture = "image_Bullet";
    this.direction = this.player.direction;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    rune.display.Graphic.call(this, x, y, 5, 5, bulletTexture);
    this.hitbox.set(0, 0, 5, 5);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Bullet.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.entity.Bullet.prototype.constructor = panicCity.entity.Bullet;

panicCity.entity.Bullet.prototype.update = function (step) {
    this.m_updateMotion(step);
};

panicCity.entity.Bullet.prototype.m_updateMotion = function (step) {
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
            this.m_moveUpLeft();
            break;
        case "UP-RIGHT":
            this.m_moveUpRight();
            break;
        case "DOWN-LEFT":
            this.m_moveDownLeft();
            break;
        case "DOWN-RIGHT":
            this.m_moveDownRight();
            break;
        default:
            this.m_moveUp(); // fallback
            break;
    }
}

panicCity.entity.Bullet.prototype.m_moveUp = function () {
    this.y -= this.m_speed;
}
panicCity.entity.Bullet.prototype.m_moveDown = function () {
    this.y += this.m_speed;
}
panicCity.entity.Bullet.prototype.m_moveLeft = function () {
    this.x -= this.m_speed;
}
panicCity.entity.Bullet.prototype.m_moveRight = function () {
    this.x += this.m_speed;
}

panicCity.entity.Bullet.prototype.m_moveUpLeft = function () {
    this.y -= this.m_speed;
    this.x -= this.m_speed;
}
panicCity.entity.Bullet.prototype.m_moveDownLeft = function () {
    this.y += this.m_speed;
    this.x -= this.m_speed;
}
panicCity.entity.Bullet.prototype.m_moveUpRight = function () {
    this.x += this.m_speed;
    this.y -= this.m_speed;
}
panicCity.entity.Bullet.prototype.m_moveDownRight = function () {
    this.y += this.m_speed;
    this.x += this.m_speed;
}