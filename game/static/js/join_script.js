
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
        'username': player,
        'message': msg,
        'difficulty': difficulty,
    }));
}
