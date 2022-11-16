const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("disconnect", () => {
        console.log("déconnecté");
    })
    socket.on("chat message", (msg) =>{
        io.emit("chat message", msg);
    })
})
var port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log("Serveur OK");
})