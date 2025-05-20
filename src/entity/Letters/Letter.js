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
 * Class for letter used for the keyboard in the game.
 */
panicCity.entity.Letter = function () {

    this.arr = [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U",
        "V", "W", "X", "Y", "Z", "-"
    ];

    this.test = [];

    this.arr.forEach(function (letter) {
        this.test.push(new rune.text.BitmapField(letter, "Font"));
    }.bind(this));

    return this.test;
};


