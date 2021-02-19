const http = require("http");
const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");
var url = require('url');
const mysql = require("mysql");
var passwordHash = require('password-hash');

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

    socket.on("demandeInscription", function(pseudo, mail, pass1){
        bdd.query("select count(*) from dis_user where mail like '" + mail + "'", function(err, result){
            if(result[0]["count(*)"] == 0){
                bdd.query("insert into dis_user(mail, password, pseudo) values('"+ mail +"','"+passwordHash.generate(pass1)+"','"+pseudo+"')");
                socket.emit("statusInscription", true);
            }else{
                console.log("L'adresse mail est déjà utilisée !");
                socket.emit("statusInscription", false);
            }
        });
    });

    socket.on("connexion", function(mail, password){
        bdd.query("select password, user_id, pseudo from dis_user where mail like '" + mail+"'", function(err, result){
            let passResult = result[0].password;
            if(passwordHash.verify(password, passResult)){
                socket.emit("connexionStatus", true, result[0].user_id, result[0].pseudo);
            }else{
                socket.emit("connexionStatus", false);
            }
        });
        
    })
});


