//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------


panicCity.entity.Base = function (x, y, width, height, texture) {
    rune.display.Sprite.call(this, x, y, width, height, texture);
    this.debug = true;
    this.hitbox.debug = true;
    this.immovable = true;
};

panicCity.entity.Base.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Base.prototype.constructor = panicCity.entity.Base;

panicCity.entity.Base.prototype.init = function () {
    this.m_initAnimations();
};


panicCity.entity.Base.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations(step);
};


panicCity.entity.Base.prototype.m_initAnimations = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    
};


panicCity.entity.Base.prototype.m_updateAnimations = function (step) {
    
};