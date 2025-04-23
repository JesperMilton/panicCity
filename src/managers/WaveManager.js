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
panicCity.managers.WaveManager = function (game) {
    this.game = game;
    this.currentWave = 0;
    this.waveAmount = 5;
    this.currentZombies = 0;
    this.coldDown = false;
    this.spawnComplete = false;

    this.zombieSpawner = new panicCity.managers.ZombieSpawner(this.game);

    this.text = new rune.text.BitmapField();
    this.text.autoSize = true;
    this.game.stage.addChild(this.text);

    this.m_startnewWave();
};

panicCity.managers.WaveManager.prototype.updateSpawner = function () {
    console.log(this.game.enemies.numMembers);
    if (this.spawnComplete && this.game.enemies.numMembers == 0) {
        this.spawnComplete = false;
        this.m_startWaveCountdown();
    }

    if (!this.spawnComplete) {
        this.m_callSpawner();
    }
};

panicCity.managers.WaveManager.prototype.m_startWaveCountdown = function () {
    console.log("Started Countdown");
    this.game.timers.create({
        duration: 8000,
        onComplete: function () {
            this.m_startnewWave();
        }.bind(this)
    });
};

panicCity.managers.WaveManager.prototype.m_startnewWave = function () {
    this.waveAmount += 5;
    this.currentWave++;
    this.currentZombies = 0;

    // if (this.currentWave == 1) {
    //     this.zombieSpawner.spawnZombieBoss();
    //     this.currentZombies++;
    //     this.spawnComplete = true;
    // }

    this.text.text = "Wave: " + this.currentWave;
    this.text.x = this.game.application.screen.width - this.text.width - 5;
    this.text.y = 15;
};

panicCity.managers.WaveManager.prototype.m_callSpawner = function () {
    if (!this.coldDown && (this.waveAmount > this.currentZombies)) {
        this.coldDown = true;
        this.game.timers.create({
            duration: 800,
            onComplete: function () {
                this.zombieSpawner.spawnZombie();
                this.currentZombies++;
                this.coldDown = false;
                if (this.currentZombies >= this.waveAmount) {
                    this.spawnComplete = true;
                }
            }.bind(this)
        });
    }
};