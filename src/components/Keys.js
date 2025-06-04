//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @class
 * 
 * @return {rune.text.BitmapField[]}
 * 
 * Class for Keys used for the keyboard in the game.
 */
panicCity.components.Keys = function () {

    /**
     * Array for all the character that will be used for the virtualKeyboard
     * @private
     * @type {String[]}
     */
    this.m_letters = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z", "$", "#"
    ];

    /**
     * Array for BitmapField that represents all the characters.
     * @private
     * @type {String[]}
     */
    this.m_keyFields = [];

    this.m_letters.forEach(function (letter) {
        this.m_keyFields.push(new rune.text.BitmapField(letter, "Font"));
    }.bind(this));

    return this.m_keyFields;
};


