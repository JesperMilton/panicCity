panicCity.entity.Water = function (x, y, game) {
    var texture = null;
    var width = 5;
    var height = 5;
    this.hp = 10;
    this.type = "WATER";
    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

panicCity.entity.Water.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Water.prototype.constructor = panicCity.entity.Water;