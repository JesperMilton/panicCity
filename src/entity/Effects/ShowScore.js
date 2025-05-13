//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *  Class to give the player feedback on the amount of score earned.
 * 
 * @constructor
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
     * @type {number}
     * @public
     */
    this.score = score;

    /**
     * The origin of the score.
     *
     * @type {panicCity.entity.Entity}
     * @public
     */
    this.origin = origin;

    /**
     * New text to represent the score earned.
     *
     * @type {rune.text.BitmapField}
     * @public
     */
    this.scoreText = new rune.text.BitmapField(score.toString(), "Font");

    this.scoreText.autoSize = true;

    this.scoreText.centerX = this.origin.centerX;
    
    this.scoreText.centerY = this.origin.centerY;

    this.game.stage.addChild(this.scoreText);

    this.game.timers.create({
        duration: 1000,
        onComplete: function () {
            this.game.stage.removeChild(this.scoreText);
        }.bind(this)
    });
};
