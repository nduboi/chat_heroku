const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    socket.on("Joueur conecter", pseudo => {
        console.log("Utilisateur : " + pseudo + " connecter"); 
        var join = pseudo +" a rejoint le chat"
        io.emit("rejoint", join);
    })
    socket.on("disconnect", () => {
        console.log("déconnecté");
    })
    socket.on("deconexion", pseudo => {
        console.log("Utilisateur : " + pseudo + " déconnecter"); 
        var deconexion = pseudo + " a quitter le chat"
        io.emit("leave", deconexion);
    })
    socket.on("chat message", (msg) =>{
        io.emit("chat message", msg);
    })
})
var port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log("Serveur OK");
})