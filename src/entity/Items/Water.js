//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *  The item Water
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
    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.hp = 10;

    /**
     * The category of the item
     * 
     * @type (string)
     * @public
     */
    this.type = "WATER";

    /**
     * Total amount of points to be added to score
     * 
     * @type (number)
     * @public
     */
    this.pointValue = 5;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Items.call(this, x, y, 13, 16, "Water-Sheet", game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Water.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Water.prototype.constructor = panicCity.entity.Water;