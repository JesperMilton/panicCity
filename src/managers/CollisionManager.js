panicCity.managers.CollisionManager = function (game) {
    this.game = game;
};

panicCity.managers.CollisionManager.prototype.update = function () {
    this.m_players();
    this.m_enemies();
    this.m_bullets();
    this.m_stones();
    this.m_items();
};

panicCity.managers.CollisionManager.prototype.m_players = function () {
    this.game.players.hitTestAndSeparateGroup(this.game.baseSta);
};

panicCity.managers.CollisionManager.prototype.m_enemies = function () {
    this.game.enemies.hitTestAndSeparateGroup(this.game.players, function (enemy, player) {
        enemy.attack(player);
    }, this);

    this.game.enemies.hitTestAndSeparateGroup(this.game.baseSta, function (enemy, base) {
        enemy.attack(base);
    }, this);
};

panicCity.managers.CollisionManager.prototype.m_bullets = function () {
    this.game.bullets.hitTest(this.game.enemies, function (bullet, enemy) {
        enemy.takeDamage(bullet.damage);
        this.game.bullets.removeMember(bullet, true);
    }, this);
};

panicCity.managers.CollisionManager.prototype.m_stones = function () {
    this.game.stones.hitTest(this.game.players, function (stone, player) {
        player.takeDamage(stone.damage);
        this.game.stones.removeMember(stone, true);
    }, this);

    this.game.stones.hitTest(this.game.baseSta, function (stone, base) {
        base.takeDamage(stone.damage);
        this.game.stones.removeMember(stone, true);
    }, this);
};
panicCity.managers.CollisionManager.prototype.m_items = function () {
    this.game.items.hitTest(this.game.players, function(item, player){
        if(item.type === "MEDKIT"){
            item.heal(this.game.players);
        }
        else{
            item.heal(this.game.baseSta);
        }
    }, this);
}
