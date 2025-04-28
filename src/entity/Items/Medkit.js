//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *  The item Medkit
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
    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.hp = 35;

    /**
     * The category of the item
     * 
     * @type (string)
     * @public
     */
    this.type = "MEDKIT";

    /**
     * Total amount of points to be added to score
     * 
     * @type (number)
     * @public
     */
    this.pointValue = 15;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Items.call(this, x, y, 18, 18, "Medkit-Sheet", game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Medkit.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Medkit.prototype.constructor = panicCity.entity.Medkit;