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
     * Array for the different spawnpoints for the powerups
     * 
     * @type {{x: number, y: number}[]}
     * @public
     */
    this.spawnPoints = [{ x: -50, y: 150 }, { x: 75, y: 240 }, { x: 450, y: 150 }, { x: 350, y: 240 }];
};

/**
 * Spawns a powerup
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.managers.PowerupSpawner.prototype.spawn = function () {
    var ranX = Math.floor(Math.random() * 350) + 50;
    var ranY = Math.floor(Math.random() * 250) + 50;

    var powerup;
    if (this.m_randomChance(10)) {
        powerup = new panicCity.entity.FullAuto(ranX, ranY, 19, 24, "Full-Auto-Sheet", this.game);
    }
    else if (this.m_randomChance(30)) {
        powerup = new panicCity.entity.Shotgun(ranX, ranY, 20, 25, "Shotgun-Sheet", this.game);
    }
    else if (this.m_randomChance(60) && this.game.base.invincible == false) {
        powerup = new panicCity.entity.InvincibilityBase(ranX, ranY, 19, 24, "Shield-Base-Sheet", this.game);
    }
    else {
        powerup = new panicCity.entity.InvincibilityPlayer(ranX, ranY, 19, 24, "Shield-Players-Sheet", this.game);
    }

    if (this.m_checkCollBase(ranX, ranY, powerup)) {
        return;
    };

    //220 + 267 x
    //128 + 175 y
    //Change

    this.game.powerups.addMember(powerup);
};

/**
 * Returns a true based on the percentage.
 * 
 * @param {number} percentage The chance percentage.
 *
 * @return {boolean}
 * @private
 * 
 */
panicCity.managers.PowerupSpawner.prototype.m_randomChance = function (percentage) {
    var result = rune.util.Math.chance(percentage);
    return result;
}

/**
 * Returns a true based on the percentage.
 *
 * @return {boolean}
 * @private
 * 
 */
panicCity.managers.PowerupSpawner.prototype.m_checkCollBase = function (ranX, ranY, powerup) {
    var baseLeft = this.game.base.x;
    var baseRight = this.game.base.x + this.game.base.width;
    var baseTop = this.game.base.y;
    var baseBottom = this.game.base.y + this.game.base.height;

    var powerupLeft = ranX;
    var powerupRight = ranX + powerup.width;
    var powerupTop = ranY;
    var powerupBottom = ranY + powerup.height;

    if (powerupRight > baseLeft && powerupLeft < baseRight && powerupBottom > baseTop && powerupTop < baseBottom) {
        return true;
    }else {
        return false;
    }
}