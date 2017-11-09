// ==========
// LEVEL STUFF
// ==========

// LEVEL STUFF

var levelManager = {

level : 1,
totalBomb : 0,

mapWidth : 600,
mapHeight :560,

startCx: -50,
startCy: 300,
renderStarSprite: false,

_fontSize : "20px",
_fontFamliy : "Arial",
_fontColor : "white",

lifeSpan: 5000/ NOMINAL_UPDATE_INTERVAL,

update : function(du){
	if(entityManager._bombs.length <= 6 && this.level <4){


		if(this.lifeSpan === (5000/ NOMINAL_UPDATE_INTERVAL) ){
			this.clearLevel();
			this.nextLevel();
			var a = this.getMap(this.level);
			backgroundManager.setBackground(a.background)
			this.renderStarSprite = true;
		}

		this.lifeSpan -=du;

		if(this.lifeSpan < 0){
			this.createLevel(this.level);
			this.lifeSpan = 5000/ NOMINAL_UPDATE_INTERVAL;
			this.startCx=-50;
			this.renderStarSprite = false;
		}

		this.startCx +=du*4;
		if(this.startCx >= 300){
			this.startCx=300;
		}


	}

},

render : function(ctx){

	util.fillText(ctx,
		270,
		575,
		"LEVEL",
		this._fontSize,
		this._fontFamliy,
		this._fontColor);

	util.fillText(ctx,
		292,
		595,
		this.level,
		this._fontSize,
		this._fontFamliy,
		this._fontColor);


	if(this.renderStarSprite){
		var origScale = g_sprites.bombJack.scale;
		g_sprites.bombJack.scale = 3;

		g_sprites.bombJack.drawCentredAt(ctx,this.startCx,this.startCy,0,[240, 260, 50,15]);
		g_sprites.bombJack.drawCentredAt(ctx,600-this.startCx,this.startCy,0,[300, 260, 50,15]);

		g_sprites.bombJack.scale = origScale;
	}


},


backToFirstLevel : function() {
	//lifeManager._jackLife = 3;
	this.clearLevel();
	this.level = 1;
	this.createLevel(this.level);
},


changeLevel : function() {

	this.clearLevel();

	this.nextLevel();
	this.createLevel(this.level);
},



clearLevel : function() {
	entityManager.eraseAllEntities();
},

nextLevel : function(){
	this.playLevelChangeSound();
	this.level++;
},

getLevel : function(){
	return this.level;
},

getMap: function(level){

	switch(level){

	case 1:
		return this._levelInfo.one;
		break;

	case 2:
		return this._levelInfo.two;
		break;

<<<<<<< HEAD
=======
	case 3:
		return this._levelInfo.three;
		break;

>>>>>>> 2f8c9117b409ef54f156669cc0baafe7a438eba6
	}

},



playLevelChangeSound : function(){
    var levelChangeSound = new Audio(
        "sounds/levelChangeSound.wav");
    levelChangeSound.play();
},


createLevel : function (level) {
	var level = this.getMap(level)

	if(level.jack){
		entityManager.generateJack(level.jack)
	}

	if(level.platform){
		for (var i = 0; i < level.platform.length; i++) {
			entityManager.generatePlatform(level.platform[i]);
		};
	}

	if(level.enemy){
		for (var i = 0; i < level.enemy.length; i++) {
			entityManager.generateEnemy(level.enemy[i]);
		};
	}

	if(level.bomb){
		for (var i = 0; i < level.bomb.length; i++) {
			entityManager.generateBomb(level.bomb[i]);
			this.totalBomb++;
		};
	}

	backgroundManager.setBackground(level.background);
	soundManager.setBackgroundMusic(level.backgroundSound);


},


// Level info for each level
_levelInfo : {


	one:{

		background: "img/backgroundEgypt.png",
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

<<<<<<< HEAD
		jack:{cx : 300,cy : 500},
=======
		jack:{cx : 600/2,cy : 560/2},
>>>>>>> 2f8c9117b409ef54f156669cc0baafe7a438eba6

		platform:[

				//Top Left Platform
		    {cx : 7*30, cy : 150, width : 100, color : 1},

				//Top Right Platform
				{cx : 14*30, cy : 3*30, width : 100, color : 1},

				//Middle Platform
		    {cx : 11*30, cy : 11*30, width : 100, color : 1},

				//Bottom Left Platform
				{cx : 4*30, cy : 15*30, width : 100, color : 1},

				//Bottom Right Platform
		    {cx : 15*30, cy : 15*30, width : 200, color : 1},

		],

		enemy:[
				//Bottom Left Enemy
				{cx : 4*30, cy : 15*30-20, range : 100, velX: 1.2},
				//Top Left Enemy
		   	{cx : 7*30, cy : 5*30-20, range : 100, velX: 0.9},
				//Top Right Enemy
		   	{cx : 14*30, cy : 3*30-20, range : 100, velX: 1}
		],

		bomb:[
		 	/*{cx: 80, cy: 20},
		    {cx: 140, cy: 20},
		    {cx: 200, cy: 20},*/

<<<<<<< HEAD
		    {cx: 20, cy: 200},
		    {cx: 20, cy: 260},
		    {cx: 20, cy: 320},
		    {cx: 20, cy: 380},

		    {cx: 400, cy: 420},
		    {cx: 460, cy: 420},
		    {cx: 520, cy: 420},

		   /* {cx: 400, cy: 20},
		    {cx: 460, cy: 20},
		    {cx: 520, cy: 20},*/

		    {cx: 80, cy: 540},
		    {cx: 140, cy: 540},
		    {cx: 200, cy: 540},

		    {cx: 580, cy: 200},
		    {cx: 580, cy: 260},
		    {cx: 580, cy: 320},
		    {cx: 580, cy: 380},

		    {cx: 400, cy: 140},
		    {cx: 460, cy: 140},
		    {cx: 520, cy: 140},
=======

				//Top Left
		    {cx: 3*30,   cy: 1*30},
		    {cx: 5*30,   cy: 1*30},
		    {cx: 7*30,   cy: 1*30},

				//Top Right
		    {cx: 15*30,   cy: 1*30},
		    {cx: 17*30,   cy: 1*30},
		    {cx: 19*30,   cy: 1*30},


				//Top Right	- Below Platform
		    {cx: 11*30,   cy: 4*30},
		    {cx: 13*30,   cy: 4*30},
		    {cx: 15*30,   cy: 4*30},
		    {cx: 17*30,   cy: 4*30},

				//Bottom Right Platform
		    {cx: 13*30,   cy: 14*30},
		    {cx: 15*30,   cy: 14*30},
		    {cx: 17*30,   cy: 14*30},



				//Bottom Left
		    {cx: 3*30,   cy: 18*30},
		    {cx: 5*30,   cy: 18*30},
		    {cx: 7*30,   cy: 18*30},

				//Far left
		    {cx: 1*30,   cy: 7*30},
		    {cx: 1*30,   cy: 9*30},
		    {cx: 1*30,   cy: 11*30},
		    {cx: 1*30,   cy: 13*30},

				//Far Right
		    {cx: 19*30,   cy: 7*30},
		    {cx: 19*30,   cy: 9*30},
		    {cx: 19*30,   cy: 11*30},
		    {cx: 19*30,   cy: 13*30},
>>>>>>> 2f8c9117b409ef54f156669cc0baafe7a438eba6
		]


	},

	two:{

		background: "img/backgroundGreek.png",
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

		jack: {cx : 300,cy : 500},


		// PLATFORMS
		platform: [

				//Top Left Platform
		    {cx : 3*30, cy : 6*30, width : 6*30, color : 2},

				//Top Right Platform
		    {cx : 17*30, cy : 6*30, width : 6*30, color : 2},

				//Middle Left
		    {cx : 4*30, cy : 11*30, width : 3*30, color : 2},

				//Middle Right
		    {cx : 16*30, cy : 11*30, width : 3*30, color : 2},

				//Bottom Left
		    {cx : 7*30, cy : 15*30, width : 3*30, color : 2},

				//Bottom Right
		    {cx : 13*30, cy : 15*30, width : 3*30, color : 2},

	    ],

    	// ENEMIES
    	enemy : [
				/*
		    {cx : 120, cy : 425, range : 100, velX: 1.2},
		    {cx : 420, cy : 75, range : 100, velX: 1},
				*/
    	],


    	// BOMBS
	     bomb: [
<<<<<<< HEAD
		    {cx: 80, cy: 20},
		    {cx: 140, cy: 20},
		    {cx: 200, cy: 20},

=======
>>>>>>> 2f8c9117b409ef54f156669cc0baafe7a438eba6

				//Bottom Left Bombs
		    {cx: 3*30,    cy: 14*30},
		    {cx: 5*30,    cy: 14*30},
		    {cx: 7*30,    cy: 14*30},

				//Bottom Right Bombs
		    {cx: 13*30,    cy: 14*30},
		    {cx: 15*30,    cy: 14*30},
		    {cx: 17*30,    cy: 14*30},

				//Middle Left Bombs
		    {cx: 3*30,    cy: 10*30},
		    {cx: 5*30,    cy: 10*30},
		    {cx: 7*30,    cy: 10*30},

				//Middle Right Bombs
		    {cx: 13*30,    cy: 10*30},
		    {cx: 15*30,    cy: 10*30},
		    {cx: 17*30,    cy: 10*30},

				//Top Left Bombs
		    {cx: 1*30,    cy: 4*30},
		    {cx: 3*30,    cy: 4*30},
		    {cx: 5*30,    cy: 4*30},

				//Top Right Bombs
		    {cx: 15*30,   cy: 4*30},
		    {cx: 17*30,   cy: 4*30},
		    {cx: 19*30,   cy: 4*30},

				//Upper Top Middle Bombs
		    {cx: 7*30,    cy: 2*30},
		    {cx: 9*30,    cy: 2*30},
		    {cx: 11*30,   cy: 2*30},
		    {cx: 13*30,   cy: 2*30},

				//Lower Top Middle Bombs
		    {cx: 7*30,    cy: 6*30},
		    {cx: 9*30,    cy: 6*30},
		    {cx: 11*30,   cy: 6*30},
		    {cx: 13*30,   cy: 6*30},

	    ],
	},

	three:{

		background: "img/backgroundCastle.png",
		backgroundSound : "sounds/Commodore64/in-game-bgm-magnetic-fields-part-2-sid-stereo-.mp3",

		jack: {cx : 300,cy : 250},


		// PLATFORMS
		platform: [

				//Top Left Platform
		    {cx : 6*30, cy : 5*30, width : 3*30, color : 1},

				//Top Right Platform
		    {cx : 14*30, cy : 5*30, width : 3*30, color : 1},


				//Bottom Left
		    {cx : 3*30, cy : 15*30, width : 3*30, color : 1},

				//Bottom Right
		    {cx : 17*30, cy : 15*30, width : 3*30, color : 1},

				//Bottom Middle
		    {cx : 10*30, cy : 13*30, width : 3*30, color : 1},

	    ],

    	// ENEMIES
    	enemy : [
				/*
		    {cx : 120, cy : 425, range : 100, velX: 1.2},
		    {cx : 420, cy : 75, range : 100, velX: 1},
				*/
    	],


    	// BOMBS
	     bomb: [

				//Bottom Left Bombs
		    {cx: 1*30,    cy: 14*30},
		    {cx: 3*30,    cy: 14*30},
		    {cx: 5*30,    cy: 14*30},

				//Bottom Right Bombs
		    {cx: 15*30,    cy: 14*30},
		    {cx: 17*30,    cy: 14*30},
		    {cx: 19*30,    cy: 14*30},

				//Ground Left Bombs
		    {cx: 8*30,    cy: 18*30},
		    {cx: 6*30,    cy: 18*30},

				//Ground Right Bombs
		    {cx: 12*30,    cy: 18*30},
		    {cx: 14*30,    cy: 18*30},

				//Middle Left Bombs
		    {cx: 8*30,    cy: 8*30},
		    {cx: 8*30,    cy: 10*30},
		    {cx: 8*30,    cy: 12*30},

				//Middle Right Bombs
		    {cx: 12*30,    cy: 8*30},
		    {cx: 12*30,    cy: 10*30},
		    {cx: 12*30,    cy: 12*30},

				//Top Left Platform Bombs
		    {cx: 5*30,    cy: 4*30},
		    {cx: 7*30,    cy: 4*30},

				//Top Right Platform Bombs
		    {cx: 13*30,   cy: 4*30},
		    {cx: 15*30,   cy: 4*30},

				//Top Left Bombs
		    {cx: 1*30,    cy: 1*30},
		    {cx: 3*30,    cy: 1*30},

				//Top Right Bombs
		    {cx: 17*30,    cy: 1*30},
		    {cx: 19*30,    cy: 1*30},

	    ],
	}
}






}
