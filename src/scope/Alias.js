//------------------------------------------------------------------------------
// Global scope aliases
//------------------------------------------------------------------------------

/**
 * Exports the application to the global scope.
 */
if (typeof window !== "undefined") {
    if (typeof window.panicCity === "undefined") {
        window.panicCity = panicCity;
    }
}

/**
 * Install the application to Rune OS. If the application is executed within 
 * Rune OS.
 */
if (typeof window !== "undefined" && typeof window.runeos === "object") {
    window.runeos.install(panicCity);
}