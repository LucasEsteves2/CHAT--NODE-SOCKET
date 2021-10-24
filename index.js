//chamando o modlulo
const express = require("express");
const path = require("path");
//executando o modulo(criando o app)
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("index.html");
});

//ja que nao estou usando um banco vou salvar em u mvet
let mensagens = [];

//toda vez que alguem se connectar
io.on("connection", (socket) => {
  console.log(`Alguem se conectou: ID:${socket.id}`);

  socket.on("sendMessage", (data) => {
    console.log(data);
    mensagens.push(data);
    socket.broadcast.emit("reciveMessage", data);
  });
});
server.listen(3000);
