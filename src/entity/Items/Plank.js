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
panicCity.entity.Plank = function (x, y, game) {
    var texture = "Planks-Sheet";
    var width = 20;
    var height = 20;
    this.hp = 5;
    this.type = "PLANK";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Plank.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Plank.prototype.constructor = panicCity.entity.Plank;