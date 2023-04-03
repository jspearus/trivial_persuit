import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid, TextField, ThemeProvider } from '@material-ui/core';
import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import { getData, postData, putData, delData } from './rest';

const diffList = ['Easy', 'Medium', 'Hard'];
const themes = ['Red', 'Green', 'Blue', 'Orange', 'Purple', 'Yellow', 'Pink', 'Grey', 'White', 'Black'];

const WS_URL = 'ws://synapse.viewdns.net:8080/ws/game/';

const chatSocket = new WebSocket(WS_URL);

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Select Or Create User</DialogTitle>

        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function UserModal(props) {
    const [name, setName] = React.useState('');
    const [theme, setTheme] = React.useState(1);
    const [difficulty, setDifficulty] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const handleThemeChange = (event) => {
        if (event.target.value !== '') {
            setTheme(event.target.value);
            localStorage.theme = event.target.value
        }
    };
    const handleChange = (event) => {
        if (event.target.value !== '') {
            setDifficulty(event.target.value);
            localStorage.difficulty = event.target.value
        }

    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    function sendMsg(user, data_type, data) {
        chatSocket.send(JSON.stringify({
            'username': user,
            'data_type': data_type,
            'data': data,
        }));

    }
    function getRequest(name, db) {   //use it 
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, db, (res) => {
            var config = {
                player: name,
                difficulty: diffList[difficulty],
            }
            var players = res.data.filter((player) => player.player == name)
            // console.log(`FromFunct: ${JSON.stringify(players)}`)
            if (players[0]) {
                const id = players[0].id;
                // console.log(`id: ${id}`)
                // console.log(`db: ${db}`)
                // console.log(`diff: ${diffList[difficulty]}`)
                updatePlayer(name, diffList[localStorage.difficulty], themes[localStorage.theme], id);
                sendMsg('jeff', 'update', 'players')
            }
            else {
                // console.log('notFound')
                console.log(`legnth: ${res.data.length}`)
                // console.log(`name: ${name}`)
                // console.log(`diff: ${diffList[difficulty]}`)
                postPlayer(db, name, diffList[localStorage.difficulty], res.data.length + 1)
                // todo update game data with new player count
                // todo changed data_type to setup to update gameData file
                sendMsg('jeff', 'setup', 'players')
            }


        }, (err) => {
            //error
            console.log(`GET REQUEST ERROR${err}`);
        });
    }


    function postPlayer(db, name, diff, player_number) {
        //use it 
        var config = {
            player: name,
            difficulty: diff,
            player_number: player_number,
            theme: themes[localStorage.theme]
        }
        postData(config, db, (res) => {
            console.log('created')
            sendMsg('jeff', 'debug', 'players')
        }, (err) => {
            //error
            console.log(`POST REQUEST ERROR ${err}`);
        });
    }
    function updatePlayer(name, diff, theme, id) {
        //use it 
        var config = {
            player: name,
            difficulty: diff,
            theme: themes[localStorage.theme]
        }
        putData(config, 'players', id, (res) => {
            console.log('updated')
            sendMsg('jeff', 'debug', 'players')
        }, (err) => {
            //error
            console.log(`PUT REQUEST ERROR ${err}`);
        });
    }
    const handleClose = (value) => {
        setOpen(false);
        if (value.target.id == 'join') {
            if (name !== '') {
                localStorage.user = name
                setName('')
            }
            getRequest(localStorage.user, 'players')

            // console.log(name)
            // console.log(diffList[difficulty])
            // console.log(themes[theme])

        }
        else if (value.target.id == 'cancel') {

        }
    };

    return (
        <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            width="100%"
            style={{ minHeight: '100vh' }}
        >
            <Card
                sx={{
                    width: 300,
                    height: 400,
                    backgroundColor: themes[localStorage.theme],
                    // backgroundColor: '#424242',
                }}>
                <div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>User Info:</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Current User: {localStorage.user}
                            </DialogContentText>
                            <DialogContentText>
                                Please Enter Username (Can be whatever you want), select difficulty, and theme color
                            </DialogContentText>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="outlined-controlled"
                                    label="Enter Username"
                                    placeholder={localStorage.user}
                                    value={name}
                                    onChange={(event) => {
                                        if (event.target.value !== '') {
                                            setName(event.target.value);
                                            localStorage.user = event.target.value
                                        }

                                    }}
                                />
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={localStorage.difficulty}
                                        label="Difficulty"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={0}>Easy</MenuItem>
                                        <MenuItem value={1}>Medium</MenuItem>
                                        <MenuItem value={2}>Hard</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={localStorage.theme}
                                        label="Theme"
                                        onChange={handleThemeChange}
                                    >
                                        <MenuItem value={0}>Red</MenuItem>
                                        <MenuItem value={1}>Green</MenuItem>
                                        <MenuItem value={2}>Blue</MenuItem>
                                        <MenuItem value={3}>Orange</MenuItem>
                                        <MenuItem value={4}>Purple</MenuItem>
                                        <MenuItem value={5}>Yellow</MenuItem>
                                        <MenuItem value={6}>Pink</MenuItem>
                                        <MenuItem value={7}>Grey</MenuItem>
                                        <MenuItem value={8}>White</MenuItem>
                                        <MenuItem value={9}>Black</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <DialogActions>
                                <Button id='cancel' onClick={handleClose}>Cancel</Button>
                                <Button id='join' onClick={handleClose}>Join</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                    <Typography
                        variant="h5"
                        sx={{
                            mt: 10,
                        }}
                    >Username: {localStorage.user}</Typography>
                    <Button sx={{
                        mt: 20,
                    }}
                        variant="contained"
                        onClick={handleClickOpen}>
                        User Info
                    </Button>
                </div>
            </Card>
        </Grid >
    );
}