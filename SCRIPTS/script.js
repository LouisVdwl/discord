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
        addMessage(pseudo, msg, new Date($.now()).toISOString());
    });

    socket.on("dataReturn", function(result){
        result.forEach(function(elt){
            addMessage(elt.pseudo, elt.mes_texte, elt.mes_date);
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

function addMessage(pseudo, msg, datetime){
  $("#contentMessage").html($("#contentMessage").html() + "<div class='msgContainer'><div class='msgEntete'><h3>"+pseudo+"</h3><p class='msgDateTime'>"+formatDate(datetime)+"</p></div><p class='msg'>"+msg+"</p></div>");
  let element = document.getElementById('contentMessage');
  element.scrollTop = element.scrollHeight;
}

function formatDate(datetime){
  let date1 = new Date(datetime.slice(0,10));
  let heure = datetime.slice(11,16);
  let date2 = new Date($.now());
  // différence des heures
  let time_diff = date2.getTime() - date1.getTime();
  // différence de jours
  let days_Diff = time_diff / (1000 * 3600 * 24);
  let retour;
  console.log(parseInt(days_Diff));
  switch(parseInt(days_Diff)){
    case 0:
      retour = "Aujourd'hui à " + heure;
      break;
    case 1:
      retour = "Hier à " + heure;
      break;
    default:
      retour = (date1).toLocaleDateString('fr');
  }
  return retour;
}