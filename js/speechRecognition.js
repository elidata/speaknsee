function Speech(mylang) {
  if ('webkitSpeechRecognition' in window) {
    // creating voice capture object
    //this.recognition = new webkitSpeechRecognition();
	this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();


    // settings
    this.recognition.continuous = false; // stop automatically
	this.recognition.continouus = 
    this.recognition.languageCode = mylang;
    console.log(" inside speech() lang is "+ mylang) ;
	  //this.recognition.lang = "en-US" ;
	  // why doesn't it like hebrew
    this.recognition.lang = "he-IL" ;
    this.recognition.interimResults = false;

    this.startCapture = function() {
      this.recognition.start();
    }

    this.stopCapture = function() {
      this.recognition.stop();
    }

	var i=0;
    this.recognition.onresult = function(event) {
      var  res = event.results[0][0].transcript;
      console.log(res);
      res = res.split(' ');
		
      $('#output0').text(res[0]);
	  $('#output1').text(res[1]);    
	  $('#output2').text(res[2]);       
	  $('#output3').text(res[3]); 
	  getPhoto(res[0]);
	  getPhoto(res[1]);
	  getPhoto(res[2]);
	  getPhoto(res[3]);
    }

    this.recognition.onerror = function(event) {
      console.log(event.error);
    }

    console.log("webkitSpeechRecognition is available.");
  } else {
    console.log("webkitSpeechRecognition is not available.");
  }
}
