let socket = io.connect('http://localhost:8080');
$(document).ready(function(){
    $("#messageInput").keypress(function(e){
        if(e.which == 13 && e.shiftKey == false){
            e.preventDefault();
            socket.emit("msg", $("#messageInput").val());
            $("#messageInput").val("");
        }
    });
    socket.on("msg", function(msg){
        $("#contentMessage").html($("#contentMessage").html() + "<p>" + msg + "</p>");
    });
});