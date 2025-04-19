//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.ZombieHunter = function (x, y, width, height, texture, game) {
    panicCity.entity.Zombie.call(this, x, y, width, height, texture, game);
};

panicCity.entity.ZombieHunter.prototype = Object.create(panicCity.entity.Zombie.prototype);
panicCity.entity.ZombieHunter.prototype.constructor = panicCity.entity.ZombieHunter;

panicCity.entity.ZombieHunter.prototype.m_initStats = function () {
    panicCity.entity.Zombie.prototype.m_initStats.call(this);
    this.health = 10;
    this.damage = 5;

    this.acceleration = 0.6;
    this.speed = 1.5;
    this.velocity.max.x = 1;
    this.velocity.max.y = 1;
};

panicCity.entity.ZombieHunter.prototype.m_updateInput = function () {
    var dX = this.newTarget.x - this.x;
    var dY = this.newTarget.y - this.y;

    if (!this.isAttacking) {
        if (dY * dY > dX * dX) {
            if (dY > 0) {
                this.moveDown();
            } else if (dY < 0) {
                this.moveUp();
            }
        } else {
            if (dX > 0) {
                this.moveRight();
            } else if (dX < 0) {
                this.moveLeft();
            }
        }
    }
};

panicCity.entity.ZombieHunter.prototype.m_initAnimations = function () {
    panicCity.entity.Zombie.prototype.m_initAnimations.call(this);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    this.animation.create("attack", [9, 10, 11, 12, 13], 8, true);
};