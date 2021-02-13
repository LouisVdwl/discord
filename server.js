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
const io = require('socket.io')();
io.listen(server);

// Evenements    
// Connexion

io.sockets.on('connection', function(socket){
    socket.on("msg", function(msg){
        socket.broadcast.emit("msg", msg);
        socket.emit("msg", msg);
    });
});

// Construteur de client
function Client(id, pseudo){
    this.id = id;
    this.pseudo = pseudo;
}


