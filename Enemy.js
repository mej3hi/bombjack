// ====
// Enemy
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Enemy(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;

    this.origX = this.cx;
    this.origY = this.cy;

    this.velX = this.velX || 1;
    this.velY = this.velY || 0;

    this.range = this.range || 200;
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.enemy;
    this.scale  = this.scale  || 1;

    this.movingRight = false;
/*  
    // Diagnostics to check inheritance stuff
    this._EnemyProperty = true;
    console.dir(this);
*/

};


Enemy.prototype = new Entity();

/*Enemy.prototype.setVelocity = function (velX,velY) {
    this.velX = velX;
    this.velY = velY;
};*/

Enemy.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
     
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    if (!this.movingRight){
        this.cx -= this.velX * du;
        if (this.cx < this.origX - this.range/2 ){

            this.movingRight = true;
            this.cx += this.velX * du;
        }
        
    }
    if (this.movingRight){
        this.cx += this.velX * du;
        if (this.cx > this.origX + this.range/2 ){

            this.movingRight = false;
            this.cx += this.velX * du;
        }
    }
    this.cy += this.velY * du;
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
     

};

Enemy.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

// HACKED-IN AUDIO (no preloading)
Enemy.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Enemy.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");


Enemy.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    if (this.movingRight) {
        this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation);
    }
    if (!this.movingRight) {
        ctx.scale(-1, 1);
        this.sprite.drawWrappedCentredAt(
        ctx, -this.cx, this.cy, this.rotation);
        ctx.scale(-1, 1);
    }

};