panicCity.scene.Game = function() {
    rune.scene.Scene.call(this);

    this.zombie = null;
    this.score = 0;
    this.scoreTime = 4000;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Game.prototype.constructor = panicCity.scene.Game;

panicCity.scene.Game.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);

    this.m_initBackground();
    this.m_initScore();

    this.collisionControl = new panicCity.managers.CollisionManager(this);
    

    this.players = this.groups.create(this.stage);
    this.enemies = this.groups.create(this.stage);
    this.bullets = this.groups.create(this.stage);
    this.baseSta = this.groups.create(this.stage);


    this.playerJesper = new panicCity.entity.PlayerJesper(250, 100, 27, 26, "Player1-Sheet", this, 0);
    this.playerHibba = new panicCity.entity.PlayerHibba(100, 100, 27, 26, "Player2-Sheet", this, 1);
    this.zombieSpawner = new panicCity.managers.ZombieSpawner(this);
    this.base = new panicCity.entity.Base(this.application.screen.center.x, this.application.screen.center.y, 60, 60, "image_Base", this);


    this.players.addMember(this.playerJesper);
    this.players.addMember(this.playerHibba);
    this.baseSta.addMember(this.base);

    console.log("game this", this);

    this.timers.create({
        duration: this.scoreTime,
        onComplete: function () {
          this.m_addScore();
        },
      });
};

panicCity.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);

    this.zombieSpawner.update();
    this.collisionControl.update();
};

panicCity.scene.Game.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};

panicCity.scene.Game.prototype.m_initScore = function(){
    this.counter = new rune.ui.Counter(6, 10, 20);
    this.counter.spacing = 10;
    this.counter.y = 2;
    this.counter.x = this.application.screen.width - this.counter.width;
    this.counter.value = this.score;

    this.stage.addChild(this.counter);
}
panicCity.scene.Game.prototype.m_initBackground = function() {
    this.m_background = new rune.display.Graphic(
        0, 
        0, 
        400, 
        225, 
        "image_Background"
    );
    
    this.stage.addChild(this.m_background);
};

panicCity.scene.Game.prototype.updateScoretext = function(points){
    this.score += points;
    this.counter.value = this.score;
}

// panicCity.scene.Game.prototype.m_checkBoundsBullet = function(){
//     for (var i = 0; i < this.bullets.length; i++) {
//         if(this.bullets[i].y < 0 || this.bullets[i].y > 225 || this.bullets[i].x < 0 || this.bullets[i].x > 400){
//             this.stage.removeChild(this.bullets[i]);
//             this.bullets.splice(i, 1);
//             i--;
//         }
//     }
// }

panicCity.scene.Game.prototype.m_addScore = function() {
    this.updateScoretext(1);
    this.timers.create({
        duration: this.scoreTime,
        onComplete: function () {
          this.m_addScore();
        },
      });
}