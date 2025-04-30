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
    this.bossSpawnPoints = [{x: -80, y: 100}, {x: 555, y: 100}];
    this.game = game;
};

panicCity.managers.ZombieSpawner.prototype.spawnZombie = function () {
    var ran = Math.floor(Math.random() * 3) + 1;

    var randomNum = Math.floor(Math.random() * 4);

    if (ran == 1) {
        var zombieBasic = new panicCity.entity.ZombieBasic(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "ZombieAttack-Sheet", this.game);

        zombieBasic.targets = this.game.baseSta;

        this.game.enemies.addMember(zombieBasic);
    }

    if (ran == 2) {
        var zombieHunter = new panicCity.entity.ZombieHunter(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "Zombie-Hunter-Sheet", this.game);

        zombieHunter.targets = this.game.players;

        this.game.enemies.addMember(zombieHunter);
    }

    if (ran == 3) {
        var zombieRanger = new panicCity.entity.ZombieRanger(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "Zombie-Hunter-Sheet", this.game);

        zombieRanger.targets = this.game.players;

        this.game.enemies.addMember(zombieRanger);
    }
};

panicCity.managers.ZombieSpawner.prototype.spawnZombieBoss = function () {
    var randomNum = Math.floor(Math.random() * 2);

    var zombieBoss = new panicCity.entity.ZombieBoss(this.bossSpawnPoints[randomNum].x, this.bossSpawnPoints[randomNum].y,81, 78, "Boss-Sheet", this.game);

    zombieBoss.targets = [this.game.baseSta, this.game.players];

    this.game.enemies.addMember(zombieBoss);
};

