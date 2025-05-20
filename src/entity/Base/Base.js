//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Base class.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} width - Width
 * @param {number} height - Height
 * @param {string} texture - texture resource
 * @param {rune.scene.Scene} game - The Game object
 * 
 * Class for the base, includes methods such as heal, die and healthbar
 */
panicCity.entity.Base = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Sprite.call(this, x, y, width, height, texture);

    /**
     * The Game object.
     * 
     * @type {rune.scene.Scene}
     * @public
     */
    this.game = game;

    /**
     * Flag for checking if base is invincible
     * 
     * @type {boolean}
     * @public
     */
    this.invincible = false;

    /**
     * Makes the base immovable.
     * 
     * @type {boolean}
     * @public
     */
    this.immovable = true;

    /**
     * Total amount of health for the base.
     * 
     * @type {number}
     * @public
     */
    this.health = 500;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Base.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Base.prototype.constructor = panicCity.entity.Base;

/**
 * @inheritDoc
 */
panicCity.entity.Base.prototype.init = function () {
    this.m_initAnimations();
    this.m_initHealthBar();
};

/**
 * @inheritDoc
 */
panicCity.entity.Base.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
};

/**
 * Initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Base.prototype.m_initAnimations = function () {
    this.animation.create("idle", [0], 1, true);
    this.animation.create("invincibility", [1], 1, true);
    this.animation.create("dead", [2], 1, true);

};

/**
 * Damages the base.
 * 
 * @param {number} damage The amount to be damaged.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Base.prototype.takeDamage = function (damage) {
    if (this.invincible) {
        return;
    }
    this.health -= damage;
    this.healthBar.progress = (this.health / 500);
    if (this.health <= 0) {
        this.m_die();
    }
}

/**
 * Kills the base and goes to the Gameover screen.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Base.prototype.m_die = function () {
    this.animation.gotoAndPlay("dead");
    this.game.timers.create({
        duration: 4000,
        onComplete: function () {
            this.game.application.scenes.load([new panicCity.scene.Gameover(this.game)]);
        }.bind(this)
    });
}

/**
 * Initializes the bases healthbar.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Base.prototype.m_initHealthBar = function () {
    this.healthBar = new rune.ui.Progressbar(this.width, 6, "gray", "red");
    this.healthBar.progress = (this.health / 500);
    this.healthBar.x = this.x;
    this.healthBar.y = this.y + 50;
    this.game.stage.addChild(this.healthBar);
}

/**
 * Heals the base.
 * 
 * @param {number} health The amount to be healed.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Base.prototype.heal = function (health) {
    if (this.health > 0 && this.health < 500) {
        this.health += health;
        this.healthBar.progress = (this.health / 500);
    }
    if (this.health > 500) {
        this.health = 500;
    }
}

panicCity.entity.Base.prototype.changeHealthColor = function (color) {
    this.healthBar.forgroundColor = color;
    if(color == "red") {
        this.animation.gotoAndPlay("idle");
    }else{
        this.animation.gotoAndPlay("invincibility");
    }
}
