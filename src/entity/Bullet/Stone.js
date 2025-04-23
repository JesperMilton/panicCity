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
 * @param {object} boss - The Boss object
 * @param {object} target - The Target object
 * @param {object} game - The Game object
 * 
 * ...
 */
panicCity.entity.Stone = function (boss, target, game) {
    this.game = game;
    this.damage = 30.0;
    
    this.tY = target.y;
    this.tX = target.x;
    
    this.m_speed = 2;

    this.boss = boss;

    var y = this.boss.y + 17;
    var x = this.boss.x + 13;

    var StoneTexture = "image_Stone";

    rune.display.Graphic.call(this, x, y, 15, 15, StoneTexture);

    this.hitbox.set(0, 0, 15, 15);
};
panicCity.entity.Stone.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.entity.Stone.prototype.constructor = panicCity.entity.Stone;

panicCity.entity.Stone.prototype.update = function () {
    this.m_followTarget()
};

panicCity.entity.Stone.prototype.m_followTarget = function () {
    var currentPosition = new rune.geom.Point(this.x, this.y);
    var targetPosition = new rune.geom.Point(this.tX, this.tY);

    var disX = this.tX - this.x;
    var disY = this.tY - this.y;

    var distance = currentPosition.distance(targetPosition);

    var threshold = 2.0;
    
    if (distance < threshold) {
        this.game.stones.removeMember(this);
    }
    
    var dirX = disX / distance;
    var dirY = disY / distance;
    
    this.x += dirX * this.m_speed;
    this.y += dirY * this.m_speed;

    this.rotation += 2;
};