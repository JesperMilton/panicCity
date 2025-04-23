//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

panicCity.entity.Items = function (x, y, width, height, texture, game) {
    this.game = game;
    rune.display.Graphic.call(this, x, y, width, height, texture);
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

panicCity.entity.Items.prototype.heal = function (target) {
    target.forEachMember(function (target){
        target.heal(this.hp);
    }, this);
    this.m_delete();
}

panicCity.entity.Items.prototype.m_delete = function () {
    this.game.items.removeMember(this, true);
}