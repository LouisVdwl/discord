let socket = io.connect('http://localhost:8080');

function ValidateEmail(value)
{
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(value.match(mailformat))
{
return true;
}
else
{
$("#mail").focus();
return false;
}
}


$(document).ready(function(){
    $("#submitInscription").click(function(e){
        let status = true;
        e.preventDefault();
        // Validation double mdp
        if($("#pass1").val() != $("#pass2").val()){
            status = false;
            alert("Les mot de passe ne correspondent pas cogno !");
        }

        // Validation email
        if(!ValidateEmail($("#mail").val())){
            status = false;
            alert("Pas bon le mail là !");
        }

        if(status){
            socket.emit("demandeInscription", $("#pseudo"), $("#mail"), $("#pass1"));
        }

    });
});