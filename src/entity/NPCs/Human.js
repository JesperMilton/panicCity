//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Human class.
 *
 * @constructor
 * @extends panicCity.entity.Entity
 *
 * @class
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {rune.scene.Scene} game - The Game object
 * 
 * The class for the Human NPCs, includes methods for animations and movements, also includes basic functions such as getSaved and die
 */
panicCity.entity.Human = function (x, y, game) {

    /**
     * Array of different human grafics.
     * 
     * @type {string[]}
     * @public
     */
    this.humans = ["Human-Sheet-A", "Human-Sheet-B"]

    /**
     * Random number between 0 and 1.
     * 
     * @type {number}
     * @private
     */
    var ran = Math.floor(Math.random() * 2);

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Entity.call(this, this.x, this.y, 27, 35, this.humans[ran]);

    /**
     * Specified x-Value.
     * 
     * @type {number}
     * @public
     */
    this.x = x;

    /**
     * Specified y-Value.
     * 
     * @type {number}
     * @public
     */
    this.y = y;

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * Flag used for checking if timer has started
     * 
     * @type {boolean}
     * @public
     */
    this.started = false;

    /**
     * Flag used to check if Human is in position
     * 
     * @type {boolean}
     * @public
     */
    this.inPosition = false;

    /**
     * The amount of time it takes to despawn the Human
     * 
     * @type {number}
     * @public
     */
    this.despawnTime = 5000;

    /**
     * Used to keep track of the time elapsed
     * 
     * @type {number}
     * @public
     */
    this.time = 1;

    /**
     * Sound file for when human is in position
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_helpSound;

    /**
     * Sound file for when human gets saved
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_saveSound;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Human.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Human.prototype.constructor = panicCity.entity.Human;

/**
 * @inheritDoc
 */
panicCity.entity.Human.prototype.init = function () {
    this.m_helpSound = this.application.sounds.sound.get("Help-sound");
    this.m_saveSound = this.application.sounds.sound.get("Save-human-sound");
    this.m_initProgressbar();
    this.m_initAnimations();
    this.m_initStats();
};

/**
 * @inheritDoc
 */
panicCity.entity.Human.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateAnimations();
    this.m_updateInput();
};

/**
 * Initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Human.prototype.m_initAnimations = function () {
    this.animation.create("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    this.animation.create("help", [9, 10], 2, true);
};

/**
 * Initialize the Human statistics.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Human.prototype.m_initStats = function () {
    this.speed = 0.5;
    this.acceleration = 0.5;
    this.velocity.max.x = 0.7;
    this.velocity.max.y = 0.7;
};

/**
 * Updates the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Human.prototype.m_updateAnimations = function () {
    if (this.velocity.x != 0.0 || this.velocity.y != 0.0) {
        this.animation.gotoAndPlay("walk");
    }
};

/**
 * Updates the Human movement inputs.
 *
 * @return {undefined}
 * @private
 * 
 */
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
    else {
        this.inPosition = true;
        this.m_initTimer();
        this.m_updateTimerbar();
    }
};

/**
 * Initiates a timer
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Human.prototype.m_initTimer = function () {
    if (this.flippedX = false) {
        this.flippedX = true;
    }
    this.animation.gotoAndPlay("help");
    if (this.started == true) {
        return;
    }
    else {
        this.started = true;
        this.m_helpSound.play();
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
 * Initiates a progressbar
 *
 * @return {undefined}
 * @private
 */
panicCity.entity.Human.prototype.m_initProgressbar = function () {
    this.timerBar = new rune.ui.Progressbar(27, 4, "gray", "orange");
    this.timerBar.progress = (this.time / 1);

    this.game.stage.addChild(this.timerBar);
}

/**
 * Updates the progressbar
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Human.prototype.m_updateTimerbar = function () {
    this.time = 1 - this.timer.progressTotal;
    this.timerBar.progress = (this.time / 1);
    this.timerBar.x = this.x;
    this.timerBar.y = this.y - 4;
}

/**
 * Kills the Human, removes Human from stage and humans group, removes 10 points from the score
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Human.prototype.m_die = function () {
    this.game.humans.removeMember(this, true);
    this.game.stage.removeChild(this.timerBar);
    this.game.updateScoretext(-10);
}

/**
 * Saves the human and despawns it, heals base for 40 points, gives 20 score and removes human from stage and humans group
 *
 * @return {undefined}
 * @public
 * 
 * @param {panicCity.entity.Base} base - the Base object
 */
panicCity.entity.Human.prototype.getSaved = function (base) {
    this.m_saveSound.play();
    new panicCity.entity.ShowScore(this, 20, this.game);
    this.game.humans.removeMember(this, true);
    this.game.stage.removeChild(this.timerBar);
    this.game.updateScoretext(20);
    base.forEachMember(function (base) {
        base.heal(40);
    }, this);
}