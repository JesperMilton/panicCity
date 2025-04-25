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
panicCity.entity.Medkit = function (x, y, game) {
    var texture = "Medkit-Sheet";
    var width = 18;
    var height = 18;
    this.hp = 35;
    this.type = "MEDKIT";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Medkit.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Medkit.prototype.constructor = panicCity.entity.Medkit;