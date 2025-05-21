/**
 * The Gameover Object, responsible for showing the Gameover Screen
 * 
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 * @param {rune.scene.Scene} game - The game object
*/
panicCity.scene.Gameover = function (game) {
    rune.scene.Scene.call(this);

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
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
panicCity.scene.Gameover.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);

    this.m_initBackground();
    this.m_initMenu();

    var text = new rune.text.BitmapField("YOUR SCORE:" + this.game.score, "Font");
    text.autoSize = true;
    text.centerX = this.application.screen.centerX;
    text.y = 120;

    this.stage.addChild(text);
};

/**
 * @inheritDoc
 */
panicCity.scene.Gameover.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
panicCity.scene.Gameover.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * Initialize the Menu.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.scene.Gameover.prototype.m_initMenu = function () {
    this.m_menu = new rune.ui.VTMenu({ resource: "Font", pointer: panicCity.components.Pointer });
    this.m_menu.onSelect(this.m_onMenuSelect, this);
    this.m_menu.add("HIGHSCORE");
    this.m_menu.add("BACK TO MENU");
    this.m_menu.centerX = this.cameras.getCameraAt(0).viewport.centerX;
    this.m_menu.y = 160;
    this.stage.addChild(this.m_menu);
};

/**
 * Initializes the background
 * @private
 * @returns {undefined}
 */
panicCity.scene.Gameover.prototype.m_initBackground = function () {
    this.m_background = new rune.display.Graphic(
        0,
        0,
        400,
        225,
        "image_Gameover"
    );
    this.stage.addChild(this.m_background);
};

/**
 * Handles the navigation on the menu.
 * @private
 * @returns {undefined}
 */
panicCity.scene.Gameover.prototype.m_updateInput = function (step) {
    if (this.keyboard.justPressed("W") || this.gamepads.stickLeftJustUp) {
        this.m_menu.up()
    }

    if (this.keyboard.justPressed("S") || this.gamepads.stickLeftJustDown) {
        this.m_menu.down()
    }

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
panicCity.scene.Gameover.prototype.m_onMenuSelect = function (elem) {
    switch (elem.text) {
        case "BACK TO MENU":
            this.application.scenes.load([new panicCity.scene.Menu()])
            break;

        case "HIGHSCORE":
            this.application.scenes.load([new panicCity.scene.HighscoreScene()])
            break;
    }
};