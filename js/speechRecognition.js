function Speech(mylang) {
  if ('webkitSpeechRecognition' in window) {
    // creating voice capture object
    //this.recognition = new webkitSpeechRecognition();
	this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();


    // settings
    this.recognition.continuous = false; // stop automatically
    this.recognition.languageCode = mylang;
    console.log(" inside speech() lang is "+ mylang) ;
	  //this.recognition.lang = "en-US" ;
	  // why doesn't it like hebrew
   // this.regognition.lang = "he-IL" ;
    this.recognition.interimResults = true;

    this.startCapture = function() {
      this.recognition.start();
    }

    this.stopCapture = function() {
      this.recognition.stop();
    }

    this.recognition.onresult = function(event) {
      var  res = event.results[0][0].transcript;
      console.log(res);
      res = res.split(' ');
      for (I=0; i< res.size(); i++) {
      	console.log(res[i]) ;
      }
		
      $('#output').text(event.results[0][0].transcript);      
    }

    this.recognition.onerror = function(event) {
      console.log(event.error);
    }

    console.log("webkitSpeechRecognition is available.");
  } else {
    console.log("webkitSpeechRecognition is not available.");
  }
}
