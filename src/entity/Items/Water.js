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
panicCity.entity.Water = function (x, y, game) {
    var texture = "Water-Sheet";
    var width = 13;
    var height = 16;
    this.hp = 10;
    this.type = "WATER";
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Water.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Water.prototype.constructor = panicCity.entity.Water;