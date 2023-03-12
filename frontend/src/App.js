import React, { Component, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import './App.css';
import NavBar from './components/navBar';
import GameView from './components/game';

const WS_URL = 'ws://192.168.1.22:8080/ws/game/';

const chatSocket = new WebSocket(WS_URL);


function sendMsg(user, msg, data) {
  chatSocket.send(JSON.stringify({
    'message': msg,
    'username': user,
    'data': data,
  }));

}

function sendClicked(name, msg) {
  sendMsg(name, msg, 'abcd')
}

chatSocket.onmessage = function (event) {
  const json = JSON.parse(event.data);
  try {
    if ((json.username === "server")) {

      console.log(`[message] Data received from server: ${json.username}`);
      console.log(json.message);
    }
  } catch (err) {
    console.log(err);
  }

};

function App() {
  chatSocket.onopen = (event) => {
    sendMsg('jeff', 'react', 'cmd')
  };
  const [menuOption, setMenuOption] = useState('HOME');

  return (
    <div className="App">
      <NavBar setMenuOption={setMenuOption} />
      <GameView menuOption={menuOption} />
      <header className="App-header">
        <button onClick={() => sendClicked('jeff', 'test')}>click</button>
      </header>
    </div>
  );

}
export default App;
