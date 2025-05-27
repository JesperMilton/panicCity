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
     * @private
     */
    this.m_cameras = cameras;

    /**
     * Keeps track of the current wave.
     * 
     * @type {number}
     * @private
     */
    this.m_currentWave = 0;

    /**
     * The amount enemies to be spawned during current wave.
     * 
     * @type {number}
     * @private
     */
    this.m_waveAmount = 5;

    /**
     * Keeps track of the current zombies in the wave.
     * 
     * @type {number}
     * @private
     */
    this.m_currentZombies = 0;

    /**
     * Flag to control that the spawn is completed for a wave.
     * 
     * @type {boolean}
     * @private
     */
    this.m_spawnComplete = false;

    /**
     * Used for the timestamp, which controls when zombies are spawned.
     * 
     * @type {number}
     * @private
     */
    this.m_lastSpawned = 0;

    /**
     * The cooldown of the m_callSpawner.
     * 
     * @type {number}
     * @private
     */
    this.m_spawnCooldown = 500;

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
     * @private
     */
    this.m_currentWaveText = new rune.text.BitmapField("text", "Font");

    /**
     * Use for the size of the text.
     * 
     * @type {boolean}
     * @private
     */
    this.m_currentWaveText.autoSize = true;

    /**
     * Text to represent the current wave.
     * 
     * @type {rune.text.BitmapField}
     * @public
     */
    this.m_textAnnouncement = new rune.text.BitmapField("text", "Font");

    /**
     * Use for the size of the text.
     * 
     * @type {boolean}
     * @public
     */
    this.m_textAnnouncement.autoSize = true;

    this.m_textAnnouncement.alpha = 0;

    this.m_cameras.getCameraAt(0).addChild(this.m_textAnnouncement);

    /**
     * Sound file for when new wave is initiated
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_newWaveSound = this.game.application.sounds.sound.get("New-wave-sound");


    this.m_cameras.getCameraAt(0).addChild(this.m_currentWaveText);

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
    if (this.m_spawnComplete && this.game.enemies.numMembers == 0) {
        this.m_spawnComplete = false;
        this.m_startWaveCountdown();
    }

    if (!this.m_spawnComplete) {
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
    this.waveTimer = this.game.timers.create({
        duration: 2500,
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
    this.m_newWaveSound.play();
    this.m_waveAmount += 4;
    this.m_currentWave++;
    this.m_currentZombies = 0;

    if (this.m_currentWave % 3 == 0) {
        var zombieBoss = this.zombieSpawner.spawnZombieBoss();
        console.log(zombieBoss);
        this.m_currentZombies++;
        for (var i = 0; i < 10; i++) {
            this.zombieSpawner.spawnZombie();
            this.m_currentZombies++;
        }
        this.m_spawnComplete = true;
    }

    // For testing of ZombieBoss
    // if (this.m_currentWave == 1) {
    //     this.zombieSpawner.spawnZombieBoss();
    //     this.m_currentZombies++;
    //     this.m_spawnComplete = true;
    // }

    if (this.m_currentWave !== 1) {
        if (this.m_currentWave % 3 === 0) {
            this.m_waveAnnouncement("BOSS WAVE!");
        } else {
            this.m_waveAnnouncement("ZOMBIES INCOMING!");
        }
    }

    this.m_currentWaveText.text = "WAVE:" + this.m_currentWave;
    this.m_currentWaveText.centerX = this.game.application.screen.centerX;
    this.m_currentWaveText.y = 7;
};

/**
 * Spawns the number of zombies based on this.m_waveAmount.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.WaveManager.prototype.m_callSpawner = function () {
    if ((this.m_waveAmount > this.m_currentZombies) && this.m_currentWave % 3 != 0) {
        var now = Date.now();
        if (now > this.m_lastSpawned) {
            this.zombieSpawner.spawnZombie();
            this.m_currentZombies++;
            if (this.m_currentZombies >= this.m_waveAmount) {
                this.m_spawnComplete = true;
            }
            this.m_lastSpawned = now + this.m_spawnCooldown;
        }
    }
};

/**
 * Announcement for when a new wave starts.
 * 
 * @param {string} announcementText The text being dsiplayed on every new wave.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.managers.WaveManager.prototype.m_waveAnnouncement = function (announcementText) {
    this.m_textAnnouncement.text = announcementText;
    this.m_textAnnouncement.center = this.game.application.screen.center;
    this.m_textAnnouncement.alpha = 0;

    this.game.timers.create({
        duration: 1800,
        onUpdate: function () {
            this.m_textAnnouncement.alpha += 0.03;
            if (this.m_textAnnouncement.alpha > 1.0) {
                this.m_textAnnouncement.alpha = 1.0;
            }

        }.bind(this),
        onComplete: function () {
            this.m_textAnnouncement.alpha = 0;
        }.bind(this)
    });
};