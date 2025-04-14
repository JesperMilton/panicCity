panicCity.scene.Game = function() {

    this.zombie = null;
    this.points = 0;

    rune.scene.Scene.call(this);
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
    this.bullets = [];

    this.playerJesper = new panicCity.entity.PlayerJesper(250, 100, 27, 26, "Player1-Sheet", this);
    this.playerHibba = new panicCity.entity.PlayerHibba(100, 100, 27, 26, "Player2-Sheet", this);

    this.zombieSpawner = new panicCity.managers.ZombieSpawner(this);
    this.base = new panicCity.entity.Base(this.application.screen.center.x, this.application.screen.center.y, 60, 60, "image_BaseBigger");

    this.stage.addChild(this.playerJesper);
    this.stage.addChild(this.playerHibba);
    this.stage.addChild(this.base);
    this.timers.create({
        duration: 3000,
        onComplete: function () {
          this.m_addScore();
        },
      });    
};

panicCity.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);

    this.zombieSpawner.update();

    this.playerJesper.hitTestAndSeparate(this.playerHibba);
    this.playerJesper.hitTestAndSeparate(this.base);
    this.playerHibba.hitTestAndSeparate(this.base);
    console.log(this.points);
};

panicCity.scene.Game.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};

panicCity.scene.Game.prototype.m_initScore = function(){
    this.scoreText = new rune.text.BitmapField("Score:0");
    this.scoreText.autoSize = true;
    this.scoreText.x = this.application.screen.width - this.scoreText.width - 100;
    this.scoreText.y = 5;
    this.stage.addChild(this.scoreText);
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

panicCity.scene.Game.prototype.updateScoretext = function(){
    this.scoreText.text = "Score:" + this.points;
}

panicCity.scene.Game.prototype.m_checkBoundsBullet = function(){
    for (var i = 0; i < this.bullets.length; i++) {
        if(this.bullets[i].y < 0 || this.bullets[i].y > 225 || this.bullets[i].x < 0 || this.bullets[i].x > 400){
            this.stage.removeChild(this.bullets[i]);
            this.bullets.splice(i, 1);
            i--;
        }
    }
}

panicCity.scene.Game.prototype.m_addScore = function() {
    this.points += 10;
    this.updateScoretext();
    this.timers.create({
        duration: 3000,
        onComplete: function () {
          this.m_addScore();
        },
      });
}