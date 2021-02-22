let socket = io.connect('http://localhost:8080');
$(document).ready(function(){
    socket.emit("data");
    $("#pseudoEntete").html("Connecté en tant que " + getCookie("pseudo"));
    $("#messageInput").keypress(function(e){
        if(e.which == 13 && e.shiftKey == false){
            e.preventDefault();
            socket.emit("msg", $("#messageInput").val(), getCookie("id_user"), getCookie("pseudo"));
            $("#messageInput").val("");
        }
    });
    socket.on("msg", function(msg, pseudo){
        addMessage(pseudo, msg);
        console.log(pseudo);
    });

    socket.on("dataReturn", function(result){
        result.forEach(function(elt){
            addMessage(elt.pseudo, elt.mes_texte);
        });
    });

    $('#messageInput').on('input', () => socket.emit("typing", getCookie("pseudo")));
    socket.on("typing", function(pseudo){

    });

    var timer = null;
    let typing = false;
    $('#messageInput').keydown(function(){
            typing = true;
           clearTimeout(timer); 
           timer = setTimeout(stopTyping(), 1000)
    });
    
    function stopTyping() {
        socket.emit("typing", getCookie("pseudo"));
    }
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

  function addMessage(pseudo, msg){
    $("#contentMessage").html($("#contentMessage").html() + "<div class='msgContainer'><div class='msgEntete'><h3>"+pseudo+"</h3><p class='msgDateTime'>Aujourd'hui 10:30</p></div><p class='msg'>"+msg+"</p></div>");
  }