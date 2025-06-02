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

    /**
     * Background music
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_backgroundSound = null;
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

    this.m_backgroundSound = this.application.sounds.master.get("Menu-music");
    this.m_backgroundSound.loop = true;
    this.m_backgroundSound.volume = 0.5;
    this.m_backgroundSound.play();

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);

    this.m_initBackground();

    var scoreText = new rune.text.BitmapField("YOUR SCORE:" + this.game.score, "Font");
    scoreText.autoSize = true;
    scoreText.centerX = this.application.screen.centerX;
    scoreText.y = 90;

    this.stage.addChild(scoreText);

    var nameInput = new rune.text.BitmapField("ENTER NAME", "Font");
    nameInput.autoSize = true;
    nameInput.centerX = this.application.screen.centerX;
    nameInput.y = 115;

    this.stage.addChild(nameInput);

    this.keyboardKeys = new panicCity.components.Keys();
    this.keyboardKeys.forEach(function (key, index) {
        if (index < 13) {
            key.x = 110 + index * 14;
            key.y = 160;
        } else {
            var secondRowIndex = index - 13;
            key.x = 110 + secondRowIndex * 14;
            key.y = 175;
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

    if (this.keyboard.justPressed("D") || this.gamepads.stickLeftJustRight) {
        this.m_moveRight();
    }

    if (this.keyboard.justPressed("A") || this.gamepads.stickLeftJustLeft) {
        this.m_moveLeft();
    }

    if (this.keyboard.justPressed("S") || this.gamepads.stickLeftJustDown) {
        this.m_moveDown();
    }

    if (this.keyboard.justPressed("W") || this.gamepads.stickLeftJustUp) {
        this.m_moveUp();
    }

    if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(0)) {
        var selectedChar = this.keyboardKeys[this.m_currentkeyIndex].text;

        if (selectedChar == "$" && this.m_teamName.length > 0) {
            this.m_teamName.pop();
        } else if (this.m_teamName.length < 5 && selectedChar !== "$" && selectedChar !== "#") {
            this.m_teamName.push(selectedChar);
        }

        if (selectedChar == "#" && this.m_teamName.length <= 0) {
            this.m_displayError();


        } else if (selectedChar == "#" && this.m_teamName.length > 0) {
            this.m_saveName(this.m_teamName);
        }

        this.m_displayteamName(this.m_teamName);
    }
};

/**
 * @inheritDoc
 */
panicCity.scene.VirtualKeyboard.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * Initializes the background
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_initBackground = function () {
    this.m_background = new rune.display.Graphic(
        0,
        0,
        400,
        225,
        "image_NewHighscore"
    );
    this.stage.addChild(this.m_background);
};

/**
 * Moves the selectBox Right.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_moveRight = function () {
    this.m_currentkeyIndex++;

    if (this.m_currentkeyIndex >= this.keyboardKeys.length) {
        this.m_currentkeyIndex = this.keyboardKeys.length - 1;
    }

    this.selectBox.x = this.keyboardKeys[this.m_currentkeyIndex].x - 2;
    this.selectBox.y = this.keyboardKeys[this.m_currentkeyIndex].y - 2;

};

/**
 * Moves the selectBox Left.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_moveLeft = function () {
    this.m_currentkeyIndex--;

    if (this.m_currentkeyIndex < 0) {
        this.m_currentkeyIndex = 0;
    }

    this.selectBox.x = this.keyboardKeys[this.m_currentkeyIndex].x - 2;
    this.selectBox.y = this.keyboardKeys[this.m_currentkeyIndex].y - 2;

};

/**
 * Moves the selectBox Down.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_moveDown = function () {
    if (this.m_currentkeyIndex >= 13) {
        return;
    }

    this.m_currentkeyIndex += 13;

    this.selectBox.x = this.keyboardKeys[this.m_currentkeyIndex].x - 2;
    this.selectBox.y = this.keyboardKeys[this.m_currentkeyIndex].y - 2;

};

/**
 * Moves the selectBox Up.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_moveUp = function () {
    if (this.m_currentkeyIndex <= 12) {
        return;
    }

    if (this.m_currentkeyIndex == 26 || this.m_currentkeyIndex == 27) {
        return;
    }

    this.m_currentkeyIndex -= 13;

    this.selectBox.x = this.keyboardKeys[this.m_currentkeyIndex].x - 2;
    this.selectBox.y = this.keyboardKeys[this.m_currentkeyIndex].y - 2;
};

/**
 * Handles showing of the error message.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_displayError = function () {
    if (this.m_errorMessage) {
        this.stage.removeChild(this.m_errorMessage);
    }

    this.m_errorMessage = new rune.text.BitmapField("YOU MUST ENTER A NAME", "Font");
    this.m_errorMessage.autoSize = true;
    this.m_errorMessage.centerX = this.application.screen.centerX;
    this.m_errorMessage.y = 195;

    this.stage.addChild(this.m_errorMessage);
};

/**
 * Handles routing for selecting on the menu.
 * 
 * @param {Array} nameText - Array containing the letter for the m_teamName.
 * 
 * @private
 * @returns {undefined}
 */
panicCity.scene.VirtualKeyboard.prototype.m_displayteamName = function (nameText) {

    this.m_displayedLetters.forEach(function (key) {
        this.stage.removeChild(key);
    }.bind(this));

    this.m_displayedLetters = [];

    nameText.forEach(function (text, index) {
        var key = new rune.text.BitmapField(text, "Font");
        key.x = 170 + index * 14;
        key.y = 135;
        this.stage.addChild(key);
        this.m_displayedLetters.push(key);
    }.bind(this));
};

/**
 * Handle routing for selecting on the menu.
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


