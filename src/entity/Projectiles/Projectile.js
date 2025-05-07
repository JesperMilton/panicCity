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
 * @param {object} origin - The origin object
 * @param {object} target - The Target object
 * @param {object} game - The Game object
 * 
 * ...
 */
panicCity.entity.Projectile = function (width, height, origin, target, texture, damage, game) {
    this.game = game;
    this.damage = damage;
    
    this.tY = target.y;
    this.tX = target.x;
    
    this.m_speed = 2;

    this.origin = origin;

    var y = this.origin.y + 17;
    var x = this.origin.x + 13;

    // var ProjectileTexture = "image_Projectile";

    var PTexture = texture;

    rune.display.Graphic.call(this, x, y, width, height, PTexture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Projectile.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.entity.Projectile.prototype.constructor = panicCity.entity.Projectile;

panicCity.entity.Projectile.prototype.update = function () {
    this.m_followTarget()
};

panicCity.entity.Projectile.prototype.m_followTarget = function () {
    var currentPosition = new rune.geom.Point(this.x, this.y);
    var targetPosition = new rune.geom.Point(this.tX, this.tY);

    var disX = this.tX - this.x;
    var disY = this.tY - this.y;

    var distance = currentPosition.distance(targetPosition);

    var threshold = 2;
    
    if (distance < threshold) {
        this.game.projectiles.removeMember(this);
    }
    
    var dirX = disX / distance;
    var dirY = disY / distance;
    
    this.x += dirX * this.m_speed;
    this.y += dirY * this.m_speed;

    this.rotation += 5;
};