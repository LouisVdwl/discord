const http = require("http");
const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");
var url = require('url');
const mysql = require("mysql");
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

// Connexion à la bdd
const bdd = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "",

    database : "discord"
 
});


bdd.connect(function(err) {

    if (err) throw err;
 
    console.log("Connecté à la base de données MySQL!");

 
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
        bdd.query("insert into dis_msg(sender_id, mes_texte) values('"+ 0 + "' ,'"+msg+"')");

    });
});

// Construteur de client
function Client(id, pseudo){
    this.id = id;
    this.pseudo = pseudo;
}


