let socket = io.connect('http://localhost:8080');
$(document).ready(function(){
    $("#connexion").click(function(e){
        e.preventDefault();
        socket.emit("connexion", $("#mail").val(), $("#pass").val());
    });

    socket.on("connexionStatus", function(status){
        if(status){
            alert("Connexion...");
        }else{
            alert("Mauvais mot de passe !");
        }
    });
});