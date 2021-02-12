
/********* Serveur ***********/
// Connection à socket.io
let socket = io.connect('http://localhost:8080');

// Emettre une requete indiquant la connection

/********* Serveur ***********/
// Demande du pseudo
var pseudo = prompt('Entrez votre pseudo: ');
var etudiant = prompt('Etes-vous étudiant en recherche d\'informations ? (O/N): ').toUpperCase();
var aide;
if(etudiant == 'O'){
    aide = prompt('Entrez le nom de l\'aide dont vous avez besoin: ').toLowerCase();
}else{
    aide = prompt('Entrez le nom de l\'aide que vous pouvez apporter: ').toLowerCase();
}

// Envoie de la requete de connexion
socket.emit('connection', pseudo, aide, etudiant);
var message = document.getElementById("message");
var titrePseudo = document.getElementById('pseudo');
titrePseudo.innerHTML = pseudo;
let b = document.body;
let newP = document.createElement('span');



function envoie(){
    socket.emit('envoie', message.value, aide);
    message.value = '';
}

socket.on('envoie', function(message, pseudo, etudiant, aideEtu, i){
    console.log(aideEtu, aide);
    if(aideEtu == aide){
        document.getElementById('co').innerHTML = 'Nombre de personnes connectées: ' + i;
        // Ligne du message
        let msg = document.createElement("li"); 
        msg.id = 'liMsg';
        document.getElementById("contentMessage").appendChild(msg); 
        // Pseudo du message
        if(etudiant == 'O'){
            let valeurPseudo = document.createElement('p')
            valeurPseudo.textContent = pseudo + ' : ';
            valeurPseudo.id = 'valeurPseudo';
            document.getElementById('liMsg').appendChild(valeurPseudo);
        }else{
            let valeurPseudo = document.createElement('p')
            valeurPseudo.textContent = pseudo + ' : ';
            valeurPseudo.id = 'valeurPseudoNon';
            document.getElementById('liMsg').appendChild(valeurPseudo);
        }
        // texte du message
        let valeurMsg = document.createElement('p');
        valeurMsg.textContent = message;
        valeurMsg.id = 'msg';
        document.getElementById('liMsg').appendChild(valeurMsg); 


        }
    
});

