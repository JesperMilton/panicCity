panicCity.scene.Gameover = function(game){
    rune.scene.Scene.call(this);
    this.game = game;
}

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Gameover.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Gameover.prototype.constructor = panicCity.scene.Gameover;

panicCity.scene.Gameover.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);

    var text = new rune.text.BitmapField("Gameover! Your Score: " + this.game.score);
    text.autoSize = true;
    text.center = this.application.screen.center;

    this.stage.addChild(text);
};

/**
 * Updates the zombie each frame by running the base update logic.
 *
 * @param {number} step - steps for the update-loop
 *
 * @returns {undefined}
 */
 panicCity.scene.Gameover.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    var gamepad = this.gamepads.get(0);
    if (this.keyboard.justPressed("SPACE") || gamepad.justPressed(2)) {
        this.application.scenes.load([new panicCity.scene.Menu()]);
    }
};

/**
 * This method is used for discarding references and removing object thats no longer in use. In the purpose of freeing up memory.
 *
 * @returns {undefined}
 */
panicCity.scene.Gameover.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};