panicCity.managers.CollisionManager = function (game) {
    this.game = game;
};

panicCity.managers.CollisionManager.prototype.update = function () {
    this.m_players();
    this.m_enemies();
    this.m_bullets();

};

panicCity.managers.CollisionManager.prototype.m_players = function () {
    this.game.players.hitTestAndSeparateGroup(this.game.baseSta); 
    
};

panicCity.managers.CollisionManager.prototype.m_enemies = function () {
    this.game.enemies.hitTestAndSeparateGroup(this.game.players, function(enemy, player) {
        enemy.attack(player);
    },this); 

    this.game.enemies.hitTestAndSeparateGroup(this.game.baseSta, function(enemy, base) {
        enemy.attack(base);
    },this); 
};

panicCity.managers.CollisionManager.prototype.m_bullets = function () {
    var tempel = [];
    this.game.bullets.hitTest(this.game.enemies, function(bullet, enemy) {
        enemy.takeDamage(bullet.damage);
        tempel.push(bullet);
        // this.game.bullets.removeMember(bullet);
        console.log(this.game.bullets.numMembers);
    },this); 
    if(tempel) {
        tempel.forEach(function(bullet) {
            this.game.bullets.removeMember(bullet);
        }, this);
        // tempel = null;
    } 
};