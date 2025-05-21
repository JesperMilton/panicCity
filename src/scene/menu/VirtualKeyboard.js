//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new VirtualKeyboard scene Object
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 * @param {rune.scene.Scene} game - The game object
 */
panicCity.scene.VirtualKeyboard = function (game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.scene.Scene.call(this);
    
    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * Keeps track of current letter being selected.
     * @private
     * @type {number}
     */
    this.m_currentkeyIndex = 0;

    /**
     * Array for the selected characters.
     * @private
     * @type {Array}
     */
    this.m_teamName = [];

    /**
     * The letters which are displayed on screen based on the players inputs.
     * @private
     * @type {Array}
     */
    this.m_displayedLetters = [];
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.VirtualKeyboard.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.VirtualKeyboard.prototype.constructor = panicCity.scene.VirtualKeyboard;

/**
 * @inheritDoc
 */
panicCity.scene.VirtualKeyboard.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);

    this.keyboardKeys = new panicCity.components.Keys();
    this.keyboardKeys.forEach(function (key, index) {
        if (index < 13) {
            key.x = 115 + index * 14;
            key.y = 80;
        } else {
            var secondRowIndex = index - 13;
            key.x = 115 + secondRowIndex * 14;
            key.y = 100;
        }

        this.stage.addChild(key);
    }.bind(this));

    this.selectBox = new rune.display.Graphic(this.keyboardKeys[0].x - 2, this.keyboardKeys[0].y - 2, 12, 12, "SelectBox");
    this.stage.addChild(this.selectBox);
};

/**
 * @inheritDoc
 */
panicCity.scene.VirtualKeyboard.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.keyboard.justPressed("A") || this.gamepads.justPressed(14)) {
        this.m_currentkeyIndex--;

        if (this.m_currentkeyIndex < 0) {
            this.m_currentkeyIndex = 0;
        }

        this.selectBox.x = this.keyboardKeys[this.m_currentkeyIndex].x - 2;
        this.selectBox.y = this.keyboardKeys[this.m_currentkeyIndex].y - 2;
    }

    if (this.keyboard.justPressed("D") || this.gamepads.justPressed(15)) {
        this.m_currentkeyIndex++;

        if (this.m_currentkeyIndex >= this.keyboardKeys.length) {
            this.m_currentkeyIndex = this.keyboardKeys.length - 1;
        }

        this.selectBox.x = this.keyboardKeys[this.m_currentkeyIndex].x - 2;
        this.selectBox.y = this.keyboardKeys[this.m_currentkeyIndex].y - 2;
    }

    if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(0)) {
        var selectedChar = this.keyboardKeys[this.m_currentkeyIndex].text;

        if (selectedChar == "$" && this.m_teamName.length > 0) {
            this.m_teamName.pop();
        } else if (this.m_teamName.length < 3 && selectedChar !== "$") {
            this.m_teamName.push(selectedChar);
        }

        if (selectedChar == "#" && this.m_teamName.length > 0) {
            this.m_saveName(this.m_teamName);
        }

        this.m_displaym_teamName(this.m_teamName);
    }
};

/**
 * @inheritDoc
 */
panicCity.scene.VirtualKeyboard.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * Handles routing for selecting on the menu.
 * 
 * @param {Array} nameText - Array containing the letter for the m_teamName.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_displaym_teamName = function (nameText) {

    this.m_displayedLetters.forEach(function (key) {
        this.stage.removeChild(key);
    }.bind(this));

    this.m_displayedLetters = [];

    nameText.forEach(function (text, index) {
        var key = new rune.text.BitmapField(text, "Font");
        key.x = 180 + index * 14;
        key.y = 150;
        this.stage.addChild(key);
        this.m_displayedLetters.push(key);
    }.bind(this));
};

/**
 * Handles routing for selecting on the menu.
 * 
 * @param {Array} nameText - Array containing the letter for the m_teamName.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_saveName = function (nameText) {
    this.nameT = "";
    nameText.forEach(function (letter) {
        this.nameT += letter;
    }.bind(this));

    this.game.application.highscores.send(this.game.score, this.nameT);
    this.application.scenes.load([new panicCity.scene.Menu()]);
};


