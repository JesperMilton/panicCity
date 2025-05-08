//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Blood class.
 *
 * @constructor
 * @extends rune.particle.Particle
 *
 * @class
 * 
 * Class for blood particles
 */
panicCity.entity.Blood = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.particle.Particle.call(this, 0, 0, 5, 5, "image_Blood");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Blood.prototype = Object.create(rune.particle.Particle.prototype);
panicCity.entity.Blood.prototype.constructor = panicCity.entity.Blood;

