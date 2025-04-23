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
    var texture = null;
    var width = 5;
    var height = 5;
    this.hp = 5;
    this.type = "PLANK";
    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

panicCity.entity.Plank.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Plank.prototype.constructor = panicCity.entity.Plank;