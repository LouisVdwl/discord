$(document).ready(function(){
    $("#messageInput").keypress(function(e){
        console.log(e.which);
        if(e.which == 13){
            e.preventDefault();
            $("#contentMessage").html($("#contentMessage").html() + "<p>" + $("#messageInput").val() + "</p>");
            $("#messageInput").val("");
        }
    });
});