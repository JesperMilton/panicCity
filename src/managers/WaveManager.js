panicCity.managers.WaveManager = function (game) {
    this.game = game;
    this.currentWave = 0;
    this.waveAmount = 5;
    this.currentZombies = 0;
    this.waveDuraction = 25000;
    this.coldDown = false;

    this.zombieSpawner = new panicCity.managers.ZombieSpawner(this.game);

    this.text = new rune.text.BitmapField();
    this.text.autoSize = true;
    this.game.stage.addChild(this.text);

    this.m_startnewWave();
};

panicCity.managers.WaveManager.prototype.m_startTimer = function () {
    this.game.timers.create({
        duration: this.waveDuraction,
        onComplete: function () {
            this.m_startnewWave();
        }.bind(this)
    });
};

panicCity.managers.WaveManager.prototype.updateSpawner = function () {
    this.m_callSpawner();
};

panicCity.managers.WaveManager.prototype.m_startnewWave = function () {
    this.waveAmount += 5;
    this.currentWave++;
    this.currentZombies = 0;

    this.text.text = "Wave: " + this.currentWave;
    this.text.x = this.game.application.screen.width - this.text.width - 5;
    this.text.y = 15;

    this.m_startTimer();
};

panicCity.managers.WaveManager.prototype.m_callSpawner = function () {
    if (!this.coldDown && (this.waveAmount >= this.currentZombies)) {
        this.coldDown = true;
        this.game.timers.create({
            duration: 800,
            onComplete: function () {
                this.zombieSpawner.spawnZombie();
                this.currentZombies++;
                this.coldDown = false;
            }.bind(this)
        });
    }
};