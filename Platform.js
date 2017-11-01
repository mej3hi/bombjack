// ====
// ROCK
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Platform(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;
    this.width = this.width || 40;
    this.height = this.height || 40;

    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.rock;
    this.scale  = this.scale  || 1;


/*  
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};


Platform.prototype = new Entity();

Platform.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
     
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
     

};

Platform.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

Platform.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var platformEdge = this.cy-this.halfHeight;
    // Check Y coords

    
    if ((nextY + r > platformEdge && prevY + r <= platformEdge)||
        (nextY - r < platformEdge && prevY - r >= platformEdge)) {
        // Check X coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {

            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

// HACKED-IN AUDIO (no preloading)
Platform.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Platform.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");


Platform.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    // pass my scale into the sprite, for drawing
    /*this.sprite.scale = this.scale;

    this.sprite.drawWrappedCentredAt(
    ctx, this.cx, this.cy, this.rotation);*/

  
    util.fillBox(ctx, this.cx - this.halfWidth, this.cy - this.halfHeight, this.width,this.height, "yellow")

};