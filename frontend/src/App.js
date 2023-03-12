import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';

import './App.css';
import NavBar from './components/navBar';
import GameView from './components/game';
import Create from './components/create';
import Join from './components/join';

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
    <Router>
      <div className="App">
        <NavBar setMenuOption={setMenuOption} />
        <Routes>
          <Route path='/'
            element={
              <>
                <GameView menuOption={menuOption} />

                <Button variant="contained"
                  onClick={() => sendClicked('jeff', 'test')}>Test</Button>
              </>
            }
          />
          <Route path='/create' element={<Create />} />
          <Route path='/join' element={<Join />} />
        </Routes>

      </div>
    </Router>
  );

}
export default App;
