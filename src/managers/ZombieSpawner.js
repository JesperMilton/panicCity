panicCity.managers.ZombieSpawner = function (game) {
    this.spawnPoints = [{x:-50, y:150}, {x:-50, y:50}, {x:450, y:150}, {x:450, y:50}];

    this.game = game;
    this.stage = this.game.stage;
};

panicCity.managers.ZombieSpawner.prototype.update = function () {
    this.m_spawnZombie();
};

panicCity.managers.ZombieSpawner.prototype.m_spawnZombie = function () {
    var ran = Math.floor(Math.random() * 100) + 1;

    var randomNum = Math.floor(Math.random() * 4);

    if (ran == 1) {
        var zombieBasic = new panicCity.entity.ZombieBasic(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "newZombie-Sheet", this.game);

        zombieBasic.targets = [
            this.game.base,
            this.game.playerJesper,
            this.game.playerHibba
        ];

        //console.log(zombieBasic);

        this.game.enemies.addMember(zombieBasic);
    }

    if (ran == 1) {
        var zombieHunter = new panicCity.entity.ZombieHunter(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "newZombie-Sheet", this.game);

        zombieHunter.targets = [
            this.game.playerJesper,
            this.game.playerHibba,
            this.game.base
        ];

        this.game.enemies.addMember(zombieHunter);
    }
};