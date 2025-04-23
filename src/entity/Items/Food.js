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
    var texture = null;
    var width = 5;
    var height = 5;
    this.hp = 15;
    this.type = "FOOD";
    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

panicCity.entity.Food.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Food.prototype.constructor = panicCity.entity.Food;