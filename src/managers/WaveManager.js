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
 * @param {object} cameras - The Cameras object
 * 
 * ...
 */
panicCity.managers.WaveManager = function (game, cameras) {
    this.game = game;
    this.currentWave = 0;
    this.waveAmount = 5;
    this.currentZombies = 0;
    this.coldDown = false;
    this.spawnComplete = false;
    this.m_cameras = cameras;

    this.zombieSpawner = new panicCity.managers.ZombieSpawner(this.game);

    this.text = new rune.text.BitmapField();
    this.text.autoSize = true;
    this.m_cameras.getCameraAt(1).addChild(this.text);

    this.m_startnewWave();
};

panicCity.managers.WaveManager.prototype.updateSpawner = function () {
    if (this.spawnComplete && this.game.enemies.numMembers == 0) {
        this.spawnComplete = false;
        this.m_startWaveCountdown();
    }

    if (!this.spawnComplete) {
        this.m_callSpawner();
    }
};

/**
 * Starts the cooldown between waves.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.WaveManager.prototype.m_startWaveCountdown = function () {
    this.game.timers.create({
        duration: 5000,
        onComplete: function () {
            this.m_startnewWave();
        }.bind(this)
    });
};

/**
 * Starts a new wave, with new values.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.WaveManager.prototype.m_startnewWave = function () {
    this.waveAmount += 5;
    this.currentWave++;
    this.currentZombies = 0;

    if (this.currentWave % 3 == 0) {
        this.zombieSpawner.spawnZombieBoss();
        this.currentZombies++;
        for (var i = 0; i < 10; i++) {
            this.zombieSpawner.spawnZombie();
            this.currentZombies++; 
        }
        this.spawnComplete = true;
    }

    // if (this.currentWave == 1) {
    //     this.zombieSpawner.spawnZombieBoss();
    //     this.currentZombies++;
    //     this.spawnComplete = true;
    // }

    this.text.text = "Wave: " + this.currentWave;
    this.text.x = this.game.application.screen.width - this.text.width - 5;
    this.text.y = 15;
};

/**
 * Spawns the number of zombies based on this.waveAmount.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.WaveManager.prototype.m_callSpawner = function () {
    if (!this.coldDown && (this.waveAmount > this.currentZombies) && this.currentWave % 3 != 0) {
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