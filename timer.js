class Timer{
	constructor(minutes,divId,callback){
		this.callback = callback;
		this.divId = divId;
		this.setMinutes = minutes;
		this.minutes = minutes;
	 	if (localStorage.getItem("timeInSecond") === null) {
			this.seconds = this.setMinutes * 60;
	 		localStorage.setItem("timeInSecond", this.seconds);
		} else {
			this.seconds = localStorage.getItem("timeInSecond");
		}
	}

	get countdown(){
		this.seconds--;
		localStorage.setItem("timeInSecond", this.seconds);
		return this.formatTime();
	}

	get timeNow(){
		return this.formatTime();
	}

	formatTime(){
		var leftOver = this.seconds;
 		// this.hours = Math.floor(this.seconds/3600);
 		// leftOver -= this.hours * 3600;
 		// this.minutes = Math.floor(leftOver / 60);
 		// leftOver -= this.minutes * 60;
 		// return(this.hours+':'+this.minutes+':'+leftOver);
 		var timeLeft = new Date(this.seconds * 1000).toISOString().substr(11, 8);
 		return timeLeft;
	}

	reset(){
		this.seconds = this.setMinutes * 60;
		localStorage.setItem("timeInSecond", this.seconds);
	}

	start(){
		this.interval = setInterval(function(){
			$('#'+this.divId).html(this.countdown);	
			if (this.seconds <= 0){
				eval(this.callback);
			}			
		}.bind(this), 1000);
	}

	pause(){
		clearInterval(this.interval);
	}

	stop(interval){
		clearInterval(this.interval);
		localStorage.removeItem("timeInSecond");			
	}		
}