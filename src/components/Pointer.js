//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Pointer class.
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @class
 * 
 * Class for Pointer.
 */
panicCity.components.Pointer = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Graphic.call(this, 0, 0, 5, 5, "image_Bullet");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.components.Pointer.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.components.Pointer.prototype.constructor = panicCity.components.Pointer;

