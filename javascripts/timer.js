var socket = io.connect('http://localhost:3000');

$(document).ready(function() {
    $("#alertWindow").hide();
});


var clock = $('.clock').FlipClock({
		clockFace: 'TwentyFourHourClock'
	});

socket.on('setTimer', function(data){
    console.log(data.time);
    var time = data.time;
    var clock = $('.clock').FlipClock(time, {
		countdown: true
	});
});

socket.on('setSlow', function(data){

    
    $("#alertWindow").show();
    setTimeout(function(){
        $("#alertWindow").hide();
        $(".container").show();
    }, 20000)
    console.log(data.slow);
    var slow = data.slow;

});


socket.on('setAgenda', function(data){
    console.log(data.agenda);
    var newAgenda = data.agenda;
    document.getElementById('text').textContent = newAgenda;
});



