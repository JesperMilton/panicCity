/**
 * Creates a new object.
 *
 * @constructor
 * @extends panicCity.entity.Body
 *
 * @param {number} x ...
 * @param {number} y ...
 *
 * @class
 * @classdesc
 * 
 * Represents a bullet.
 */
panicCity.entity.Bullet = function (player) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * The amount of damage the bullet causes.
     *
     * @type {number}
     * @default 20
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
    rune.display.Sprite.call(this, x, y, 3, 5, bulletTexture);

    if(this.player.direction === "RIGHT" || this.player.direction === "LEFT"){
        this.rotation = 90;
        this.hitbox.set(0, 0, 5, 3);
    }else{
        this.hitbox.set(0, 0, 3, 5);
    }
};
panicCity.entity.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Bullet.prototype.constructor = panicCity.entity.Bullet;

/**
 * @inheritDoc
 */
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
        default:
            this.m_moveUp();
            break;
    }
};

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