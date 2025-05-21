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
    this.flickerActive = false;

    this.timer = this.game.timers.create({
        duration: 8000,
        onComplete: function () {
            this.m_delete();
        }.bind(this),
    });
};

panicCity.entity.Powerups.prototype.update = function(step){
    panicCity.entity.Entity.prototype.update.call(this, step);
    if(this.timer.elapsed <= 2000){
        return;
    }
    else if(this.timer.elapsed >= 2000 && this.timer.elapsed <= 4000){
        this.initFlicker(500);
    }
    else if(this.timer.elapsed >= 4000 && this.timer.elapsed <= 6000){
        this.initFlicker(250);
    }
    else{
        this.initFlicker(100);
    }
}

panicCity.entity.Powerups.prototype.initFlicker = function(amount){
    if (this.flickerActive) {
        return;
    }

    this.flickerActive = true;

    this.flicker.start(1000, amount, function() {
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
    new panicCity.entity.ShowScore(this, 10, this.game);
    this.game.updateScoretext(10);
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