
const gameSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/game/'
)

function addPlayer() {
    const playerName = document.querySelector('#player_name').value;
    const difficulty = document.querySelector('#diff').value;
    sendData("joined", playerName, difficulty);
}



function sendData(msg, player, difficulty) {
    gameSocket.send(JSON.stringify({
        'message': msg,
        'username': player,
        'difficulty': difficulty,
    }));
}
