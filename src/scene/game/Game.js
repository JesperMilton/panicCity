/**
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 * The Game Object, responsible for showing the game stage 
 */
panicCity.scene.Game = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    rune.scene.Scene.call(this);

    /**
     * The total amount of score that has been collected
     * @public
     * @type {number}
     */
    this.score = 0;

    /**
     * Timer for score, used to call a method that gives points every 4 seconds
     * @public
     * @type {number}
     */
    this.scoreTime = 4000;

    /**
     * Timer for rescuees, used to call a method that spawns a NPC every 10 seconds
     * @public
     * @type {number}
     */
    this.rescueeTime = 10000;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Game.prototype.constructor = panicCity.scene.Game;

/**
 * @inheritDoc
 */
panicCity.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.m_initBackground();
    this.m_initCamera();
    this.m_initScore();

    this.players = this.groups.create(this.stage);
    this.enemies = this.groups.create(this.stage);
    this.bullets = this.groups.create(this.stage);
    this.baseSta = this.groups.create(this.stage);
    this.projectiles  = this.groups.create(this.stage);
    this.items = this.groups.create(this.stage);
    this.walls = this.groups.create(this.stage);
    this.humans = this.groups.create(this.stage);
    this.powerups = this.groups.create(this.stage);

    this.playerJesper = new panicCity.entity.PlayerJesper(320, 128, 27, 26, "Player1-Sheet", this, 0);
    this.playerHibba = new panicCity.entity.PlayerHibba(140, 128, 27, 26, "Player2-Sheet", this, 1);
    this.base = new panicCity.entity.Base(220, 128, 45, 45, "image_Base", this);

    this.testPower = new panicCity.entity.FullAuto(140, 140, 20, 20, "Human-Shield", this);

    this.cameras.getCameraAt(1).targets.add(this.playerJesper);
    this.cameras.getCameraAt(1).targets.add(this.playerHibba);

    this.players.addMember(this.playerJesper);
    this.players.addMember(this.playerHibba);
    this.baseSta.addMember(this.base);

    this.powerups.addMember(this.testPower);

    this.collisionControl = new panicCity.managers.CollisionManager(this);
    this.waveManager = new panicCity.managers.WaveManager(this, this.cameras);
    this.rescueeSpawner = new panicCity.managers.RescueeSpawner(this);

    this.timers.create({
        duration: this.scoreTime,
        onComplete: function () {
            this.m_addScore();
        },
    });

    this.timers.create({
        duration: this.rescueeTime,
        onComplete: function () {
            this.spawnHuman();
        },
    });
};

/**
 * @inheritDoc
 */
panicCity.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.collisionControl.update();
    this.waveManager.updateSpawner();

    if (this.playerJesper.isDowned && this.playerHibba.isDowned) {
        this.timers.create({
            duration: 4000,
            onComplete: function () {
                this.application.scenes.load([new panicCity.scene.Gameover(this)]);
            },
        });
    }
};

/**
 * @inheritDoc
 */
panicCity.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * Initializes score
 * @private
 * @returns {undefined}
 */
panicCity.scene.Game.prototype.m_initScore = function () {
    this.counter = new rune.ui.Counter(6, 10, 20);
    this.counter.spacing = 10;
    this.counter.y = 2;
    this.counter.x = this.application.screen.width - this.counter.width;
    this.counter.value = this.score;

    this.cameras.getCameraAt(1).addChild(this.counter);
}

/**
 * Initializes the camera
 * @private
 * @returns {undefined}
 */
panicCity.scene.Game.prototype.m_initCamera = function () {
    this.m_camera = this.cameras.addCamera(this.cameras.createCamera());
    this.m_camera.bounderies = new rune.geom.Rectangle(
        0,
        0,
        475,
        300
    );
};

/**
 * Initializes the background
 * @private
 * @returns {undefined}
 */
panicCity.scene.Game.prototype.m_initBackground = function () {
    this.m_background = new rune.display.Graphic(
        0,
        0,
        475,
        300,
        "backgroundPlaceholder"
    );
    this.stage.addChild(this.m_background);
};

/**
 * Updates the score
 * 
 * @param {number} points The amount of points to be added to the score.
 * 
 * @public
 * @returns {undefined}
 */
panicCity.scene.Game.prototype.updateScoretext = function (points) {
    this.score += points;
    this.counter.value = this.score;
}

/**
 * Adds points to the score
 * @private
 * @returns {undefined}
 */
panicCity.scene.Game.prototype.m_addScore = function () {
    this.updateScoretext(1);
    this.timers.create({
        duration: this.scoreTime,
        onComplete: function () {
            this.m_addScore();
        },
    });
}

/**
 * Spawns a human
 * @private
 * @returns {undefined}
 */
panicCity.scene.Game.prototype.spawnHuman = function (){
    this.rescueeSpawner.spawnRescuee();
    this.timers.create({
        duration: this.rescueeTime,
        onComplete: function () {
            this.spawnHuman();
        },
    });
}