/**
 * The Gameover Object, responsible for showing the Gameover Screen
 * 
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 * @param {Object} game - The game object
*/
panicCity.scene.Gameover = function(game){
    rune.scene.Scene.call(this);

    /**
     * The Game object.
     * 
     * @type (Object)
     * @public
     */
    this.game = game;
}

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Gameover.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Gameover.prototype.constructor = panicCity.scene.Gameover;

/**
 * @inheritDoc
 */
panicCity.scene.Gameover.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);

    var text = new rune.text.BitmapField("Gameover! Your Score: " + this.game.score);
    text.autoSize = true;
    text.center = this.application.screen.center;

    this.stage.addChild(text);
};

/**
 * @inheritDoc
 */
 panicCity.scene.Gameover.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    var gamepad = this.gamepads.get(0);
    if (this.keyboard.justPressed("SPACE") || gamepad.justPressed(2)) {
        this.application.scenes.load([new panicCity.scene.Menu()]);
    }
};

/**
 * @inheritDoc
 */
panicCity.scene.Gameover.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};