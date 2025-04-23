//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.ZombieBoss = function (x, y, width, height, texture, game) {
    panicCity.entity.Entity.call(this, x, y, width, height, texture, game);
    this.game = game;

    this.throwColdown = false;
    this.isThrowing = false;

    this.isAttacking = false;
    this.coolDown = false;

    this.targets = [];
    this.newTarget;

    this.immovable = true;
};

panicCity.entity.ZombieBoss.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.ZombieBoss.prototype.constructor = panicCity.entity.ZombieBoss;

panicCity.entity.ZombieBoss.prototype.init = function () {
    this.m_initAnimations();
    this.m_initStats();
};

panicCity.entity.ZombieBoss.prototype.m_initStats = function () {
    this.hitbox.set(10, 20, 60, 50);
    this.health = 300;
    this.damage = 15;

    this.acceleration = 0.6;
    this.speed = 1.5;
    this.velocity.max.x = 1;
    this.velocity.max.y = 1;
};

panicCity.entity.ZombieBoss.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_findClosestPlayer();
    this.m_updateInput();
    this.m_throwAttack();
};

panicCity.entity.ZombieBoss.prototype.m_updateInput = function () {
    if (this.x <= 10) {
        this.animation.gotoAndPlay("walk");
        console.log(this.animation)
        this.moveRight();
    }
};

panicCity.entity.ZombieBoss.prototype.m_findClosestPlayer = function() {
    this.closetPlayer = Infinity;
    this.newTarget = null;
    
    var checkTarget = function(target) {
        var dX = target.x - this.x;
        var dY = target.y - this.y;
        var distance = dX * dX + dY * dY;
        
        if (distance < this.closetPlayer) {
            this.closetPlayer = distance;
            this.newTarget = target;
        }
    };
    
    this.game.players.forEachMember(checkTarget, this);
    console.log(this.newTarget);
    this.game.baseSta.forEachMember(checkTarget, this);
    console.log(this.newTarget);
};

panicCity.entity.ZombieBoss.prototype.m_throwAttack = function () {
    if (this.velocity.x == 0.0 && !this.throwColdown) {
        this.animation.gotoAndPlay("attack");
        this.isThrowing = true;
        this.throwColdown = true;
        var stone = new panicCity.entity.Stone(this, this.newTarget, this.game);
        this.game.stones.addMember(stone);

        this.game.timers.create({
            duration: 2000,
            onComplete: function () {
                this.throwColdown = false;
                this.isThrowing = false;
            }.bind(this)
        });
    }
};

panicCity.entity.ZombieBoss.prototype.attack = function (target) {
    if (target && !this.coolDown) {
        this.animation.gotoAndPlay("attack");
        this.isAttacking = true;
        this.coolDown = true;
        target.takeDamage(this.damage);

        this.game.timers.create({
            duration: 800,
            onComplete: function () {
                this.coolDown = false;
                this.isAttacking = false;
            }.bind(this)
        });
    }
};

panicCity.entity.ZombieBoss.prototype.m_initAnimations = function () {
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 3, true);
    this.animation.create("attack", [9, 10, 11, 12, 13], 3, true);
};

panicCity.entity.ZombieBoss.prototype.takeDamage = function (damage) {
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
};

panicCity.entity.ZombieBoss.prototype.m_die = function () {
    this.game.enemies.removeMember(this, true);
    this.game.updateScoretext(50);
};