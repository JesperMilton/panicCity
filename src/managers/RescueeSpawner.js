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
panicCity.managers.RescueeSpawner = function (game) {

    /**
     * The Game object.
     * 
     * @type (Object)
     * @public
     */
    this.game = game;

    /**
     * Array for the different spawnpoints for the humans.
     * 
     * @type (Array)
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
    var result = rune.util.Math.chance(50);
    return result;
}