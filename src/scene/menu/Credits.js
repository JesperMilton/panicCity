//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Credits scene Object
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 */
panicCity.scene.Credits = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Credits.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Credits.prototype.constructor = panicCity.scene.Credits;

/**
 * @inheritDoc
 */
panicCity.scene.Credits.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var text = new rune.text.BitmapField("Created by: Jesper & Hibba!!");
    text.autoSize = true;
    text.center = this.application.screen.center;

    this.stage.addChild(text);
};

/**
 * @inheritDoc
 */
panicCity.scene.Credits.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(1)) {
        this.application.scenes.load([new panicCity.scene.Menu()]);
    }
};

