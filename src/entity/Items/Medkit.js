panicCity.entity.Medkit = function (x, y, game) {
    var texture = null;
    var width = 5;
    var height = 5;
    this.hp = 35;
    this.type = "MEDKIT";
    panicCity.entity.Items.call(this, x, y, width, height, texture, game);
};

panicCity.entity.Medkit.prototype = Object.create(panicCity.entity.Items.prototype);
panicCity.entity.Medkit.prototype.constructor = panicCity.entity.Medkit;