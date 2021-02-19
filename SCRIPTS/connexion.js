let socket = io.connect('http://localhost:8080');
$(document).ready(function(){
    $("#connexion").click(function(e){
        e.preventDefault();
        socket.emit("connexion", $("#mail").val(), $("#pass").val());
    });

    socket.on("connexionStatus", function(status, id, pseudo){
        if(status){
            document.cookie = "id_user=" + id + "";
            document.cookie = "pseudo=" + pseudo + "";
            window.location.href = "discord.html";
        }else{
            alert("Mauvais mot de passe !");
        }
    });
});