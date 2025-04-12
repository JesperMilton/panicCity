//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new Requests object.
 * 
 * @constructor
 * @extends rune.resource.Requests
 * 
 * @class
 * @classdesc
 * 
 * This class includes (bakes) resource files used by the application. A 
 * resource file is made available by reference (URI) or base64-encoded string. 
 * Tip: Use Rune-tools to easily bake resource files into this class.
 */
panicCity.data.Requests = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.resource.Requests
     */
    rune.resource.Requests.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.data.Requests.prototype = Object.create(rune.resource.Requests.prototype);
panicCity.data.Requests.prototype.constructor = panicCity.data.Requests;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
panicCity.data.Requests.prototype.m_construct = function() {
    rune.resource.Requests.prototype.m_construct.call(this);
    
};