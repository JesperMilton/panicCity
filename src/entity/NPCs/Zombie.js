//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.Zombie = function (x, y, width, height, texture) {
    panicCity.entity.Entity.call(this, x, y, width, height, texture);
    this.targets = [];
};

panicCity.entity.Zombie.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Zombie.prototype.constructor = panicCity.entity.Zombie;

panicCity.entity.Zombie.prototype.init = function () {
    this.m_initAnimations();
    this.m_initStats();
};

/**
 * @inheritDoc
 */
panicCity.entity.Zombie.prototype.m_initStats = function() {
    this.acceleration = 0.4;
    this.speed = 0.5;
    this.velocity.max.x = 0.9;
    this.velocity.max.y = 0.9;
};

panicCity.entity.Zombie.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations(step);
    this.checkColl(step);
};

panicCity.entity.Zombie.prototype.m_updateInput = function (step) {
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

panicCity.entity.Zombie.prototype.m_initAnimations = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.animation.create("walk", [0, 1], 8, true);
    this.animation.create("idle", [0], 6, true);
};

panicCity.entity.Zombie.prototype.m_updateAnimations = function (step) {
    if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
        this.animation.gotoAndPlay("walk");
    } else {
        this.animation.gotoAndPlay("idle");
    }
};

panicCity.entity.Zombie.prototype.checkColl = function (step) {
    if (this.hitTestAndSeparateContentOf(this.targets)) {
        this.attack();
    } else {
        this.m_updateInput(step);
    }
};

panicCity.entity.Zombie.prototype.attack = function (step) {
    console.log("Attack!");
};