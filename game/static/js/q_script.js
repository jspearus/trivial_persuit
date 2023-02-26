

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
    console.log(player)
    console.log(answer)
    console.log(Canswer)
    if (confirm("Is that your final answer?") == true) {
        document.getElementById("answer").removeAttribute("hidden");
        if (answer == Canswer) {
            document.getElementById("Canswer").removeAttribute("hidden");
            sendData("Correct", player, category);
          } else {
            document.getElementById("Ianswer").removeAttribute("hidden");
            sendData("Incorrect", player, category);
          }
    } else {
        // pass
    }

}

gameSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    var delayInMilliseconds = 1000; //1 second
    console.log(data)
    setTimeout(function() {
        if(data.message === 'Correct'){
            document.location.reload();
        }
        else if(data.message === 'Incorrect'){ 
            document.location.reload();
        }
        else if(data.message === 'game'){
            if(data.data === 'start'){
                document.location.reload();
            }
            else if(data.data === 'reset'){
                window.location = '/';  
            }
        }
    }, delayInMilliseconds);
    if(data.message === 'won'){
        if(data.data ===player_num){
            confirm("You won! Congrats");
        }
    }
}

function sendData(msg, player, data) {
    gameSocket.send(JSON.stringify({
        'username': player,
        'message': msg,
        'data': data,
    }));
}

