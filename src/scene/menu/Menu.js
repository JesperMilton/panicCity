//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Menu scene Object
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
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

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);

    var text = new rune.text.BitmapField("Hello Menu!");
    text.autoSize = true;
    text.center = this.application.screen.center;

    this.stage.addChild(text);
};

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    var gamepad = this.gamepads.get(0);
    if (this.keyboard.justPressed("SPACE") || gamepad.justPressed(2)) {
        this.application.scenes.load([new panicCity.scene.Game()]);
    }
};

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};