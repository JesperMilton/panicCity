//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.Zombie = function (x, y, width, height, texture, game) {
    panicCity.entity.Entity.call(this, x, y, width, height, texture);
    this.game = game;
    this.coolDown = false;
};

panicCity.entity.Zombie.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Zombie.prototype.constructor = panicCity.entity.Zombie;

panicCity.entity.Zombie.prototype.init = function () {
    this.m_initAnimations();
    this.m_initStats();
};

panicCity.entity.Zombie.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations();
    this.m_updateInput();

    // this.m_checkColl(step);
};

panicCity.entity.Zombie.prototype.m_updateInput = function () {
    //@note: Override from child
};

panicCity.entity.Zombie.prototype.m_initAnimations = function () {
    //@note: Override from child
};

panicCity.entity.Zombie.prototype.m_initStats = function () {
    //@note: Override from child
};


panicCity.entity.Zombie.prototype.m_updateAnimations = function () {
    if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
        this.animation.gotoAndPlay("walk");
    }
};

panicCity.entity.Zombie.prototype.attack = function (target) {
    if (target && !this.coolDown) {
        this.coolDown = true;
        this.animation.gotoAndPlay("attack");
        target.takeDamage(this.damage);
        
        this.game.timers.create({
            duration: 3000,
            onComplete: function () {
                this.coolDown = false;
            }.bind(this)
        });
    }
};

panicCity.entity.Zombie.prototype.takeDamage = function (damage) {
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
}

panicCity.entity.Zombie.prototype.m_die = function () {
    this.game.enemies.removeMember(this, true);
    this.game.updateScoretext(5);
}