// ==========
// JACK STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Jack(descr) {
    console.log("búa til jack")

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx = this.cx || 200;
    this.cy = this.cy || 200;

    this.origX = this.cx;
    this.origY = this.cy;

    this.velX = this.velX || 0;
    this.velY = this.velY || 0;

    this.rotation = this.rotation || 0;
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.jack;
    
    // Set normal drawing scale, and warp state off
    this.scale = this.scale || 1;
    this._isWarping = false;
    this._isJumping = false;
};

Jack.prototype = new Entity();

Jack.prototype._score = 0;

Jack.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Jack.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Jack.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

//Jack.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values

Jack.prototype.launchVel = 2;
Jack.prototype.numSubSteps = 1;

// HACKED-IN AUDIO (no preloading)
Jack.prototype.warpSound = new Audio(
    "sounds/dead.wav");

Jack.prototype.warp = function () {

    this._isWarping = true;
    this._scaleDirn = -1;
    this.warpSound.play();
    
    // Unregister me from my old posistion
    // ...so that I can't be collided with while warping
    spatialManager.unregister(this);
};

Jack.prototype._updateWarp = function (du) {

    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this.scale += this._scaleDirn * SHRINK_RATE * du;
    
    if (this.scale < 0.2) {
    
        this._moveToASafePlace();
        this.halt();
        this._scaleDirn = 0.6;
        
    } else if (this.scale > 0.6) {
    
        this.scale = 0.6;
        this._isWarping = false;
        
        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);
        
    }
};

Jack.prototype._moveToASafePlace = function () {

    // Move to a safe place some suitable distance away
    this.cx = this.origX;
    this.cy = this.origY;
       
        
    
};
    
Jack.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {
    
        var dX = +Math.sin(this.rotation);
        var dY = -Math.cos(this.rotation);
        var launchDist = this.getRadius() * 1.2;
        
        var relVel = this.launchVel;
        var relVelX = dX * relVel;
        var relVelY = dY * relVel;

        entityManager.fireBullet(
           this.cx + dX * launchDist, this.cy + dY * launchDist,
           this.velX + relVelX, this.velY + relVelY,
           this.rotation);
           
    }
    
};
Jack.prototype.update = function (du) {

    // Handle warping
    if (this._isWarping) {
        this._updateWarp(du);
        return;
    }
    
    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
     
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    // Handle firing
    this.maybeFireBullet();

    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.velX * du;
    var nextY = prevY + this.velY * du;

    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register


    var aveVelY = (oldVelY + this.velY) / 2;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
    var oldVelY = this.velY;
    // Check Y coords

    var ent = this.isColliding() ;
    if (ent){

        if (ent instanceof Enemy){
            this.warp();
            lifeManager.takeJackLife(1);
        }

        if (ent instanceof Bomb){
            var score = ent.collectBomb();
            scoreboardManager.addScore(score);
        }
        if (ent instanceof Platform){
            // if(ent.collidesWithTop(prevX, prevY, nextX, nextY, this.getRadius())) {
            //     this.velY =  0;
            //     intervalVelY = this.velY;
            //     if(this.cy < ent.cy){
            //         console.log("asdasdadsdasd" ,this.cy )
            //         this._isJumping = false;
            //         this._onPlatform = true;

            //     }
            // }
        }
              
            
        
        
    }
    else spatialManager.register(this);


    
    
};

Jack.prototype.addScore = function(score){
    this._score += score;
};

Jack.prototype.getScore = function(){
    return this._score;
};


Jack.prototype.computeSubStep = function (du) {
    
    this.movePlayer(du);  

};

Jack.prototype.calculateJump = function (accelY) {
    
    var jump = 0;

    if (eatKey(this.KEY_JUMP) && !this._isJumping) {
        this._isJumping = true;
        jump += NOMINAL_JUMP;      
    }

    // Apply jump 
    
    var accelY = -1 * jump;  

    accelY += NOMINAL_GRAVITY;
    return accelY;

};

var NOMINAL_GRAVITY = 1.12;

var NOMINAL_JUMP = +30.2;



Jack.prototype.movePlayer = function (du) {
    var accelY = 0;
    var accelX = 0;

    accelY = this.calculateJump(accelY);
    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    
    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;
    
    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
    
    // s = s + v_ave * t
    var prevX = this.cx;
    var prevY = this.cy;

    var nextX = this.cx + intervalVelX * du;
    var nextY = this.cy + intervalVelY * du;
    
    var minY = (g_sprites.jack.height / 2)*this.scale;
   // var maxY = g_canvas.height - minY;
    var maxY = levelManager.mapHeight - minY;

    var minX = (g_sprites.jack.width / 2)*this.scale;
    //var maxX = g_canvas.width - minX;
    var maxX = levelManager.mapWidth - minX;

    // Ignore the bounce if the jack is already in
    // the "border zone" (to avoid trapping them there)
    
    
    if (keys[this.KEY_LEFT] && this.cx > 0 + this.getRadius()) {
        this.cx -= 10 * du;
    }
    if (keys[this.KEY_RIGHT] && this.cx < g_canvas.width - this.getRadius()) {
        this.cx += 10 * du;
    }


   
    if (this.cy > maxY || this.cy < minY) {
       
        // do nothing
    }
    else if (nextY > maxY) {
            this.velY = oldVelY * 0;
            intervalVelY = this.velY;
            this._isJumping = false;

    }else if (nextY < minY){
            this.velY = oldVelY * 0;
            intervalVelY = this.velY;

    }

    for (var i = 0; i < entityManager._platform.length; i++) {
                
        if(entityManager._platform[i].collidesWith(prevX, prevY, nextX, nextY, this.getRadius())) {
                this.velY = oldVelY * 0;
                intervalVelY = this.velY;
                if(this.cy < entityManager._platform[i].cy){
                    this._isJumping = false;

                }
        }
        
    } 

    
    // s = s + v_ave * t
    this.cx += du * intervalVelX;
    this.cy += du * intervalVelY;
};



Jack.prototype.getRadius = function () {
    return ((this.sprite.width / 2) * 0.9)*this.scale;
};

Jack.prototype.takeBulletHit = function () {
    this.warp();
};

Jack.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};


Jack.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
    ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};