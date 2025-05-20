//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 *
 * @constructor
 * @extends panicCity.entity.Entity
 *
 * @class
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {rune.scene.Scene} game - The Game object
 * @param {number} gamepadIndex - GamepadIndex
 * 
* Class for creating "Jesper"-character, includes methods for basic movement and basic functions such as heal and downed
 */
panicCity.entity.PlayerJesper = function (x, y, width, height, texture, game, gamepadIndex) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    panicCity.entity.Entity.call(this, x, y, width, height, texture);

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * The default direction of the player.
     * 
     * @type {string}
     * @public
     */
    this.direction = "UP";

    /**
     * Flag for checking if player is invincible
     * 
     * @type {boolean}
     * @public
     */
    this.invincible = false;
    
    this.shotgun = false;


     /**
     * Flag for checking if full auto is enabled
     * 
     * @type {boolean}
     * @public
     */
      this.fullAuto = false;

    /**
     * Tha Players gamepad-Index which is used for controlling a gamepad.
     * 
     * @type {number}
     * @public
     */
    this.gamepadIndex = gamepadIndex;

    /**
     * Total amount health for the Player.
     * 
     * @type {number}
     * @public
     */
    this.health = 200;

    /**
     * Total amount of mass the Player has.
     * 
     * @type {number}
     * @public
     */
    this.mass = 20;

    /**
     * Flag to control if the Player is downed or not.
     * 
     * @type {boolean}
     * @public
     */
    this.isDowned = false;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.PlayerJesper.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.PlayerJesper.prototype.constructor = panicCity.entity.PlayerJesper;

/**
 * @inheritDoc
 */
panicCity.entity.PlayerJesper.prototype.init = function () {
    this.m_initAnimations();
    this.m_initHealthBar();
};

/**
 * @inheritDoc
 */
panicCity.entity.PlayerJesper.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateInput();
    this.m_updateHealthbar();
};

/**
 * Updates the players inputs.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerJesper.prototype.m_updateInput = function () {
    if (this.isDowned) {
        return;
    }

    this.gamepad = this.game.gamepads.get(this.gamepadIndex);

    if (!this.gamepad.pressed(7)){
        if (this.keyboard.pressed("UP") || this.gamepad.stickLeftUp) {
            this.direction = "UP";
            this.moveUp();
            this.animation.gotoAndPlay("walkUp");
        }
    
        if (this.keyboard.pressed("DOWN") || this.gamepad.stickLeftDown) {
            this.direction = "DOWN";
            this.moveDown();
            this.animation.gotoAndPlay("walkDown");
        }
    
        if (this.keyboard.pressed("RIGHT") || this.gamepad.stickLeftRight) {
            this.direction = "RIGHT";
            this.moveRight();
            this.animation.gotoAndPlay("walkSide");
        }
    
        if (this.keyboard.pressed("LEFT") || this.gamepad.stickLeftLeft) {
            this.direction = "LEFT";
            this.moveLeft();
            this.animation.gotoAndPlay("walkSide");
        }
    }else{
        if (this.gamepad.stickLeftUp) {
            this.direction = "UP";
            this.animation.gotoAndPlay("walkUp");
        }
    
        if (this.gamepad.stickLeftDown) {
            this.direction = "DOWN";
            this.animation.gotoAndPlay("walkDown");
        }
    
        if (this.gamepad.stickLeftRight) {
            this.direction = "RIGHT";
            this.animation.gotoAndPlay("walkSide");
            this.flippedX = true;
        }
    
        if (this.gamepad.stickLeftLeft) {
            this.direction = "LEFT";
            this.animation.gotoAndPlay("walkSide");
            this.flippedX = false;
        }
    }

    if (this.gamepad.stickLeftUp && this.gamepad.stickLeftRight) {
        this.direction = "UP-RIGHT";
    }

    if (this.gamepad.stickLeftUp && this.gamepad.stickLeftLeft) {
        this.direction = "UP-LEFT";
    }

    if (this.gamepad.stickLeftDown && this.gamepad.stickLeftRight) {
        this.direction = "DOWN-RIGHT";
    }

    if (this.gamepad.stickLeftDown && this.gamepad.stickLeftLeft) {
        this.direction = "DOWN-LEFT";
    }

    if(this.fullAuto){
        if (this.keyboard.pressed("P") || this.gamepad.pressed(2)) {
            var bullet = new panicCity.entity.Bullet(this);
            this.game.bullets.addMember(bullet);
        }
    }
    else if(this.shotgun){
        if (this.keyboard.justPressed("P") || this.gamepad.justPressed(2)) {
            var shells = new panicCity.entity.Shell(this, this.game);
        }
    }
    else{
        if (this.keyboard.justPressed("P") || this.gamepad.justPressed(2)) {
            var bullet = new panicCity.entity.Bullet(this);
            this.game.bullets.addMember(bullet);
        }
    }
};

/**
 * Initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerJesper.prototype.m_initAnimations = function () {
    this.animation.create("idle", [0, 1, 2], 6, true);
    this.animation.create("walkSide", [3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    this.animation.create("walkUp", [12, 13, 14, 15, 16], 5, true);
    this.animation.create("walkDown", [17, 18, 19, 20, 21], 8, true);
    this.animation.create("downed", [22, 23], 2, true);
};

/**
 * Initializes the players healthbar.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerJesper.prototype.m_initHealthBar = function () {
    this.healthBar = new rune.ui.Progressbar(this.width, 2, "gray", "#6fff2c");
    this.game.stage.addChild(this.healthBar);
}

/**
 * Updates the players healthbar.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerJesper.prototype.m_updateHealthbar = function () {
    this.healthBar.progress = (this.health / 200);
    this.healthBar.x = this.x;
    this.healthBar.y = this.y - 2;
}

/**
 * Damages the player.
 * 
 * @param {number} damage The amount to be damaged.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.PlayerJesper.prototype.takeDamage = function (damage) {
    if (this.isDowned) {
        return;
    }
    if (this.invincible){
        return;
    }
    this.health -= damage;
    this.flicker.start(250);
    this.gamepad.vibrate();
    if (this.health <= 0) {
        this.m_downed();
    }
}

/**
 * Heals the player.
 * 
 * @param {number} health The amount to be healed.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.PlayerJesper.prototype.heal = function (health) {
    if (this.health > 0 && this.health < 200) {
        this.health += health;
    }
    if (this.health > 200) {
        this.health = 200;
    }
}

/**
 * Puts the player in a downed state.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerJesper.prototype.m_downed = function () {
    this.animation.gotoAndPlay("downed");
    this.isDowned = true;
    this.health = 0;
}

/**
 * Rescue Human NPC:s.
 * 
 * @param {panicCity.entity.Human} human Instance of the class Human.
 * @param {panicCity.entity.Base} base Instance of the class Base.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.PlayerJesper.prototype.pickupNPC = function (human, base) {
    if (this.keyboard.justPressed("O") || this.gamepad.justPressed(0)) {
        human.getSaved(base);
    }
}

/**
 * Resurrect another player.
 * 
 * @param {panicCity.entity.Entity} player The player who will be resurrected.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.PlayerJesper.prototype.res = function (player) {
    if (this.keyboard.justPressed("I") || this.gamepad.justPressed(0)) {
        player.getRessed();
    }
}

/**
 * Resurrect this player, but giving back health and changing the animation.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.PlayerJesper.prototype.getRessed = function () {
    this.animation.gotoAndPlay("idle");
    if (!this.isDowned) {
        return;
    }
    this.isDowned = false;
    this.rotation = 0;
    this.health += 100;
}