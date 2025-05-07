//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @constructor
 * @extends rune.display.Sprite
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
 * 
 * ...
 */
panicCity.entity.Base = function (x, y, width, height, texture, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.display.Sprite.call(this, x, y, width, height, texture);

    /**
     * The Game object.
     * 
     * @type (Object)
     * @public
     */
    this.game = game;

    /**
     * Makes the base immovable.
     * 
     * @type (boolean)
     * @public
     */
    this.immovable = true;

    /**
     * Total amount health for the base.
     * 
     * @type (number)
     * @public
     */
    this.health = 500;

    /**
     * A timer.
     * 
     * @type (number)
     * @public
     */
    this.time = 3000;

    // this.debug = true;
    // this.hitbox.debug = true;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Base.prototype = Object.create(rune.display.Sprite.prototype);
panicCity.entity.Base.prototype.constructor = panicCity.entity.Base;

/**
 * Initialize the base.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Base.prototype.init = function () {
    this.m_initAnimations();
    this.m_initHealthBar();
};

/**
 * Update lopp.
 * 
 * @param {number} step The update ticks.
 *
 * @return {undefined}
 * @public
 * 
 */
panicCity.entity.Base.prototype.update = function (step) {
    panicCity.entity.Entity.prototype.update.call(this, step);
    if(this.keyboard.justPressed("K")) {
        this.healBase(30);
    };
};

/**
 * Method to initialize the animations.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Base.prototype.m_initAnimations = function () {
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
    // this.flicker.start(250);
    this.health -= damage;
    this.healthBar.progress = (this.health / 500);
    if (this.health <= 0) {
     this.m_die();
    }
}

/**
 * Kills the base. Which goes to the Gameover screen.
 *
 * @return {undefined}
 * @private
 * 
 */
panicCity.entity.Base.prototype.m_die = function () {
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
panicCity.entity.Base.prototype.m_initHealthBar = function() {
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
panicCity.entity.Base.prototype.heal = function(health){
    if(this.health > 0 && this.health < 500){
        this.health += health;
        this.healthBar.progress = (this.health / 500);
    }
    if(this.health > 500){
        this.health = 500;
    }
}
