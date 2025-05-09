//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new Menu scene Object
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * 
 */
panicCity.scene.Menu = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Demo selection menu.
     *
     * @type {rune.ui.VTMenu}
     * @private
     */
    this.m_menu = null;
    
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
panicCity.scene.Menu.prototype.constructor = panicCity.scene.Menu;

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initMenu();
};

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
panicCity.scene.Menu.prototype.m_initMenu = function() {
    this.m_menu = new rune.ui.VTMenu();
    this.m_menu.onSelect(this.m_onMenuSelect, this);
    this.m_menu.add("Game");
    this.m_menu.add("Credits");
    this.m_menu.center = this.cameras.getCameraAt(0).viewport.center;
    this.stage.addChild(this.m_menu);
};

panicCity.scene.Menu.prototype.m_updateInput = function(step) {
    if (this.keyboard.justPressed("W") || this.gamepads.stickLeftJustUp) {
        this.m_menu.up()
    }
    
    if (this.keyboard.justPressed("S") || this.gamepads.stickLeftJustDown) {
        this.m_menu.down()
    }
    
    if (this.keyboard.justPressed("SPACE") || this.gamepads.justPressed(0)) {
        this.m_menu.select();
    }
};

panicCity.scene.Menu.prototype.m_onMenuSelect = function(elem) {
    switch (elem.text) {
        case "Game":
            this.application.scenes.load([new panicCity.scene.Game()])
            break;
        
        case "Credits":
            this.application.scenes.load([new panicCity.scene.Credits()])
            break;
    }
};