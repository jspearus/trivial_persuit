const gameSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/game/'
);

function resetGame() {
    sendData("game", "playerName", "reset");
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
        slices.innerHTML = slices.innerHTML + data.difficulty + ',';
        setTimeout(function() {
            document.location.reload();
        }, 500);
    }
    else if(data.difficulty === 'reset'){
        document.querySelector('#chat-text').value += ( 'Game Reset...\n')
        setTimeout(function() {
            document.location.reload();
        }, 1000);
    }
    else{
      document.querySelector('#chat-text').value += ( data.username +': ' + data.message +': ' + data.difficulty + '\n')
      
    }
    if(data.message === 'WON!!!!!'){
        document.querySelector('#chat-text').value += ( data.username +': ' + data.message +': ' + data.difficulty + '\n')
    }
}

function sendData(msg, player, difficulty) {
    gameSocket.send(JSON.stringify({
        'message': msg,
        'username': player,
        'difficulty': difficulty,
    }));
}
