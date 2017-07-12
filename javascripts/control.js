var firstMove;
var oldTime;

$(document).ready(function() {

    console.log('ready');

    $("#slow").hide();
    $("#sent").show();

    window.addEventListener('touchstart', function(e){
        firstMove = true;
    });

    window.addEventListener('touchmove', function(e){
        if (firstMove) {
            e.preventDefault();
            firstMove = false;
        }
    });

    

    var elements = document.querySelectorAll("#inputAgenda, #hour, #min");
    for (var i = 0; i < elements.length; i++) {
        $(elements[i]).on("change keyup paste", function() {
            $("#slow").hide();
            $("#sent").show();
    });
    }
});






$("#sent").click(function(){
    
    var start = document.getElementById('hour').value;
    var end = document.getElementById('min').value;
    var agenda = document.getElementById('inputAgenda').value;

    console.log(start + end + agenda);
    var startH = start.substring(0,1);
    var endH = end.substring(0,1);
    var h = (parseInt(end) - parseInt(start)) * 3600;

    var startM = start.slice(-2);
    var endM = end.slice(-2);
    var m = (parseInt(startM) - parseInt(endM)) * 60;


    var newTime = h + m;
    console.log(newTime);



    $.post('agenda', { agenda: agenda}, 
        function(returnedData){
            console.log(returnedData);
    }).fail(function(){
        console.log("error");
    });

    if (newTime !== oldTime) {
        console.log("new---" + newTime + "old---" + oldTime);
        $.post('time', { time: newTime}, 
            function(returnedData){
                console.log(returnedData);
        }).fail(function(){
            console.log("error");
        });
        oldTime = newTime;
        console.log("new---" + newTime + "old---" + oldTime);
    };
    
    $("#slow").show();
    $("#sent").hide();


});




$("#slow").click(function(){
    
    $.post('alarm', { slow: true }, 
        function(returnedData){
            console.log(returnedData);
    }).fail(function(){
        console.log("error");
    });
});




