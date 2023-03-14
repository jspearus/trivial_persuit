import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';

import UserModal from './components/UserModal';
import { getData, postData, putData, delData } from './components/rest';

import './App.css';
import NavBar from './components/navBar';
import GameView from './components/game';
import Create from './components/create';
import Join from './components/join';
import Question from './components/questionView';

const WS_URL = 'ws://192.168.1.22:8080/ws/game/';

const chatSocket = new WebSocket(WS_URL);


function sendMsg(user, data_type, data) {
  chatSocket.send(JSON.stringify({
    'username': user,
    'data_type': data_type,
    'data': data,
  }));

}

function getClicked(name, datat, data) {
  sendMsg(name, datat, data)
  //use it 
  var config = { "Access-Control-Allow-Origin": "*" }
  getData(config, (res) => {
    console.log(res.data[1].name)
    window.confirm(JSON.stringify(res.data));
    const games = res.data.filter((game) => game.name == name)
    window.confirm(games[0].name)
  }, (err) => {
    //error
    console.log(`GET REQUEST ERROR${err}`);
  });
}
function postClicked(name, datat, data) {
  sendMsg(name, datat, data)
  //use it 
  var config = { name: 'TEst game' }
  postData(config, (res) => {
  }, (err) => {
    //error
    console.log(`POST REQUEST ERROR ${err}`);
  });
}
function putClicked(name, datat, data) {
  sendMsg(name, datat, data)
  //use it 
  var config = { max_score: 25 }
  putData(config, 9, (res) => {
  }, (err) => {
    //error
    console.log(`PUT REQUEST ERROR ${err}`);
  });
}
function delClicked(name, datat, data) {
  sendMsg(name, datat, data)
  //use it 
  var config = { "Access-Control-Allow-Origin": "*" }
  delData(config, 8, (res) => {
  }, (err) => {
    //error
    console.log(`PUT REQUEST ERROR ${err}`);
  });
}


chatSocket.onmessage = function (event) {
  const json = JSON.parse(event.data);
  try {
    if ((json.username === "jeff")) {
      console.log(`[MSG] Data received from server: ${json.username}`);
      console.log(json.data);

    }
  } catch (err) {
    console.log(`[ERROR] : ${err}`);
  }

};

function App() {
  chatSocket.onopen = (event) => {
    // run code on load here
  };
  const [menuOption, setMenuOption] = useState('HOME');


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
                <GameView menuOption={menuOption} />

                <Button variant="contained"
                  onClick={() => getClicked('TEst game', 'test', 'config')}>GET</Button>
                <Button variant="contained"
                  onClick={() => putClicked('jeff', 'test', 'config')}>PUT</Button>
                <Button variant="contained"
                  onClick={() => postClicked('jeff', 'test', 'config')}>POST</Button>
                <Button variant="contained"
                  onClick={() => delClicked('jeff', 'test', 'config')}>DELETE</Button>
              </>
            }
          />
          <Route path='/create' element={<UserModal />} />
          <Route path='/join' element={<Join />} />
          <Route path='/question' element={<Question />} />
        </Routes>

      </div>
    </Router>
  );

}
export default App;
