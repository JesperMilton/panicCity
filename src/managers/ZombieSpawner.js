panicCity.managers.ZombieSpawner = function (game) {
    this.spawnPoints = [{x:-50, y:150}, {x:75, y:240}, {x:450, y:150}, {x:350, y:240}];
    this.game = game;
};

panicCity.managers.ZombieSpawner.prototype.spawnZombie = function () {
    var ran = Math.floor(Math.random() * 2) + 1;

    var randomNum = Math.floor(Math.random() * 4);

    if (ran == 1) {
        var zombieBasic = new panicCity.entity.ZombieBasic(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "newZombie-Sheet", this.game);

        zombieBasic.targets = [
            this.game.base,
            this.game.playerJesper,
            this.game.playerHibba
        ];

        this.game.enemies.addMember(zombieBasic);
    }

    if (ran == 2) {
        var zombieHunter = new panicCity.entity.ZombieHunter(this.spawnPoints[randomNum].x, this.spawnPoints[randomNum].y, 27, 26, "newZombie-Sheet", this.game);

        zombieHunter.targets = [
            this.game.playerJesper,
            this.game.playerHibba,
        ];

        this.game.enemies.addMember(zombieHunter);
    }
};