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
    this.game = game;
};

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

panicCity.managers.ItemSpawner.prototype.m_randomChance = function(percentage){
    var result = rune.util.Math.chance(percentage);
    return result;
}