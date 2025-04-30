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
 * @param {object} game - The Game object.
 * 
 * ...
 */
panicCity.managers.CollisionManager = function (game) {
    /**
     * Reference to the Game object.
     *
     * @type {object}
     * 
     */
    this.game = game;

    this.m_walls = [
        this.leftWall = new rune.display.DisplayObject(-10, -5, 10, 485),
        this.topWall = new rune.display.DisplayObject(-5, -10, 310, 10),
        this.bottomWall = new rune.display.DisplayObject(-5, 300, 310, 10),
        this.rightWall = new rune.display.DisplayObject(475, -5, 10, 485)
    ];

    this.m_walls.forEach(function (wall) {
        wall.immovable = true;
        this.game.walls.addMember(wall);
    }, this);
};

/**
 * Calls the private methods to control collision.
 *
 * @return {undefined}
 * 
 */
panicCity.managers.CollisionManager.prototype.update = function () {
    this.m_players();
    this.m_enemies();
    this.m_bullets();
    this.m_stones();
    this.m_items();
    this.m_rescuees();
};

/**
 * Controls the collision for the players DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.CollisionManager.prototype.m_players = function () {
    this.game.players.hitTestAndSeparateGroup(this.game.baseSta);
    this.game.players.hitTestAndSeparateGroup(this.game.walls);

    this.game.players.hitTest(this.game.players, function(player1, player2) {
        player1.res(player2);
    })
};

/**
 * Controls the collision for the enemies DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.CollisionManager.prototype.m_enemies = function () {
    this.game.enemies.hitTestAndSeparateGroup(this.game.players, function (enemy, player) {
        enemy.isAttacking = true;
        enemy.attack(player);
    }, this);

    this.game.enemies.hitTestAndSeparateGroup(this.game.baseSta, function (enemy, base) {
        enemy.isAttacking = true;
        enemy.attack(base);
    }, this);
};

/**
 * Controls the collision for the bullets DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.CollisionManager.prototype.m_bullets = function () {
    this.game.bullets.hitTest(this.game.enemies, function (bullet, enemy) {
        enemy.takeDamage(bullet.damage);
        this.game.bullets.removeMember(bullet, true);
    }, this);

    this.game.bullets.hitTest(this.game.walls, function (bullet) {
        this.game.bullets.removeMember(bullet, true);
    }, this);
};

/**
 * Controls the collision for the stones DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
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

/**
 * Controls the collision for the items DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.CollisionManager.prototype.m_items = function () {
    this.game.items.hitTest(this.game.players, function (item, player) {
        if (item.type === "MEDKIT") {
            item.heal(this.game.players);
        }
        else {
            item.heal(this.game.baseSta);
        }
    }, this);
}

panicCity.managers.CollisionManager.prototype.m_rescuees = function () {
    this.game.humans.hitTest(this.game.players, function (human, player) {
        if(human.inPosition){
            player.pickupNPC(human,this.game.baseSta);
        }
    }, this);
}
