//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------


panicCity.entity.PlayerJesper = function (x, y, width, height, texture, game) {
    panicCity.entity.Entity.call(this, x, y, width, height, texture);
    this.game = game;
    this.direction = "UP";
};

panicCity.entity.PlayerJesper.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.PlayerJesper.prototype.constructor = panicCity.entity.PlayerJesper;

panicCity.entity.PlayerJesper.prototype.init = function () {
    this.m_initAnimations();
};


panicCity.entity.PlayerJesper.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateInput(step);
    this.m_updateAnimations(step);
};

panicCity.entity.PlayerJesper.prototype.m_updateInput = function (step) {
    if (this.keyboard.pressed("up")) {
        this.direction = "UP";
        this.moveUp();
    } else if (this.keyboard.pressed("down")) {
        this.direction = "DOWN";
        this.moveDown();
    }

    if (this.keyboard.pressed("right")) {
        this.direction = "RIGHT";
        this.moveRight();
    } else if (this.keyboard.pressed("left")) {
        this.direction = "LEFT";
        this.moveLeft();
    }
    if(this.keyboard.justPressed("P")){
        var bullet = new panicCity.entity.Bullet(this);
        this.game.bullets.addMember(bullet);
    }
};

panicCity.entity.PlayerJesper.prototype.m_initAnimations = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.animation.create("walkUp", [12, 13, 14, 15, 16], 8, true)
    this.animation.create("walk", [3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    this.animation.create("idle", [0, 1, 2]  , 6, true);
};


panicCity.entity.PlayerJesper.prototype.m_updateAnimations = function (step) {
    if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
        this.animation.gotoAndPlay("walk");
    } else {
        this.animation.gotoAndPlay("idle");
    }
};
panicCity.entity.PlayerJesper.prototype.takeDamage = function (damage) {
    // this.flicker.start(250);
    // this.health -= damage;
    // this.healthBar.progress = (this.health / 500);
    // if (this.health <= 0) {
    //  this.m_die();
    // }
    console.log("Jesper took damage from a zombie");
}