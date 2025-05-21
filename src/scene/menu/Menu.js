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
panicCity.scene.Menu = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Demo selection menu.
     *
     * @type {rune.ui.VTMenu}
     * @private
     */
    this.m_menu = null;

    /**
     * Background music
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_backgroundSound;

    /**
     * Sound file for movement in menu select
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_moveSound;

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
panicCity.scene.Menu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_backgroundSound = this.application.sounds.master.get("Menu-music");
    this.m_backgroundSound.loop = true;
    this.m_backgroundSound.volume = 0.5;
    this.m_backgroundSound.play();

    this.m_moveSound = this.application.sounds.sound.get("Menu-move-sound");

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);

    this.m_initBackground();
    this.m_initMenu();
};

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.m_initMenu = function () {
    this.m_menu = new rune.ui.VTMenu({ resource: "Font" });
    this.m_menu.onSelect(this.m_onMenuSelect, this);
    this.m_menu.add("GAME");
    this.m_menu.add("TUTORIAL");
    this.m_menu.add("HIGHSCORE");
    this.m_menu.add("CREDITS");
    this.m_menu.add("KEYBOARD");
    this.m_menu.centerX = this.cameras.getCameraAt(0).viewport.centerX;
    this.m_menu.y = 130;
    this.stage.addChild(this.m_menu);
};

/**
 * Initializes the background
 * @private
 * @returns {undefined}
 */
panicCity.scene.Menu.prototype.m_initBackground = function () {
    this.m_background = new rune.display.Graphic(
        0,
        0,
        400,
        225,
        "Menu_Blood-Empty"
    );
    this.stage.addChild(this.m_background);
};


/**
 * Handles the navigation on the menu.
 * @private
 * @returns {undefined}
 */
panicCity.scene.Menu.prototype.m_updateInput = function (step) {
    if (this.keyboard.justPressed("W") || this.gamepads.stickLeftJustUp) {
        this.m_moveSound.play();
        this.m_menu.up()
    }

    if (this.keyboard.justPressed("S") || this.gamepads.stickLeftJustDown) {
        this.m_moveSound.play();
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
panicCity.scene.Menu.prototype.m_onMenuSelect = function (elem) {
    switch (elem.text) {
        case "GAME":
            this.application.scenes.load([new panicCity.scene.Game()])
            this.m_backgroundSound.stop();
            break;

        case "TUTORIAL":
            this.application.scenes.load([new panicCity.scene.Tutorial()])
            break;

        case "HIGHSCORE":
            this.application.scenes.load([new panicCity.scene.HighscoreScene()])
            break;

        case "CREDITS":
            this.application.scenes.load([new panicCity.scene.Credits()])
            break;
        case "KEYBOARD":
            this.application.scenes.load([new panicCity.scene.KeyboardP()])
            break;
    }
};