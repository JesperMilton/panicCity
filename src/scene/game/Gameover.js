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
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
 panicCity.scene.Gameover.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.keyboard.justPressed("SPACE")) {
        this.application.scenes.load([new panicCity.scene.Menu()]);
    }
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
panicCity.scene.Gameover.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};