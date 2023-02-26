
const gameSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/game/'
)

function addPlayer() {
    const playerName = document.querySelector('#player_name').value;
    const data = document.querySelector('#diff').value;
    sendData("joined", playerName, data);
}



function sendData(msg, player, data) {
    gameSocket.send(JSON.stringify({
        'username': player,
        'message': msg,
        'data': data,
    }));
}
