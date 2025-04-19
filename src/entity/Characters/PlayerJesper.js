//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------


panicCity.entity.PlayerJesper = function (x, y, width, height, texture, game, gamepadIndex) {
    panicCity.entity.Entity.call(this, x, y, width, height, texture);
    this.game = game;
    this.direction = "UP";
    this.gamepadIndex = gamepadIndex;
};

panicCity.entity.PlayerJesper.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.PlayerJesper.prototype.constructor = panicCity.entity.PlayerJesper;

panicCity.entity.PlayerJesper.prototype.init = function () {
    this.m_initAnimations();
};


panicCity.entity.PlayerJesper.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateInput(step);
};

panicCity.entity.PlayerJesper.prototype.m_updateInput = function (step) {
    this.gamepad = this.game.gamepads.get(this.gamepadIndex);
    
    if (this.keyboard.pressed("UP") || this.gamepad.stickLeftUp) {
        this.direction = "UP";
        this.moveUp();
        this.animation.gotoAndPlay("walkUp");
    }
    
    if (this.keyboard.pressed("DOWN") || this.gamepad.stickLeftDown) {
        this.direction = "DOWN";
        this.moveDown();
        this.animation.gotoAndPlay("walkDown");
    }
    
    if (this.keyboard.pressed("RIGHT") || this.gamepad.stickLeftRight) {
        this.direction = "RIGHT";
        this.moveRight();
        this.animation.gotoAndPlay("walkSide");
    }
    
    if (this.keyboard.pressed("LEFT") || this.gamepad.stickLeftLeft) {
        this.direction = "LEFT";
        this.moveLeft();
        this.animation.gotoAndPlay("walkSide");
    }
    
    if (this.keyboard.justPressed("P") || this.gamepad.justPressed(2)) {
        var bullet = new panicCity.entity.Bullet(this);
        this.game.bullets.addMember(bullet);
    }
};

panicCity.entity.PlayerJesper.prototype.m_initAnimations = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.animation.create("walkUp", [12, 13, 14, 15, 16], 5, true);
    this.animation.create("walkDown", [17, 18, 19, 20, 21], 8, true);
    this.animation.create("walkSide", [3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    this.animation.create("idle", [0, 1, 2]  , 6, true);
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