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
 panicCity.entity.Human = function (x, y, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    this.x = x;
    this.y = y;
    panicCity.entity.Entity.call(this, this.x, this.y, 27, 26, "image_BaseHuman");

    this.despawnTime = 5000;
    this.game = game;
    this.time = 1;
    this.itemSpawner = new panicCity.managers.ItemSpawner(this.game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Human.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Human.prototype.constructor = panicCity.entity.Human;

panicCity.entity.Human.prototype.init = function () {
    this.initTimer();
    this.initProgressbar();
};

panicCity.entity.Human.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations();
    this.m_updateInput();
};

panicCity.entity.Human.prototype.m_updateAnimations = function () {
    if (this.isAttacking) {
        this.animation.gotoAndPlay("attack");
        this.isAttacking = false;
    } else if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
        this.animation.gotoAndPlay("walk");
    }
};

panicCity.entity.Human.prototype.m_updateInput = function () {
    var dX = this.target.getMemberAt(0).x - this.x;
    var dY = this.target.getMemberAt(0).y - this.y;
    var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
    var targetPosition = new rune.geom.Point(this.target.getMemberAt(0).centerX, this.target.getMemberAt(0).centerY);

    var distance = currentPosition.distance(targetPosition);

    var threshold = 120.0;

    if (distance > threshold) {
        if (dY * dY > dX * dX) {
            if (dY > 0) {
                this.moveDown();
                this.direction = "DOWN";
            } else if (dY < 0) {
                this.moveUp();
                this.direction = "UP";
            }
        } else {
            if (dX > 0) {
                this.moveRight();
                this.direction = "SIDE";
            } else if (dX < 0) {
                this.moveLeft();
                this.direction = "SIDE";
            }
        }
    }
    else{
        this.m_updateTimerbar();
    }
};

panicCity.entity.Human.prototype.initTimer = function(){
    var self = this;
    this.timer = this.game.timers.create({
        duration: this.despawnTime,
        onComplete: function () {
            self.m_die();
        },
    });
}
panicCity.entity.Human.prototype.initProgressbar = function(){
    this.timerBar = new rune.ui.Progressbar(27, 4, "gray", "orange");
    this.timerBar.progress = (this.time / 1);
    
    this.game.stage.addChild(this.timerBar);
}
panicCity.entity.Human.prototype.m_updateTimerbar = function(){
    this.time = 1 - this.timer.progressTotal;
    this.timerBar.progress = (this.time / 1);
    this.timerBar.x = this.x;
    this.timerBar.y = this.y;
}

panicCity.entity.Human.prototype.m_die = function () {
    this.game.humans.removeMember(this, true);
    this.game.stage.removeChild(this.timerBar);
    this.game.updateScoretext(-10);
}

panicCity.entity.Human.prototype.getSaved = function(base){
    this.game.humans.removeMember(this, true);
    this.game.stage.removeChild(this.timerBar);
    this.game.updateScoretext(20);
    base.forEachMember(function (base){
        base.heal(40);
    }, this);
}