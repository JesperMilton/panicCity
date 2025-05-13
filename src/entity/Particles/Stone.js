//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Instances of the Stone class.
 *
 * @constructor
 * @extends rune.particle.Particle
 *
 * @class
 * 
 * Class for Stone particles
 */
panicCity.entity.Stone = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    rune.particle.Particle.call(this, 0, 0, 5, 5, "image_StonePar");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

panicCity.entity.Stone.prototype = Object.create(rune.particle.Particle.prototype);
panicCity.entity.Stone.prototype.constructor = panicCity.entity.Stone;
