//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.Items = function (zombie, game) {
    this.game = game;
    this.hp = 50;
    this.x = zombie.x;
    this.y = zombie.y;
    rune.display.Graphic.call(this, this.x, this.y, 5, 5, null);
    this.backgroundColor = "white";
};
panicCity.entity.Items.prototype = Object.create(rune.display.Graphic.prototype);
panicCity.entity.Items.prototype.constructor = panicCity.entity.Items;

panicCity.entity.Items.prototype.init = function () {
    this.game.timers.create({
        duration: 5000,
        onComplete: function () {
            this.m_delete();
        }.bind(this),
    });
};

panicCity.entity.Items.prototype.heal = function (target){
    target.heal(this.hp);
    this.m_delete();
}

panicCity.entity.Items.prototype.m_delete = function () {
    this.game.items.removeMember(this, true);
}