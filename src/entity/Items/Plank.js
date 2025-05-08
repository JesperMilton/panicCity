//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *  The item Plank
 * 
 * @constructor
 * @extends panicCity.entity.Items
 *
 * @class
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {rune.scene.Scene} game - The Game object.
 * 
 */
panicCity.entity.Plank = function (x, y, game) {
    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.hp = 5;

    /**
     * The category of the item
     * 
     * @type (string)
     * @public
     */
    this.type = "PLANK";

    /**
     * Total amount of points to be added to score
     * 
     * @type (number)
     * @public
     */
    this.pointValue = 1;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Items.call(this, x, y, 20, 20, "Planks-Sheet", game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Plank.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Plank.prototype.constructor = panicCity.entity.Plank;