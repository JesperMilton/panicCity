//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the FullAuto class.
 *
 * @constructor
 * @extends panicCity.entity.Powerups
 *
 * @class
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {rune.scene.Scene} game - The Game object
 * 
 * The class for the basic Zombie, includes methods such as initStatus and movement logic
 */
 panicCity.entity.FullAuto = function (x, y, width, height, texture, game) {

    /**
     * The type of powerup
     * 
     * @type {string}
     * @public
     */
    this.type = "FULL_AUTO";

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    panicCity.entity.Powerups.call(this, x, y, width, height, texture, game);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.FullAuto.prototype = Object.create(panicCity.entity.Powerups.prototype);
panicCity.entity.FullAuto.prototype.constructor = panicCity.entity.FullAuto;

/**
 * Gives player a minigun for 5 seconds
 * 
 * @param {panicCity.entity.Player} target - The target to be affected
 * 
 * @return {undefined}
 * @public
 */
panicCity.entity.FullAuto.prototype.initPower = function(target){
    this.target = target;
    panicCity.entity.Powerups.prototype.initPower.call(this);
    this.target.fullAuto = true;
}

/**
 * @inheritdoc
 */
panicCity.entity.FullAuto.prototype.revertPower = function(){
    this.target.fullAuto = false;
    panicCity.entity.Powerups.prototype.revertPower.call(this);
}