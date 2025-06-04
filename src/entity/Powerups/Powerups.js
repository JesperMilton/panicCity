//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *  The base class for all Powerups. Responsible for  all base functions such as delete and heal.
 * 
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 *  
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {rune.scene.Scene} game - The Game object
 * 
 */
panicCity.entity.Powerups = function (x, y, width, height, texture, game) {
    /**
     * The Game object
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * Sound file for when powerup gets picked up
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_pickUpSound;

    /**
     * Flag for checking if powerup has been picked up
     * 
     * @type {Boolean}
     * @private
     */
    this.m_initiated = false;

    /**
     * Default delay time for flicker effect
     * 
     * @type {number}
     * @public
     */
    this.flickerDelay = 3000;

    /**
     * Default delay time for powerup revert effect
     * 
     * @type {number}
     * @public
     */
    this.timeDelay = 5000;

    /**
     * Flag for checking if flicker effect has started
     * 
     * @type {Boolean}
     * @private
     */
    this.m_flickerStart = false;

    /**
     * Flag for checking if powerup effect has been reverted
     * 
     * @type {Boolean}
     * @private
     */
    this.m_revertStart = false;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Sprite.call(this, x, y, width, height, texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Powerups.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Powerups.prototype.constructor = panicCity.entity.Powerups;

/**
 * @inheritDoc
 */
panicCity.entity.Powerups.prototype.init = function () {
    this.m_flickerActive = false;
    this.m_pickUpSound = this.application.sounds.sound.get("Pickup-powerup-sound");
    this.m_initAnimations();

    this.startTime = Date.now();
};

/**
 * @inheritDoc
 */
panicCity.entity.Powerups.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);

    var now = Date.now();
    if (this.m_initiated == true) {
        if (now > this.initTime + this.flickerDelay && this.m_flickerStart == false) {
            this.target.initFlicker(2000, 150);
            this.m_flickerStart = true;
        }

        if (now > this.initTime + this.timeDelay && this.m_revertStart == false) {
            this.m_revertStart = true;
            this.revertPower();
        }
    }
    else {
        if (now < this.startTime + 2000) {
            return;
        }
        else if (now > this.startTime + 2000 && now < this.startTime + 4000) {
            this.initFlicker(500);
        }
        else if (now > this.startTime + 4000 && now < this.startTime + 6000) {
            this.initFlicker(250);
        }
        else if(now > this.startTime + 6000){
            this.initFlicker(100);
        }

        if (now > this.startTime + 8000) {
            this.m_delete();
        }
    }

}

/**
 * Starts a flicker effect
 * 
 * @param {number} amount - Frequency of the flicker
 * 
 * @returns {undefined}
 * @public
 */
panicCity.entity.Powerups.prototype.initFlicker = function (amount) {
    if (this.flickerActive) {
        return;
    }
    this.flickerActive = true;
    this.flicker.start(1000, amount, function () {
        this.flickerActive = false;
    }, this);
}

/**
 * Initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Powerups.prototype.m_initAnimations = function () {
    this.animation.create("idle", [0, 1], 2, true);
};

/**
 * Initializes the powerup
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Powerups.prototype.initPower = function () {
    //@note: Override from child
    if (this.m_initiated) {
        return;
    }
    new panicCity.entity.ShowScore(this, 10, this.game);
    this.game.updateScoretext(10);
    this.initTime = Date.now();
    this.m_initiated = true;
    this.visible = false;
    this.m_pickUpSound.play();
}

/**
 * Reverts the powerup
 * 
 * @return {undefined}
 * @public
 */
panicCity.entity.Powerups.prototype.revertPower = function () {
    //@note: Override from child
    this.m_delete();
}

/**
 * Removes the item from the game
 * 
 * @returns {undefined}
 * @private
 */
panicCity.entity.Powerups.prototype.m_delete = function () {
    this.game.powerups.removeMember(this, true);
}