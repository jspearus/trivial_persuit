

const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/game/'
);

function showAnswer(answer, Canswer, player, category) {
    document.getElementById("answer").removeAttribute("hidden");
    console.log(player)
    console.log(answer)
    console.log(Canswer)
    if (answer == Canswer) {
        document.getElementById("Canswer").removeAttribute("hidden");
        sendData("Correct", player, category);
      } else {
        document.getElementById("Ianswer").removeAttribute("hidden");
        sendData("Incorrect", player, category);
      }
}

function sendData(msg, player, category) {
    chatSocket.send(JSON.stringify({
        'message': msg,
        'username': player,
        'difficulty': category,
    }));
}

