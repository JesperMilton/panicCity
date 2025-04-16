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
    //this.m_updateAnimations(step);
};

panicCity.entity.PlayerHibba.prototype.m_initAnimations = function (step) {
    this.animation.create("walkUp", [12, 13, 14, 15, 16], 5, true);
    this.animation.create("walkDown", [17, 18, 19, 20, 21], 8, true);
    this.animation.create("walkSide", [3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    this.animation.create("idle", [0, 1, 2]  , 6, true);
};

panicCity.entity.PlayerHibba.prototype.m_updateInput = function (step) {
    if (this.keyboard.pressed("W")) {
        this.direction = "UP";
        this.moveUp();
        this.animation.gotoAndPlay("walkSide");
    }

    if (this.keyboard.pressed("S")) {
        this.direction = "DOWN";
        this.moveDown();
        this.animation.gotoAndPlay("walkDown");
    }

    if (this.keyboard.pressed("D")) {
        this.direction = "RIGHT";
        this.moveRight();
        this.animation.gotoAndPlay("walkSide");
    }
    
    if (this.keyboard.pressed("A")) {
        this.direction = "LEFT";
        this.moveLeft();
        this.animation.gotoAndPlay("walkSide");
    }

    if(this.keyboard.justPressed("Q")){
        var bullet = new panicCity.entity.Bullet(this);
        this.game.bullets.addMember(bullet);
    }
};

// panicCity.entity.PlayerHibba.prototype.m_updateAnimations = function (step) {
//     if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
//         this.animation.gotoAndPlay("walk");
//     } else {
//         this.animation.gotoAndPlay("idle");
//     }
// };

panicCity.entity.PlayerHibba.prototype.takeDamage = function (damage) {
    // this.flicker.start(250);
    // this.health -= damage;
    // this.healthBar.progress = (this.health / 500);
    // if (this.health <= 0) {
    //  this.m_die();
    // }
    console.log("Hibba took damage from a zombie");
}