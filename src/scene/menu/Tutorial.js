//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Tutorial scene Object
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 */
panicCity.scene.Tutorial = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Tutorial.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Tutorial.prototype.constructor = panicCity.scene.Tutorial;

/**
 * @inheritDoc
 */
panicCity.scene.Tutorial.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);

    this.m_initBackground();
    this.m_initMenu();
};

/**
 * @inheritDoc
 */
panicCity.scene.Tutorial.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
panicCity.scene.Tutorial.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * Initializes the background
 * @private
 * @returns {undefined}
 */
panicCity.scene.Tutorial.prototype.m_initBackground = function () {
    this.m_background = new rune.display.Graphic(
        0,
        0,
        400,
        225,
        "Tutorial"
    );
    this.stage.addChild(this.m_background);
};

/**
 * @inheritDoc
 */
panicCity.scene.Tutorial.prototype.m_initMenu = function () {
    this.m_menu = new rune.ui.VTMenu({ resource: "Font" });
    this.m_menu.onSelect(this.m_onMenuSelect, this);
    this.m_menu.add("BACK TO MENU");
    // this.m_menu.centerX = this.cameras.getCameraAt(0).viewport.centerX + 45;
    this.m_menu.centerX = this.cameras.getCameraAt(0).viewport.centerX;
    this.m_menu.y = 200;
    this.stage.addChild(this.m_menu);
};

/**
 * Handles the navigation on the menu.
 * @private
 * @returns {undefined}
 */
panicCity.scene.Tutorial.prototype.m_updateInput = function (step) {
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
panicCity.scene.Tutorial.prototype.m_onMenuSelect = function (elem) {
    this.application.scenes.load([new panicCity.scene.Menu()])

};