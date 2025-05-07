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

    this.arr = ["Human-Sheet-A", "Human-Sheet-B"]

    var ran = Math.floor(Math.random() * 2);

    panicCity.entity.Entity.call(this, this.x, this.y, 27, 35, this.arr[ran]);

    /**
     * Specified x-Value.
     * 
     * @type (number)
     * @public
     */
    this.x = x;

    /**
     * Specified x-Value.
     * 
     * @type (number)
     * @public
     */
    this.y = y;
    
    /**
     * Total amount of healing points to be given out
     * 
     * @type ()
     * @public
     */
    this.game = game;

    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.started = false;

    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.inPosition = false;

    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.despawnTime = 5000;

    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.time = 1;

    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.itemSpawner = new panicCity.managers.ItemSpawner(this.game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Human.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Human.prototype.constructor = panicCity.entity.Human;

panicCity.entity.Human.prototype.init = function () {
    this.m_initProgressbar();
    this.m_initAnimations();
    this.m_initStats();
};

panicCity.entity.Human.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations();
    this.m_updateInput();
};

panicCity.entity.Human.prototype.m_initAnimations = function () {
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    this.animation.create("help", [9, 10], 2, true);
};

panicCity.entity.Human.prototype.m_initStats = function () {
    this.speed = 0.5;
    this.acceleration = 0.5;
    this.velocity.max.x = 0.7;
    this.velocity.max.y = 0.7;
};


panicCity.entity.Human.prototype.m_updateAnimations = function () {
    if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
        this.animation.gotoAndPlay("walk");
    }
};

panicCity.entity.Human.prototype.m_updateInput = function () {
    var dX = this.target.getMemberAt(0).x - this.x;
    var dY = this.target.getMemberAt(0).y - this.y;
    var currentPosition = new rune.geom.Point(this.centerX, this.centerY);
    var targetPosition = new rune.geom.Point(this.target.getMemberAt(0).centerX, this.target.getMemberAt(0).centerY);

    var distance = currentPosition.distance(targetPosition);

    var threshold = 90.0;

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
        this.inPosition = true;
        this.m_initTimer();
        this.m_updateTimerbar();
    }
};

/**
 * Create emitter.
 *
 * @return {undefined}
 * @private
 */
panicCity.entity.Human.prototype.m_initTimer = function(){
    if(this.flippedX = false) {
        this.flippedX = true;
    }
    this.animation.gotoAndPlay("help");
    if(this.started == true){
        return;
    }
    else{
        this.started = true;
        var self = this;
        this.timer = this.game.timers.create({
            duration: this.despawnTime,
            onComplete: function () {
                self.m_die();
            },
        });
    }
}

/**
 * Create emitter.
 *
 * @return {undefined}
 * @private
 */
panicCity.entity.Human.prototype.m_initProgressbar = function(){
    this.timerBar = new rune.ui.Progressbar(27, 4, "gray", "orange");
    this.timerBar.progress = (this.time / 1);
    
    this.game.stage.addChild(this.timerBar);
}

/**
 * Create emitter.
 *
 * @return {undefined}
 * @private
 */
panicCity.entity.Human.prototype.m_updateTimerbar = function(){
    this.time = 1 - this.timer.progressTotal;
    this.timerBar.progress = (this.time / 1);
    this.timerBar.x = this.x;
    this.timerBar.y = this.y - 4;
}

/**
 * Create emitter.
 *
 * @return {undefined}
 * @private
 */
panicCity.entity.Human.prototype.m_die = function () {
    this.game.humans.removeMember(this, true);
    this.game.stage.removeChild(this.timerBar);
    this.game.updateScoretext(-10);
}

/**
 * Create emitter.
 *
 * @return {undefined}
 * @public
 */
panicCity.entity.Human.prototype.getSaved = function(base){
    this.game.humans.removeMember(this, true);
    this.game.stage.removeChild(this.timerBar);
    this.game.updateScoretext(20);
    base.forEachMember(function (base){
        base.heal(40);
    }, this);
}