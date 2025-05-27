//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the ItemSpawner class.
 *
 * @constructor
 *
 * @class
 * 
 * @param {rune.scene.Scene} game - The Game object
 * 
 * Class to control how the items drop in the Game.
 */
panicCity.managers.ItemSpawner = function (game) {

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
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
    if (this.game.items > 10) {
        return;
    }
    var item;
    if(this.m_randomChance(60)){
        if (this.m_randomChance(20)) {
            item = new panicCity.entity.Items(x, y, 18, 18, "Medkit-Sheet", this.game, "MEDKIT", 35, 15);
        }
        else if (this.m_randomChance(40)) {
            item = new panicCity.entity.Items(x, y, 16, 22, "Food-Sheet", this.game, "FOOD", 15, 10);
        }
        else if (this.m_randomChance(60)) {
            item = new panicCity.entity.Items(x, y, 13, 16, "Water-Sheet", this.game, "WATER", 10, 5);
        }
        else if (this.m_randomChance(100)) {
            item = new panicCity.entity.Items(x, y, 20, 20, "Planks-Sheet", this.game, "PLANK", 5, 1);
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