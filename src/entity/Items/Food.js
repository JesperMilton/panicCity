//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * The item Food
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
panicCity.entity.Food = function (x, y, game) {
    /**
     * Total amount of healing points to be given out
     * 
     * @type (number)
     * @public
     */
    this.hp = 15;
    
    /**
     * The category of the item
     * 
     * @type (string)
     * @public
     */
    this.type = "FOOD";
    
    /**
     * Total amount of points to be added to score
     * 
     * @type (number)
     * @public
     */
    this.pointValue = 10;
    
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Items.call(this, x, y, 16, 22, "Food-Sheet", game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Food.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Food.prototype.constructor = panicCity.entity.Food;