//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Glass class.
 *
 * @constructor
 * @extends rune.particle.Particle
 *
 * @class
 * 
 * Class for Glass particles
 */
panicCity.entity.Glass = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.particle.Particle.call(this, 0, 0, 5, 5, "image_Glass");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Glass.prototype = Object.create(rune.particle.Particle.prototype);
panicCity.entity.Glass.prototype.constructor = panicCity.entity.Glass;

