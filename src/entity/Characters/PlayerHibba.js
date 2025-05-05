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

    /**
     * The Game object.
     * 
     * @type (Object)
     * @public
     */
    this.game = game;

    /**
     * The default direction of the player.
     * 
     * @type (String)
     * @public
     */
    this.direction = "UP";

    /**
     * Tha Players gamepad-Index which is used for controlling a gamepad.
     * 
     * @type (number)
     * @public
     */
    this.gamepadIndex = gamepadIndex;

    /**
     * Total amount health for the Player.
     * 
     * @type (number)
     * @public
     */
    this.health = 100;

    /**
     * Total amount of mass the Player has.
     * 
     * @type (number)
     * @public
     */
    this.mass = 20;

    /**
     * Flag to control if the Player is downed or not.
     * 
     * @type (boolean)
     * @public
     */
    this.isDowned = false;
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

/**
 * Method to initialize the players functions.
 *
 * @return {undefined}
 * 
 */
panicCity.entity.PlayerHibba.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    this.m_updateInput(step);
    this.m_updateHealthbar();
};

panicCity.entity.PlayerHibba.prototype.m_updateInput = function (step) {
    if (this.isDowned) {
        return;
    }

    this.gamepad = this.game.gamepads.get(this.gamepadIndex);

    if (this.gamepad.justPressed(7)) {
        console.log("stopped");
    }

    if (!this.gamepad.pressed(7)) {
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
    this.animation.create("idle", [0, 1, 2], 6, true);
    this.animation.create("walkSide", [3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    this.animation.create("walkUp", [12, 13, 14, 15, 16], 5, true);
    this.animation.create("walkDown", [17, 18, 19, 20, 21], 8, true);
    this.animation.create("downed", [22, 23], 2, true);
};

/**
 * Method to initialize the healthbar.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.PlayerHibba.prototype.m_initHealthBar = function () {
    this.healthBar = new rune.ui.Progressbar(this.width, 2, "gray", "red");
    this.game.stage.addChild(this.healthBar);
}

panicCity.entity.PlayerHibba.prototype.m_updateHealthbar = function () {
    this.healthBar.progress = (this.health / 100);
    this.healthBar.x = this.x;
    this.healthBar.y = this.y - 2;
}

panicCity.entity.PlayerHibba.prototype.takeDamage = function (damage) {
    if (this.isDowned) {
        return;
    }
    this.flicker.start(250);
    this.health -= damage;
    if (this.health <= 0) {
        this.m_die();
    }
}
panicCity.entity.PlayerHibba.prototype.heal = function (health) {
    if (this.health > 0 && this.health < 100) {
        this.health += health;
    }
    if (this.health > 100) {
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
    this.isDowned = true;
    this.animation.gotoAndPlay("downed");
    this.health = 0;

    // this.game.players.removeMember(this, true);
    // this.game.cameras.getCameraAt(1).removeChild(this.healthBar, true);
    // this.game.stage.removeChild(this.healthBar);

}

panicCity.entity.PlayerHibba.prototype.pickupNPC = function (human, base) {
    if (this.keyboard.justPressed("E") || this.gamepad.justPressed(0)) {
        human.getSaved(base);
    }
}

panicCity.entity.PlayerHibba.prototype.res = function (player) {
    if (this.keyboard.justPressed("R") || this.gamepad.justPressed(0)) {
        player.getRessed();
    }
}

panicCity.entity.PlayerHibba.prototype.getRessed = function () {
    if (!this.isDowned) {
        return;
    }
    this.isDowned = false;
    this.rotation = 0;
    this.health = 100;
}