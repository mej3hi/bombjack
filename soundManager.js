var soundManager ={

myAudio: undefined,

setBackgroundMusic: function(sound) { 
	//if(sound === undefined) return;
    
    if(this.myAudio !== undefined){
        this.myAudio.pause();
    }
    this.myAudio =  new Audio(sound);
    this.myAudio.loop = true;
    this.myAudio.play();    
},



}