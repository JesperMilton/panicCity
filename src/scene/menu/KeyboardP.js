//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new KeyboardP scene Object
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 */
panicCity.scene.KeyboardP = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    this.m_currentLetterIndex = 0;

    this.Pname = [];

    this.disLet = [];

    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.KeyboardP.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.KeyboardP.prototype.constructor = panicCity.scene.KeyboardP;

/**
 * @inheritDoc
 */
panicCity.scene.KeyboardP.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.cameras.getCameraAt(0).fade.opacity = 1;
    this.cameras.getCameraAt(0).fade.in(1000);

    this.m_initMenu();

    this.testt = new panicCity.entity.Letter();

    this.testt.forEach(function (letter, index) {
        letter.x = 15 + index * 14;
        letter.y = 50;
        this.stage.addChild(letter);
    }.bind(this));

    console.log(this.testt);

    this.selectBox = new rune.display.Graphic(this.testt[0].x - 2, this.testt[0].y - 2, 12, 12, "SelectBox");

    this.stage.addChild(this.selectBox);

};

/**
 * @inheritDoc
 */
panicCity.scene.KeyboardP.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.keyboard.justPressed("A") || this.gamepads.stickLeftLeft) {
        this.m_currentLetterIndex--;

        if (this.m_currentLetterIndex < 0) {
            this.m_currentLetterIndex = 0;
        }

        this.selectBox.x = this.testt[this.m_currentLetterIndex].x - 2;
    }

    if (this.keyboard.justPressed("D") || this.gamepads.stickLeftRight) {
        this.m_currentLetterIndex++;

        if (this.m_currentLetterIndex >= this.testt.length) {
            this.m_currentLetterIndex = this.testt.length - 1;
        }

        this.selectBox.x = this.testt[this.m_currentLetterIndex].x - 2;
    }

    if (this.keyboard.justPressed("Q") || this.gamepads.justPressed(2)) {
        var selectedChar = this.testt[this.m_currentLetterIndex].text;

        if (selectedChar == "-" && this.Pname.length > 0) {
            this.Pname.pop();
        } else if (this.Pname.length < 3 && selectedChar !== "-") {
            this.Pname.push(selectedChar);
        }

        this.displayname(this.Pname);
    }

    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
panicCity.scene.KeyboardP.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * @inheritDoc
 */
panicCity.scene.KeyboardP.prototype.m_initMenu = function () {
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
panicCity.scene.KeyboardP.prototype.m_updateInput = function (step) {
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
panicCity.scene.KeyboardP.prototype.m_onMenuSelect = function (elem) {
    this.application.scenes.load([new panicCity.scene.Menu()])

};

panicCity.scene.KeyboardP.prototype.displayname = function (arr) {

    this.disLet.forEach(function (letter) {
        this.stage.removeChild(letter);
    }.bind(this));

    this.disLet = [];

    arr.forEach(function (text, index) {
        var letter = new rune.text.BitmapField(text, "Font");
        letter.x = 180 + index * 14;
        letter.y = 150;
        this.stage.addChild(letter);
        this.disLet.push(letter);
    }.bind(this));
};


