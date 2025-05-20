//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new HighscoreScene scene Object
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 */
panicCity.scene.HighscoreScene = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.HighscoreScene.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.HighscoreScene.prototype.constructor = panicCity.scene.HighscoreScene;

/**
 * @inheritDoc
 */
panicCity.scene.HighscoreScene.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);

    this.m_initMenu();

    var text = new rune.text.BitmapField("HIGHSCORE", "Font");
    text.autoSize = true;
    text.centerX = this.application.screen.centerX;
    text.y = 100;

    this.stage.addChild(text);
};

/**
 * @inheritDoc
 */
panicCity.scene.HighscoreScene.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
panicCity.scene.HighscoreScene.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * @inheritDoc
 */
panicCity.scene.HighscoreScene.prototype.m_initMenu = function () {
    this.m_menu = new rune.ui.VTMenu({ resource: "Font" });
    this.m_menu.onSelect(this.m_onMenuSelect, this);
    this.m_menu.add("BACK TO MENU");
    this.m_menu.centerX = this.cameras.getCameraAt(0).viewport.centerX;
    this.m_menu.y = 200;
    this.stage.addChild(this.m_menu);
};

/**
 * Handles the navigation on the menu.
 * @private
 * @returns {undefined}
 */
panicCity.scene.HighscoreScene.prototype.m_updateInput = function (step) {
    if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(0)) {
        this.m_menu.select();
    }
};

/**
 * Handles routing for selecting on the menu.
 * 
 * @param {Object} elem The selected menu object.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.HighscoreScene.prototype.m_onMenuSelect = function (elem) {
    this.application.scenes.load([new panicCity.scene.Menu()])

};
