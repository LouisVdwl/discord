let socket = io.connect('http://localhost:8080');
$(document).ready(function(){
    $("#pseudoEntete").html("Connecté en tant que " + getCookie("pseudo"));
    $("#messageInput").keypress(function(e){
        if(e.which == 13 && e.shiftKey == false){
            e.preventDefault();
            socket.emit("msg", $("#messageInput").val(), getCookie("pseudo"));
            $("#messageInput").val("");
        }
    });
    socket.on("msg", function(msg){
        $("#contentMessage").html($("#contentMessage").html() + "<p>" + getCookie("pseudo") + ": " + msg + "</p>");
    });
});

function  getCookie(name){
    if(document.cookie.length == 0)
      return null;

    var regSepCookie = new RegExp('(; )', 'g');
    var cookies = document.cookie.split(regSepCookie);

    for(var i = 0; i < cookies.length; i++){
      var regInfo = new RegExp('=', 'g');
      var infos = cookies[i].split(regInfo);
      if(infos[0] == name){
        return unescape(infos[1]);
      }
    }
    return null;
  }