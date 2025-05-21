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
 * @param {string} upKey - Control for up
 * @param {string} downKey - Control for down
 * @param {string} leftKey - Control for left
 * @param {string} rightKey - Control for right
 * @param {string} shootKey - Control for shooting
 * @param {string} resKey - Control for reviving
 * 
 * Class for creating "Hibba"-character, includes methods for basic movement and basic functions such as heal and downed
 */
 panicCity.entity.Player = function (x, y, width, height, texture, game, gamepadIndex, upKey, downKey, leftKey, rightKey, shootKey, resKey) {

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

    /**
    * Flag for checking if full auto is enabled
    * 
    * @type {boolean}
    * @public
    */
    this.fullAuto = false;

    /**
     * The Players gamepad-Index which is used for controlling a gamepad.
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

    /**
     * Control for upward movement
     * 
     * @type {string}
     * @public
     */
    this.upKey = upKey;

    /**
     * Control for downward movement
     * 
     * @type {string}
     * @public
     */
    this.downKey = downKey;

    /**
     * Control for left movement
     * 
     * @type {string}
     * @public
     */
    this.leftKey = leftKey;

    /**
     * Control for right movement
     * 
     * @type {string}
     * @public
     */
    this.rightKey = rightKey;

    /**
     * Control for shooting
     * 
     * @type {string}
     * @public
     */
    this.shootKey = shootKey;

    /**
     * Control for reviving
     * 
     * @type {string}
     * @public
     */
    this.resKey = resKey;

    /**
     * Sound file for when player gets downed
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_helpSound;

    /**
     * Sound file for when player gets hit
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_damageSound;

    /**
     * Sound file for when player shoots normal gun
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_shootSound;

    /**
     * Sound file for when player shoots shotgun
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_shotgunSound;

    /**
     * Sound file for when player shoots minigun
     * 
     * @type {rune.media.Sound}
     * @private
     */
    this.m_minigunSound;

    /**
     * Hitbox for the player
     * 
     * @type {Object}
     * @public
     */
    this.hitbox.set(5, 6, 14, 17);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Player.prototype = Object.create(panicCity.entity.Entity.prototype);
panicCity.entity.Player.prototype.constructor = panicCity.entity.Player;

/**
 * @inheritDoc
 */
panicCity.entity.Player.prototype.init = function () {
    this.m_helpSound = this.application.sounds.sound.get("Help-sound");
    this.m_damageSound = this.application.sounds.sound.get("Zombie-attack-sound");
    this.m_shootSound = this.application.sounds.sound.get("Shoot-sound");
    this.m_shotgunSound = this.application.sounds.sound.get("Shotgun-sound");
    this.m_minigunSound = this.application.sounds.sound.get("Minigun-sound");

    this.m_shootSound.volume = 0.4;

    this.m_initAnimations();
    this.m_initHealthBar();
};

/**
 * @inheritDoc
 */
panicCity.entity.Player.prototype.update = function (step) {
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
panicCity.entity.Player.prototype.m_updateInput = function () {
    if (this.isDowned) {
        return;
    }

    this.gamepad = this.game.gamepads.get(this.gamepadIndex);

    if (!this.gamepad.pressed(7)) {
        if (this.keyboard.pressed(this.upKey) || this.gamepad.stickLeftUp) {
            this.direction = "UP";
            this.moveUp();
            this.animation.gotoAndPlay("walkUp");
        }

        if (this.keyboard.pressed(this.downKey) || this.gamepad.stickLeftDown) {
            this.direction = "DOWN";
            this.moveDown();
            this.animation.gotoAndPlay("walkDown");
        }

        if (this.keyboard.pressed(this.rightKey) || this.gamepad.stickLeftRight) {
            this.direction = "RIGHT";
            this.moveRight();
            this.animation.gotoAndPlay("walkSide");
        }

        if (this.keyboard.pressed(this.leftKey) || this.gamepad.stickLeftLeft) {
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

    if (this.gamepad.stickLeftUp) {
        this.direction = "UP";
    }

    if (this.gamepad.stickLeftDown) {
        this.direction = "DOWN";
    }

    if (this.gamepad.stickLeftRight) {
        this.direction = "RIGHT";
    }

    if (this.gamepad.stickLeftLeft) {
        this.direction = "LEFT";
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
    if (this.fullAuto) {
        if (this.keyboard.pressed(this.shootKey) || this.gamepad.pressed(2)) {
            this.m_minigunSound.play();
            var bullet = new panicCity.entity.Bullet(this);
            bullet.damage = 2;
            this.game.bullets.addMember(bullet);
        }
    }
    else if (this.shotgun) {
        if (this.keyboard.justPressed(this.shootKey) || this.gamepad.justPressed(2)) {
            this.m_shotgunSound.play(true);
            var shells = new panicCity.entity.Shell(this, this.game);
        }
    }
    else {
        if (this.keyboard.justPressed(this.shootKey) || this.gamepad.justPressed(2)) {
            this.m_shootSound.play(true);
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
panicCity.entity.Player.prototype.m_initAnimations = function () {
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
panicCity.entity.Player.prototype.m_initHealthBar = function () {
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
panicCity.entity.Player.prototype.m_updateHealthbar = function () {
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
panicCity.entity.Player.prototype.takeDamage = function (damage) {
    if (this.isDowned) {
        return;
    }
    if (this.invincible) {
        return;
    }
    this.m_damageSound.play();
    this.health -= damage;
    this.initFlicker(250, 64);
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
panicCity.entity.Player.prototype.heal = function (health) {
    if (this.health > 0 && this.health < 200) {
        this.health += health;
        this.healthBar.progress = (this.health / 200);
    }
    if (this.health > 200) {
        this.health = 200;
        this.healthBar.progress = (this.health / 200);
    }
}

/**
 * Puts the player in a downed state.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Player.prototype.m_downed = function () {
    this.animation.gotoAndPlay("downed");
    this.m_helpSound.play();
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
panicCity.entity.Player.prototype.pickupNPC = function (human, base) {
    if (this.keyboard.justPressed(this.resKey) || this.gamepad.justPressed(0)) {
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
panicCity.entity.Player.prototype.res = function (player) {
    if (this.keyboard.justPressed(this.resKey) || this.gamepad.justPressed(0)) {
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
panicCity.entity.Player.prototype.getRessed = function () {
    this.animation.gotoAndPlay("idle");
    if (!this.isDowned) {
        return;
    }
    this.isDowned = false;
    this.rotation = 0;
    this.health += 100;
}

/**
 * Changes the color of the healthbar
 * 
 * @param {string} color - the color to be changed to
 * 
 * @return {undefined}
 * @public
 */
panicCity.entity.Player.prototype.changeHealthColor = function (color) {
    if(this.health <= 1){
        this.health++;
        this.healthBar.progress = (this.health / 200);
        this.healthBar.forgroundColor = color;
        this.health--;
        this.healthBar.progress = (this.health / 200);
    }
    else{
        this.health--;
        this.healthBar.progress = (this.health / 200);
        this.healthBar.forgroundColor = color;
        this.health++;
        this.healthBar.progress = (this.health / 200);
    }
}

/**
 * Starts a flicker effect
 * 
 * @param {int} time - Total amount of time the flicker should be active for
 * @param {int} amount - The frequency of the flicker
 * 
 * @return {undefined}
 * @public
 */
panicCity.entity.Player.prototype.initFlicker = function(time, amount){
    this.flicker.start(time, amount);
}