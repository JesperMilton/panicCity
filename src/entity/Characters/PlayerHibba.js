//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------


panicCity.entity.PlayerHibba = function (x, y, width, height, texture, game) {
    panicCity.entity.Entity.call(this, x, y, width, height, texture);
    this.game = game;
    this.direction = "UP";
};

panicCity.entity.PlayerHibba.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.PlayerHibba.prototype.constructor = panicCity.entity.PlayerHibba;

panicCity.entity.PlayerHibba.prototype.init = function () {
    this.m_initAnimations();
};


panicCity.entity.PlayerHibba.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateInput(step);
    this.m_updateAnimations(step);
};

panicCity.entity.PlayerHibba.prototype.m_updateInput = function (step) {
    if (this.keyboard.pressed("W")) {
        this.direction = "UP";
        this.moveUp();
    } else if (this.keyboard.pressed("S")) {
        this.direction = "DOWN";
        this.moveDown();
    }

    if (this.keyboard.pressed("D")) {
        this.direction = "RIGHT";
        this.moveRight();
    } else if (this.keyboard.pressed("A")) {
        this.direction = "LEFT";
        this.moveLeft();
    }

    if(this.keyboard.justPressed("Q")){
        var bullet = new panicCity.entity.Bullet(this);
        this.game.stage.addChild(bullet);
        this.game.bullets.push(bullet);
    }
};

panicCity.entity.PlayerHibba.prototype.m_initAnimations = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.animation.create("walkUp", [12, 13, 14, 15, 16, 17], 8, true)
    this.animation.create("walk", [3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    this.animation.create("idle", [0, 1, 2]  , 6, true);
};


panicCity.entity.PlayerHibba.prototype.m_updateAnimations = function (step) {
    if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
        this.animation.gotoAndPlay("walk");
    } else {
        this.animation.gotoAndPlay("idle");
    }
};