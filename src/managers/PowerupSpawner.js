//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the PowerupSpawner class.
 *
 * @constructor
 *
 * @class
 * 
 * @param {rune.scene.Scene} game - The Game object
 * 
 * Handles the spawning of humans to be rescued.
 */
panicCity.managers.PowerupSpawner = function (game) {

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * Array for the different spawnpoints for the humans.
     * 
     * @type {{x: number, y: number}[]}
     * @public
     */
    this.spawnPoints = [{ x: -50, y: 150 }, { x: 75, y: 240 }, { x: 450, y: 150 }, { x: 350, y: 240 }];

    /**
     * Precentage of a recuee spawn.
     * 
     * @type (number)
     * @public
     */
    this.percentage = 0;

};

/**
 * Spawns the Human to be rescued.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.managers.PowerupSpawner.prototype.spawn = function () {
    var ranX = Math.floor(Math.random() * 350) + 50;
    var ranY = Math.floor(Math.random() * 250) + 50;
    var powerup;
    if (this.m_randomChance(20)) {
        powerup = new panicCity.entity.Shotgun(ranX, ranY, 20, 20, "Shotgun", this.game);
    }
    else if (this.m_randomChance(40)) {
        powerup = new panicCity.entity.FullAuto(ranX, ranY, 20, 20, "Full-Auto", this.game);
    }
    else if (this.m_randomChance(60)) {
        powerup = new panicCity.entity.InvincibilityBase(ranX, ranY, 20, 20, "Base-Shield", this.game);
    }
    else {
        powerup = new panicCity.entity.InvincibilityPlayer(ranX, ranY, 20, 20, "Human-Shield", this.game);
    }

    this.game.powerups.addMember(powerup);
};

/**
 * Returns a true with a 50% chance.
 *
 * @return {boolean}
 * @private
 * 
 */
panicCity.managers.PowerupSpawner.prototype.m_randomChance = function (percentage) {
    var result = rune.util.Math.chance(percentage);
    return result;
}