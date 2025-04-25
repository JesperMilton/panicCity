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
panicCity.managers.ZombieSpawner = function (game) {
    this.spawnPoints = [{ x: -50, y: 150 }, { x: 75, y: 330 }, { x: 525, y: 150 }, { x: 350, y: 330 }];
    this.game = game;
};

panicCity.managers.ZombieSpawner.prototype.spawnZombie = function () {
    var ran = Math.floor(Math.random() * 2) + 1;

    var randomNum = Math.floor(Math.random() * 4);

    if (ran == 1) {
        var zombieBasic = new panicCity.entity.ZombieBasic(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "newZombie-Sheet", this.game);

        zombieBasic.targets = this.game.baseSta; //not using the group

        this.game.enemies.addMember(zombieBasic);
    }

    if (ran == 2) {
        var zombieHunter = new panicCity.entity.ZombieHunter(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "newZombie-Sheet", this.game);

        zombieHunter.targets = this.game.players;

        this.game.enemies.addMember(zombieHunter);
    }
};

panicCity.managers.ZombieSpawner.prototype.spawnZombieBoss = function () {
    // var randomNum = Math.floor(Math.random() * 2);

    var zombieBoss = new panicCity.entity.ZombieBoss(-80, 100, 81, 78, "Boss-Sheet", this.game);

    zombieBoss.targets = [this.game.players, this.game.baseSta];

    this.game.enemies.addMember(zombieBoss);
};

