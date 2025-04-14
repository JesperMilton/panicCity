panicCity.managers.ZombieSpawner = function (game) {
    this.spawnPoints = [{x:-50, y:150}, {x:-50, y:50}, {x:450, y:150}, {x:450, y:50}];
    this.game = game;
    this.stage = this.game.stage;
};

panicCity.managers.ZombieSpawner.prototype.update = function () {
    this.m_spawnZombie();
};

panicCity.managers.ZombieSpawner.prototype.m_spawnZombie = function () {
    var ran = Math.floor(Math.random() * 150) + 1;

    var randomNum = Math.floor(Math.random() * 4);

    if (ran == 1) {
        var zombie = new panicCity.entity.Zombie(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "Zombie-Sheet", this.game);

        zombie.targets = [
            this.game.playerJesper,
            this.game.playerHibba,
            this.game.base
        ];

        this.stage.addChild(zombie);
    }
};