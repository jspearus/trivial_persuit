import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';

import UserModal from './components/UserModal';
import { getData, postData, putData, delData } from './components/rest';

import './App.css';
import Welcome from './components/welcome';
import NavBar from './components/navBar';
import GameView from './components/game';
import Question from './components/questionView';

const WS_URL = 'ws://synapse.viewdns.net:8080/ws/game/';

const chatSocket = new WebSocket(WS_URL);


function App() {
  chatSocket.onopen = (event) => {
    // run code on load here
  };
  const [menuOption, setMenuOption] = useState('HOME');
  const [socketData, setSocketData] = useState([]);


  function sendMsg(user, data_type, data) {
    chatSocket.send(JSON.stringify({
      'username': user,
      'data_type': data_type,
      'data': data,
    }));

  }

  chatSocket.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      setSocketData(json);
    } catch (err) {
      console.log(`[ERROR] : ${err}`);
    }

  };

  function getGameData(db, name) {
    var config = { "Access-Control-Allow-Origin": "*" }
    getData(config, db, (res) => {
      const games = res.data.filter((game) => game.name == name)
      console.log(`${games[0].name}, ${games[0].current_player}, ${games[0].num_players}`)

      //todo trying to send this to component with useState ?????
      // setGameData(`${games[0].name}, ${games[0].current_player}, ${games[0].num_players}`);
    }, (err) => {
      //error
      console.log(`GET REQUEST ERROR${err}`);
    });
  }


  return (
    <Router>
      <div className="App"
        sx={{
          backgroundColor: '#ff0000',
        }}>
        <NavBar setMenuOption={setMenuOption} />
        <Routes>
          <Route path='/'
            element={
              <>
                <Welcome />

                <Button variant="contained"
                  onClick={() => sendMsg('jeff', 'debug', 'game')}>Game</Button>
                <Button variant="contained"
                  onClick={() => sendMsg('jeff', 'status', 'nextplayer')}>next</Button>
                <Button variant="contained"
                  onClick={() => sendMsg('jeff', 'debug', 'quest')}>Quest</Button>
                <Button variant="contained"
                  onClick={() => sendMsg('jeff', 'debug', 'players')}>Player</Button>
              </>
            }
          />
          <Route path='/join' element={<UserModal setSocketData={setSocketData} />} />
          <Route path='/create' element={<GameView
            socketData={socketData}
          />} />

          <Route path='/question' element={<Question
            socketData={socketData} />} />
        </Routes>

      </div>
    </Router>
  );

}
export default App;
