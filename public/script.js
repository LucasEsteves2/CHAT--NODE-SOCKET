var socket = io("http://localhost:3000");

function renderMessage(message) {
  $(".messages").append(
    '<div class="message"><strong>' +
      message.author +
      ": </strong>" +
      message.message +
      " </div> "
  );
}

socket.on("reciveMessage", function (message) {
  renderMessage(message);
});
{
}
$("#chat").submit(function (event) {
  //tirando o padrao pro botao nao relogar
  event.preventDefault();

  var author = $("input[name=username]").val();
  var message = $("input[name=message]").val();

  if (message == "" || author == "") {
    if (author == "") {
      alert("Porfavor informe um nome de usuario");
    } 
    if(message==""){ 
      alert("Porfavor escreva uma mensagem");
    }
  } else {
    //enviar um objeto para o webSocket
    var messageObject = {
      author: author,
      message: message,
    };
    socket.emit("sendMessage", messageObject);

    renderMessage(messageObject);
    //limpando o
     document.getElementById("mensagem").value = "";
  }
});