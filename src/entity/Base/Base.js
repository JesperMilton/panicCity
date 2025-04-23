//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------


panicCity.entity.Base = function (x, y, width, height, texture, game) {
    rune.display.Sprite.call(this, x, y, width, height, texture);
    this.debug = true;
    this.hitbox.debug = true;
    this.immovable = true;
    this.health = 500;
    this.game = game;
    this.time = 3000;

    this.game.timers.create({
        duration: this.time,
        onComplete: function () {
          this.m_baseTimer();
        }.bind(this),
      });
};

panicCity.entity.Base.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Base.prototype.constructor = panicCity.entity.Base;

panicCity.entity.Base.prototype.init = function () {
    this.m_initAnimations();
    this.m_initHealthBar();
};


panicCity.entity.Base.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    if(this.keyboard.justPressed("K")) {
        this.healBase(30);
    };
};


panicCity.entity.Base.prototype.m_initAnimations = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
};

panicCity.entity.Base.prototype.takeDamage = function (damage) {
    // this.flicker.start(250);
    this.health -= damage;
    this.healthBar.progress = (this.health / 500);
    if (this.health <= 0) {
     this.m_die();
    }
}

panicCity.entity.Base.prototype.m_die = function () {
    this.game.application.scenes.load([new panicCity.scene.Gameover(this.game)]);
}

panicCity.entity.Base.prototype.m_initHealthBar = function() {
    this.healthBar = new rune.ui.Progressbar(this.width, 6, "gray", "red");
    this.healthBar.progress = (this.health / 500);
    this.healthBar.x = this.x;
    this.healthBar.y = this.y + 50;
    this.game.stage.addChild(this.healthBar);
}

panicCity.entity.Base.prototype.heal = function(health){
    if(this.health > 0 && this.health < 500){
        this.health += health;
        this.healthBar.progress = (this.health / 500);
    }
    if(this.health > 500){
        this.health = 500;
    }
}

panicCity.entity.Base.prototype.m_baseTimer = function(){
    this.takeDamage(15);
    this.game.timers.create({
        duration: this.time,
        onComplete: function () {
          this.m_baseTimer();
        }.bind(this),
      });
}