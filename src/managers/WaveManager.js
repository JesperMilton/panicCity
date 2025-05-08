//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the WaveManager class.
 *
 * @constructor
 *
 * @class
 * 
 * @param {rune.scene.Scene} game - The Game object
 * @param {rune.camera.Camera} cameras - The Cameras object
 * 
 * Handles the waves of the Game.
 */
panicCity.managers.WaveManager = function (game, cameras) {

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * The Cameras object.
     * 
     * @type {rune.camera.Camera}
     * @public
     */
    this.m_cameras = cameras;

    /**
     * Keeps track of the current wave.
     * 
     * @type {number}
     * @public
     */
    this.currentWave = 0;

    /**
     * The amount enemies to be spawned during current wave.
     * 
     * @type {number}
     * @public
     */
    this.waveAmount = 5;

    /**
     * Keeps track of the current zombies in the wave.
     * 
     * @type {number}
     * @public
     */
    this.currentZombies = 0;

    /**
     * Flag to control that the spawn is completed for a wave.
     * 
     * @type {boolean}
     * @public
     */
    this.spawnComplete = false;

    /**
     * Flag to control the enemy spawner.
     * 
     * @type {boolean}
     * @public
     */
    this.coolDown = false;

    /**
     * The ZombieSpawner object.
     * 
     * @type {panicCity.managers.ZombieSpawner}
     * @public
     */
    this.zombieSpawner = new panicCity.managers.ZombieSpawner(this.game);

    /**
     * Text to represent the current wave.
     * 
     * @type {rune.text.BitmapField}
     * @public
     */
    this.text = new rune.text.BitmapField();

    /**
     * Use for the size of the text.
     * 
     * @type {boolean}
     * @public
     */
    this.text.autoSize = true;


    this.m_cameras.getCameraAt(1).addChild(this.text);
    this.m_startnewWave();
};

/**
 * An update loop. Used for calling the methods.
 *
 * @return {undefined}
 * @public
 * 
 */
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
    this.waveAmount += 4;
    this.currentWave++;
    this.currentZombies = 0;

    if (this.currentWave % 3 == 0) {
        this.zombieSpawner.spawnZombieBoss();
        this.currentZombies++;
        for (var i = 0; i < 5; i++) {
            this.zombieSpawner.spawnZombie();
            this.currentZombies++; 
        }
        this.spawnComplete = true;
    }

    // For testing of ZombieBoss
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
    if (!this.coolDown && (this.waveAmount > this.currentZombies) && this.currentWave % 3 != 0) {
        this.coolDown = true;
        this.game.timers.create({
            duration: 500,
            onComplete: function () {
                this.zombieSpawner.spawnZombie();
                this.currentZombies++;
                this.coolDown = false;
                if (this.currentZombies >= this.waveAmount) {
                    this.spawnComplete = true;
                }
            }.bind(this)
        });
    }
};