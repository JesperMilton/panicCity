//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends panicCity.entity.Entity
 *
 * @class
 * @classdesc
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {object} game - The Game object
 * @param {number} gamepadIndex - GamepadIndex
 * 
 * ...
 */
panicCity.entity.PlayerHibba = function (x, y, width, height, texture, game, gamepadIndex) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Entity.call(this, x, y, width, height, texture);
    this.game = game;
    this.direction = "UP";
    this.gamepadIndex = gamepadIndex;
    this.health = 100;
    this.mass = 20;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.PlayerHibba.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.PlayerHibba.prototype.constructor = panicCity.entity.PlayerHibba;

panicCity.entity.PlayerHibba.prototype.init = function () {
    this.m_initAnimations();
    this.m_initHealthBar();
};


panicCity.entity.PlayerHibba.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateInput(step);
    this.m_updateHealthbar();
};

panicCity.entity.PlayerHibba.prototype.m_updateInput = function (step) {
    this.gamepad = this.game.gamepads.get(this.gamepadIndex);
    
    if (this.keyboard.pressed("W") || this.gamepad.stickLeftUp) {
        this.direction = "UP";
        this.moveUp();
        this.animation.gotoAndPlay("walkUp");
    }
    
    if (this.keyboard.pressed("S") || this.gamepad.stickLeftDown) {
        this.direction = "DOWN";
        this.moveDown();
        this.animation.gotoAndPlay("walkDown");
    }
    
    if (this.keyboard.pressed("D") || this.gamepad.stickLeftRight) {
        this.direction = "RIGHT";
        this.moveRight();
        this.animation.gotoAndPlay("walkSide");
    }
    
    if (this.keyboard.pressed("A") || this.gamepad.stickLeftLeft) {
        this.direction = "LEFT";
        this.moveLeft();
        this.animation.gotoAndPlay("walkSide");
    }
    
    if (this.keyboard.justPressed("Q") || this.gamepad.justPressed(2)) {
        var bullet = new panicCity.entity.Bullet(this);
        this.game.bullets.addMember(bullet);
    }
};

/**
 * Method to initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerHibba.prototype.m_initAnimations = function (step) {
    this.animation.create("walkUp", [12, 13, 14, 15, 16], 5, true);
    this.animation.create("walkDown", [17, 18, 19, 20, 21], 8, true);
    this.animation.create("walkSide", [3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    this.animation.create("idle", [0, 1, 2]  , 6, true);
};

/**
 * Method to initialize the healthbar.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerHibba.prototype.m_initHealthBar = function() {
    this.healthBar = new rune.ui.Progressbar(this.width, 2, "gray", "red");
    this.game.stage.addChild(this.healthBar);
}

panicCity.entity.PlayerHibba.prototype.m_updateHealthbar = function() {
    this.healthBar.progress = (this.health / 100);
    this.healthBar.x = this.x;
    this.healthBar.y = this.y - 2;
}

panicCity.entity.PlayerHibba.prototype.takeDamage = function (damage) {
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
}
panicCity.entity.PlayerHibba.prototype.heal = function (health){
    if(this.health > 0 && this.health < 100){
        this.health += health;
    }
    if(this.health > 100){
        this.health = 100;
    }
}

/**
 * Method to dispose of the PlayerHibba and its Timers.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerHibba.prototype.m_die = function () {
    this.game.players.removeMember(this, true);
    this.game.cameras.getCameraAt(1).removeChild(this.healthBar, true);
}