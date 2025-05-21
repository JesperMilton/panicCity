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
    this.text = new rune.text.BitmapField("text", "Font");

    /**
     * Use for the size of the text.
     * 
     * @type {boolean}
     * @public
     */
    this.text.autoSize = true;

    /**
     * Text to represent the current wave.
     * 
     * @type {rune.text.BitmapField}
     * @public
     */
    this.textAnnouncement = new rune.text.BitmapField("text", "Font");

    /**
     * Use for the size of the text.
     * 
     * @type {boolean}
     * @public
     */
    this.textAnnouncement.autoSize = true;

    this.testlastShot = 0;
    this.testcoolDown = 500;

    this.m_cameras.getCameraAt(0).addChild(this.text);
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
    this.waveAmount += 4;
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

    // For testing of ZombieBoss
    // if (this.currentWave == 1) {
    //     this.zombieSpawner.spawnZombieBoss();
    //     this.currentZombies++;
    //     this.spawnComplete = true;
    // }

    if (this.currentWave !== 1) {
        if (this.currentWave % 3 === 0) {
            this.m_waveAnnouncement("BOSS WAVE!");
        } else {
            this.m_waveAnnouncement("NEW WAVE!");
        }
    }

    this.text.text = "WAVE:" + this.currentWave;
    this.text.centerX = this.game.application.screen.centerX;
    this.text.y = 7;
};

/**
 * Spawns the number of zombies based on this.waveAmount.
 *
 * @return {undefined}
 * @private
 * if (!this.coolDown && (this.waveAmount > this.currentZombies) && this.currentWave % 3 != 0)
 */
panicCity.managers.WaveManager.prototype.m_callSpawner = function () {
    if ((this.waveAmount > this.currentZombies) && this.currentWave % 3 != 0) {
        // this.coolDown = true;
        var now = Date.now();
        if (now > this.testlastShot) {
            this.zombieSpawner.spawnZombie();
            this.currentZombies++;
            // this.coolDown = false;
            if (this.currentZombies >= this.waveAmount) {
                this.spawnComplete = true;
            }
            this.testlastShot = now + this.testcoolDown;
        }
        // this.game.timers.create({
        //     duration: 500,
        //     onComplete: function () {
        //         this.zombieSpawner.spawnZombie();
        //         this.currentZombies++;
        //         this.coolDown = false;
        //         if (this.currentZombies >= this.waveAmount) {
        //             this.spawnComplete = true;
        //         }
        //     }.bind(this)
        // });
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
    this.textAnnouncement.text = announcementText;
    this.textAnnouncement.center = this.game.application.screen.center;

    this.textAnnouncement.alpha = 0;

    this.m_cameras.getCameraAt(0).addChild(this.textAnnouncement);

    this.game.timers.create({
        duration: 1800,
        onUpdate: function () {
            this.textAnnouncement.alpha += 0.03;
            if (this.textAnnouncement.alpha > 1.0) {
                this.textAnnouncement.alpha = 1.0;
            }

        }.bind(this),
        onComplete: function () {
            this.m_cameras.getCameraAt(0).removeChild(this.textAnnouncement);
        }.bind(this)
    });

};