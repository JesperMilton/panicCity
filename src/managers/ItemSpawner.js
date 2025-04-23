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
    var ran = Math.floor(Math.random() * 10) + 1;
    var item;
    if (ran == 1) {
        item = new panicCity.entity.Medkit(x, y, this.game);
    }
    if (ran == 2 || ran == 3) {
        item = new panicCity.entity.Food(x, y, this.game);
    }
    if (ran >= 4 && ran <= 6) {
        item = new panicCity.entity.Water(x, y, this.game);
    }
    if (ran >= 7 && ran <= 10) {
        item = new panicCity.entity.Plank(x, y, this.game);
    }
    this.game.items.addMember(item);
}
