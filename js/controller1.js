function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

$( document ).ready(function() {
	console.log('Starting SpeechRecognition library.');
	var mylang = 'he-IL'; //$('#mylang').value ;
	mylang=qs("lang") ;
	console.log('Language is'+ mylang) ;
	var speech = new Speech(mylang);

    speech.recognition.onstart = function() {
		$('#capture').text("Stop");
		$('#capture').val("false");
		$('#status').text("Listening...");
		$('#pictures').clear;
    	console.log('Listening started...');
    }

	speech.recognition.onend = function() {
		$('#capture').text("Start");
		$('#capture').val("true");
		$('#status').text("Idle");
    	console.log('Listening stopped.');
    }
	
	$('#refresh').click(function() {
		$('#pictures').html("Pictures");
	});


	$('#capture').click(function() {
		if ($('#capture').val() == "true") {
			speech.startCapture();
		}
		else {
			speech.stopCapture();
		}
	});
});
