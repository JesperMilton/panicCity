//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the RescueeSpawner class.
 *
 * @constructor
 *
 * @class
 * 
 * @param {rune.scene.Scene} game - The Game object
 * 
 * Handles the spawning of humans to be rescued.
 */
panicCity.managers.RescueeSpawner = function (game) {

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
panicCity.managers.RescueeSpawner.prototype.spawnRescuee = function () {
    var ran = Math.floor(Math.random() * 4);
    if (this.game.humans.numMembers == 0) {
        if (this.m_randomChance(this.percentage)) {
            var human = new panicCity.entity.Human(this.spawnPoints[ran].x, this.spawnPoints[ran].y, this.game);
            human.target = this.game.baseSta;
            this.game.humans.addMember(human);
        }
    }
};

/**
 * Returns a true with a 50% chance.
 *
 * @return {boolean}
 * @private
 * 
 */
panicCity.managers.RescueeSpawner.prototype.m_randomChance = function () {
    var result = rune.util.Math.chance(100);
    return result;
}