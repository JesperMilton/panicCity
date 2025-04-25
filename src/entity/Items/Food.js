//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends panicCity.entity.Items
 *
 * @class
 * @classdesc
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {object} game - The Game object.
 * 
 * ...
 */
panicCity.entity.Food = function (x, y, game) {
    var texture = "Food-Sheet";
    var width = 16;
    var height = 22;
    this.hp = 15;
    this.type = "FOOD";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Food.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Food.prototype.constructor = panicCity.entity.Food;