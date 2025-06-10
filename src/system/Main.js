//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
panicCity.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "com.paniccity",
        app: "panicCity",
        build: "0.0.0",
        scene: panicCity.scene.Menu,
        resources: panicCity.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 60,
        debug: false
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.system.Main.prototype = Object.create(rune.system.Application.prototype);
panicCity.system.Main.prototype.constructor = panicCity.system.Main;