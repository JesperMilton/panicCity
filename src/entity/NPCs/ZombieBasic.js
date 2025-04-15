//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.ZombieBasic = function (x, y, width, height, texture, game) {
    panicCity.entity.Zombie.call(this, x, y, width, height, texture, game);
    this.health = 20;
    this.targets = [];
};

panicCity.entity.ZombieBasic.prototype = Object.create(panicCity.entity.Zombie.prototype);
panicCity.entity.ZombieBasic.prototype.constructor = panicCity.entity.ZombieBasic;

panicCity.entity.ZombieBasic.prototype.m_initStats = function () {
    panicCity.entity.Zombie.prototype.m_initStats.call(this);
    this.acceleration = 0.5;
    this.speed = 0.5;
    this.velocity.max.x = 0.7;
    this.velocity.max.y = 0.7;
};

panicCity.entity.ZombieBasic.prototype.m_updateInput = function (step) {
    if (this.targets) {
        if (this.targets[0].y < this.y) {
            this.moveUp();
        } else if (this.targets[0].y > this.y) {
            this.moveDown();
        }

        if (this.targets[0].x > this.x) {
            this.moveRight();
        } else if (this.targets[0].x < this.x) {
            this.moveLeft();
        }
    }
};

panicCity.entity.ZombieBasic.prototype.m_initAnimations = function (step) {
    panicCity.entity.Zombie.prototype.m_initAnimations.call(this);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
};