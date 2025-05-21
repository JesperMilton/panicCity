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
 * 
 * Class for Keys used for the keyboard in the game.
 */
panicCity.components.Keys = function () {

    this.letters = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z", "$", "#"
    ];

    this.keyFields = [];

    this.letters.forEach(function (letter) {
        this.keyFields.push(new rune.text.BitmapField(letter, "Font"));
    }.bind(this));

    return this.keyFields;
};


