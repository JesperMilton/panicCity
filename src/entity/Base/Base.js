//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------


panicCity.entity.Base = function (x, y, width, height, texture) {
    rune.display.Sprite.call(this, x, y, width, height, texture);
    this.debug = true;
    this.hitbox.debug = true;
    this.immovable = true;
    this.health = 100;
};

panicCity.entity.Base.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Base.prototype.constructor = panicCity.entity.Base;

panicCity.entity.Base.prototype.init = function () {
    this.m_initAnimations();
};


panicCity.entity.Base.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
};


panicCity.entity.Base.prototype.m_initAnimations = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    
};


panicCity.entity.Base.prototype.takeDamage = function (damage) {
    // this.flicker.start(250);
    // this.health -= damage;
    // if (this.health <= 0) {
    //     this.m_die();
    // }
}

panicCity.entity.Base.prototype.m_die = function () {
    // this.game.enemies.removeMember(this, true);
    // this.game.points += 100;
    // this.game.updateScoretext();

    // // this.game.stage.removeChild(this);
}