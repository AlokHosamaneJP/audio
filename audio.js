var file_z = 'audioSample.mp3';
var player = new AudioPlayer(file_z);
player.init();

function AudioPlayer(file_src){
	self = this;
	this.audioPlayer = new Audio(file_src);
    //this.audioPlayer.crossOrigin = "anonymous";
	this.progress_bar = document.querySelector("#progress_bar");
	this.progress;
    this.AnimatedEffects;
    this.context;
	this.duration;
	this.currentTime;
	this.play_btn = document.querySelector("#play");
	
	this.progress_bar.addEventListener("click", function(e){
		var progress_bar = e.offsetX;
		var barWidth = e.target.offsetWidth;		
		var audio = self.audioPlayer.duration;
		self.progress = (progress_bar / barWidth) * 100;				
		document.querySelector("#progress").style.width = progress + "%";
		self.audioPlayer.currentTime = (self.progress * audio)/ 100;
	});

	this.play_btn.addEventListener("click", function(e){
        console.log("trigger point")
		if(self.audioPlayer.paused){
			this.classList.remove("play");
			this.classList.add("pause");
			self.audioPlayer.play();		
		}else{
			this.classList.remove("pause");
			this.classList.add("play");
			self.audioPlayer.pause();
		}
	});

	this.setProgress = function(){
		var audio = self.audioPlayer.duration;
		var cur = self.audioPlayer.currentTime;
		progress = (cur / audio) * 100;	
	    document.querySelector("#track_time .seek").innerHTML =(cur/60).toFixed(2);
		document.querySelector("#progress").style.width = progress + "%";	
	};
	
    this.audioPlayer.ontimeupdate   = function(){	
		self.setProgress();
	};
  
    this.setmeta = function(){
        self.audioPlayer.addEventListener("canplaythrough",function(){      
            document.querySelector("#track_time .total").innerHTML = (self.audioPlayer.duration/60).toFixed(2);
        });
    };

	this.init = function(){
		self.setmeta();
	};
}