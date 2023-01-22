

const gameSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/game/'
);
let player_num = 0;
function loadFunct(playerNum){
    player_num = playerNum;
    console.log(player_num)
}

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

gameSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    var delayInMilliseconds = 3000; //1 second
    console.log(data)
    setTimeout(function() {
        if(data.message === 'Correct'){
            document.location.reload();
        }
        else if(data.message === 'Incorrect'){
            document.location.reload();
        }
    }, delayInMilliseconds);
}

function sendData(msg, player, category) {
    gameSocket.send(JSON.stringify({
        'message': msg,
        'username': player,
        'difficulty': category,
    }));
}

