//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new scene object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Menu scene.
 */
panicCity.scene.Menu = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Menu.prototype.constructor = panicCity.scene.Menu;

panicCity.scene.Menu.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);

    var text = new rune.text.BitmapField("Hello Menu!");
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
panicCity.scene.Menu.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    var gamepad = this.gamepads.get(0);
    if (this.keyboard.justPressed("SPACE") || gamepad.justPressed(2)) {
        this.application.scenes.load([new panicCity.scene.Game()]);
    }
};

/**
 * This method is used for discarding references and removing object thats no longer in use. In the purpose of freeing up memory.
 *
 * @returns {undefined}
 */
panicCity.scene.Menu.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};