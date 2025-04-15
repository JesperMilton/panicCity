//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.ZombieHunter = function (x, y, width, height, texture, game) {
    panicCity.entity.Zombie.call(this, x, y, width, height, texture, game);
    this.health = 10;
    this.targets = [];
};

panicCity.entity.ZombieHunter.prototype = Object.create(panicCity.entity.Zombie.prototype);
panicCity.entity.ZombieHunter.prototype.constructor = panicCity.entity.ZombieHunter;

panicCity.entity.ZombieHunter.prototype.m_initStats = function () {
    panicCity.entity.Zombie.prototype.m_initStats.call(this);
    this.acceleration = 0.6;
    this.speed = 0.6;
    this.velocity.max.x = 1;
    this.velocity.max.y = 1;
};

panicCity.entity.ZombieHunter.prototype.m_updateInput = function () {
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

panicCity.entity.ZombieHunter.prototype.m_initAnimations = function () {
    panicCity.entity.Zombie.prototype.m_initAnimations.call(this);
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
};