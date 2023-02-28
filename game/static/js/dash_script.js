
let game = true;

const gameSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/game/'
);

function resetGame() {
    sendData("game", "playerName", "reset");
}

function startGame() {
    sendData("game", "playerName", "start");
}


gameSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data)
    if(data.message === 'joined'){
        setTimeout(function() {
            document.location.reload();
        }, 1000);
    }
    else if(data.message === 'Correct'){
        const slices = document.getElementById(data.username);
        slices.innerHTML = slices.innerHTML + data.data + ',';
        // todo reset button turns back to start button when answer is answerd
        setTimeout(function() {
            document.location.reload();
        }, 2000);
    }
    else if(data.message === 'Incorrect'){
        setTimeout(function() {
            document.location.reload();
        }, 2000);
    }
    else if(data.data === 'reset'){
        game = false;
        document.querySelector('#chat-text').value += ( 'Game Reset...\n')
        document.getElementById("start_btn").removeAttribute("hidden");
        document.getElementById("reset_btn").setAttribute("hidden", '');
        setTimeout(function() {
            document.location.reload();
        }, 1000);
    }
    if (data.data === 'start'){
        game = true;
        document.getElementById("reset_btn").removeAttribute("hidden");
        document.getElementById("start_btn").setAttribute("hidden", '');
    }
   
    if(data.message === 'won'){
        document.querySelector('#chat-text').value += ( data.username +': ' + data.message +': ' + data.data + '\n')
        document.getElementById("reset_btn").removeAttribute("hidden");
        document.getElementById("start_btn").setAttribute("hidden", '');
    }
}

function sendData(msg, player, data) {
    gameSocket.send(JSON.stringify({
        'username': player,
        'message': msg,
        'data': data,
    }));
}
