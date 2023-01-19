const gameSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/game/'
);

gameSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data)
    if(data.message === 'joined'){
        const para1 = document.createElement("h3");
        const node1 = document.createTextNode("Player:" + data.username);
        para1.appendChild(node1);

        const para = document.createElement("h5");
        const node = document.createTextNode("Difficulty: "+ data.difficulty);
        para.appendChild(node);

        const para2 = document.createElement("h5");
        para2.setAttribute("id", data.username)
        const node2 = document.createTextNode("Slices: ");
        para2.appendChild(node2);
        const element = document.getElementById("playerList");
        element.appendChild(para1);
        element.appendChild(para);
        element.appendChild(para2);
    }
    else if(data.message === 'Correct'){
        const slices = document.getElementById(data.username);
        slices.innerHTML = slices.innerHTML + ',' + data.difficulty 
    }
    else{
      document.querySelector('#chat-text').value += ( data.username +': ' + data.message +': ' + data.difficulty + '\n')
      

    }

}