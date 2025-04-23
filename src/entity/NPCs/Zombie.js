//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends panicCity.entity.Entity
 *
 * @class
 * @classdesc
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {object} game - The Game object
 * 
 * ...
 */
panicCity.entity.Zombie = function (x, y, width, height, texture, game) {
    panicCity.entity.Entity.call(this, x, y, width, height, texture);
    this.game = game;
    this.targets = [];
    this.newTarget;
    this.isAttacking = false;
    this.coolDown = false;
    this.itemSpawner = new panicCity.managers.ItemSpawner(this.game);
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
    this.m_findClosestPlayer();
    this.m_updateInput();
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

panicCity.entity.Zombie.prototype.m_findClosestPlayer = function () {
    this.closetPlayer = Infinity;
    this.targets.forEachMember(function (target) {
        var dX = target.x - this.x;
        var dY = target.y - this.y;
        var distance = dY * dY + dX * dX;
        if (this.closetPlayer > distance) {
            this.closetPlayer = distance;
            this.newTarget = target;
        }
    }, this);
}

panicCity.entity.Zombie.prototype.attack = function (target) {
    this.animation.gotoAndPlay("attack");
    if (target && !this.coolDown) {
        this.isAttacking = true;
        this.coolDown = true;
        target.takeDamage(this.damage);

        this.game.timers.create({
            duration: 3000,
            onComplete: function () {
                this.coolDown = false;
                this.isAttacking = false;
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
    this.itemSpawner.spawnItem(this.x, this.y);
}