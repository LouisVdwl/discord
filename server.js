const http = require("http");
const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");
var url = require('url');
// Liste des clients connectés
let listeClients = [];

// Client sous forme d'objet
const client = {};

// Renvoie le contenu du dossier courant de facon statique
const serve = serveStatic("./");
 
// Création du serveur
const server = http.createServer(function(req, res) {
    serve(req, res, finalhandler(req, res)); // Traitement de la requête par le middleware


});
// Lancement
server.listen(8080, function() {
    console.log('Lancement du serveur sur http://localhost:8080');
});
// Chargement de socket.io
let io = require('socket.io').listen(server);

// Evenements    
// Connexion

io.sockets.on('connection', function(socket){
    // Connection d'un client
    socket.on('connection', function(pseudo, aide, etudiant){

        listeClients.push(socket.id);
        client[socket.id] = new Client(socket.id, pseudo, aide, etudiant);
        console.log(client[socket.id]);
    });

    socket.on('envoie', function(message){
        var i = 0;
        listeClients.forEach(function(cli){
            if(client[cli].aide == client[socket.id].aide){
                i ++;
            }
        })
        socket.broadcast.emit('envoie', message, client[socket.id].pseudo, client[socket.id].etudiant, client[socket.id].aide, i);
        socket.emit('envoie', message, 'moi', client[socket.id].etudiant, client[socket.id].aide, i);
    });

});

// Construteur de client
function Client(id, pseudo, aide, etudiant){
    this.id = id;
    this.pseudo = pseudo;
    this.aide = aide;
    this.etudiant = etudiant;
}


