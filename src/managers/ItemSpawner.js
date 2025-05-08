//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * @param {object} game - The Game object
 * 
 * ...
 */
panicCity.managers.ItemSpawner = function (game) {

    /**
     * The Game object.
     * 
     * @type (Object)
     * @public
     */
    this.game = game;
};

/**
 * Spawns the different items based on the enimes location.
 * 
 * @param {number} x The X value of the enimey.
 * @param {number} y The Y value of the enemy.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.managers.ItemSpawner.prototype.spawnItem = function(x, y){
    var item;
    if(this.m_randomChance(70)){
        if (this.m_randomChance(20)) {
            item = new panicCity.entity.Medkit(x, y, this.game);
        }
        else if (this.m_randomChance(40)) {
            item = new panicCity.entity.Food(x, y, this.game);
        }
        else if (this.m_randomChance(60)) {
            item = new panicCity.entity.Water(x, y, this.game);
        }
        else if (this.m_randomChance(100)) {
            item = new panicCity.entity.Plank(x, y, this.game);
        }
    }
    else{
        return;
    }
    this.game.items.addMember(item);
}

/**
 * Returns a true based on the percentage.
 * 
 * @param {number} percentage The chance percentage.
 *
 * @return {boolean}
 * @private
 * 
 */
panicCity.managers.ItemSpawner.prototype.m_randomChance = function(percentage){
    var result = rune.util.Math.chance(percentage);
    return result;
}