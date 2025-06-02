//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the CollisionManager class.
 *
 * @constructor
 *
 * @class
 * 
 * @param {rune.scene.Scene} game - The Game object.
 * 
 * Class to handle all the collisions in the Game.
 */
panicCity.managers.CollisionManager = function (game) {

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * The walls to contain the game area.
     * 
     * @type {rune.display.DisplayObject[]}
     * @public
     */
    this.m_walls = [
        this.leftWall = new rune.display.DisplayObject(-10, -5, 10, 485),
        this.topWall = new rune.display.DisplayObject(-5, -10, 485, 10),
        this.bottomWall = new rune.display.DisplayObject(-5, 300, 485, 10),
        this.rightWall = new rune.display.DisplayObject(475, -5, 10, 485)
    ];

    this.m_walls.forEach(function (wall) {
        wall.immovable = true;
        this.game.walls.addMember(wall);
    }, this);

    /**
     * Sound file for when projectile hits target
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_hitSound = this.game.application.sounds.sound.get("throw-attack");
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
    this.m_projectiles();
    this.m_items();
    this.m_rescuees();
    this.m_powerups();
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

    this.game.players.hitTest(this.game.players, function (player1, player2) {
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
        enemy.attack(player);
        enemy.isAttacking = true;
    });

    this.game.enemies.hitTestAndSeparateGroup(this.game.baseSta, function (enemy, base) {
        enemy.attack(base);
        enemy.isAttacking = true;
    });
};

/**
 * Controls the collision for the bullets DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.CollisionManager.prototype.m_bullets = function () {
    this.game.bullets.hitTestGroup(this.game.enemies, function (bullet, enemy) {
        enemy.takeDamage(bullet.damage);
        this.game.bullets.removeMember(bullet, true);
    }, this);

    this.game.bullets.hitTestGroup(this.game.walls, function (bullet) {
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
panicCity.managers.CollisionManager.prototype.m_projectiles = function () {
    this.game.projectiles.hitTestGroup(this.game.players, function (projectile, player) {
        if (player.isDowned) {
            return;
        }
        player.takeDamage(projectile.damage);
        this.m_hitSound.play("true");
        this.game.projectiles.removeMember(projectile, true);
    }, this);

    this.game.projectiles.hitTestGroup(this.game.baseSta, function (projectile, base) {
        base.takeDamage(projectile.damage);
        this.m_hitSound.play("true");
        this.game.projectiles.removeMember(projectile, true);
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
    this.game.items.hitTestGroup(this.game.players, function (item, player) {
        if (item.type === "MEDKIT") {
            item.heal(this.game.players);
        }
        else {
            item.heal(this.game.baseSta);
        }
    }, this);
}

/**
 * Controls the collision for the rescuees DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.CollisionManager.prototype.m_rescuees = function () {
    this.game.humans.hitTestGroup(this.game.players, function (human, player) {
        if (human.inPosition) {
            player.pickupNPC(human, this.game.baseSta);
        }
    }, this);
}

/**
 * Controls the collision for the powerups DisplayGroup.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.CollisionManager.prototype.m_powerups = function () {
    this.game.powerups.hitTestGroup(this.game.players, function (item, player) {
        if (item.type === "INVINCIBILITY_BASE") {
            item.initPower(this.game.base);
        }
        else {
            item.initPower(player);
        }
    }, this);
}