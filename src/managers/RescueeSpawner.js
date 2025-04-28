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
 * ...
 */
panicCity.managers.RescueeSpawner = function (game) {
    this.percentage = 0;
    this.spawnPoints = [{ x: -50, y: 150 }, { x: 75, y: 240 }, { x: 450, y: 150 }, { x: 350, y: 240 }];
    this.game = game;
};

panicCity.managers.RescueeSpawner.prototype.spawnRescuee = function () {
    var ran = Math.floor(Math.random() * 4);
    if (this.game.humans.numMembers == 0) {
        console.log("gggggg")
        if (this.m_randomChance(this.percentage)) {
            console.log("spawned!!")
            var human = new panicCity.entity.Human(this.spawnPoints[ran].x, this.spawnPoints[ran].y, this.game);
            human.target = this.game.baseSta;
            this.game.humans.addMember(human);
            this.percentage = 0;
        }
        else {
            this.percentage++;
        }
    }
};

panicCity.managers.RescueeSpawner.prototype.m_randomChance = function (percentage) {
    var result = rune.util.Math.chance(percentage);
    return result;
}