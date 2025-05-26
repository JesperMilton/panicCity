//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *  Class to give the player feedback on the amount of score earned.
 * 
 * @constructor
 * @extends rune.text.BitmapField
 *
 * @class
 *  
 * @param {panicCity.entity.Entity} origin - The origin of the score.
 * @param {number} score - The amount of score.
 * @param {rune.scene.Scene} game - The Game object
 * 
 */
panicCity.entity.ShowScore = function (origin, score, game) {

    /**
     * The Game object
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * The amount of score.
     *
     * @type {string}
     * @public
     */
    this.m_score = score.toString();

    /**
     * The origin of the score.
     *
     * @type {panicCity.entity.Entity}
     * @public
     */
    this.m_origin = origin;

     /**
     * The time it takes for the score to dispose.
     * 
     * @type {number}
     * @private
     */
    this.m_deleteTime = 1000;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.text.BitmapField.call(this, this.m_score, "Font");

    this.game.stage.addChild(this);

};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.ShowScore.prototype = Object.create(rune.text.BitmapField.prototype);
panicCity.entity.ShowScore.prototype.constructor = panicCity.entity.ShowScore;

/**
 * @inheritDoc
 */
panicCity.entity.ShowScore.prototype.init = function () {
    rune.text.BitmapField.prototype.init.call(this);

    this.autoSize = true;
    this.centerX = this.m_origin.centerX;
    this.centerY = this.m_origin.centerY;

    this.m_createdAt = Date.now();
};

/**
 * @inheritDoc
 */
panicCity.entity.ShowScore.prototype.update = function (step) {
    rune.text.BitmapField.prototype.update.call(this, step);

    var now = Date.now();
    if (now > this.m_createdAt + this.m_deleteTime) {
        this.m_removeScoreText();
    }
};

/**
 * Removes the ShowScore from the stage.
 * 
 * @returns {undefined}
 * @private
 */
panicCity.entity.ShowScore.prototype.m_removeScoreText = function () {
    this.game.stage.removeChild(this, true);
};