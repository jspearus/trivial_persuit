

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GitHubIcon from '@mui/icons-material/GitHub';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { getData, postData, putData, delData } from './rest';

const WS_URL = 'ws://synapse.viewdns.net:8080/ws/game/';

const chatSocket = new WebSocket(WS_URL);


function Copyright() {
    return (
        <Typography variant="body2" color="primary" align="center">
            <Link color="inherit" href="https://github.com/jspearus/trivial_persuit">
                <GitHubIcon />
            </Link>{' '}
            {'© '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#000050"
        },
        secondary: {
            main: "#478ce6"
        }
    }
}
);

export default function GameView(props) {
    const [gameData, setGameData] = React.useState([]);
    const [playerData, setPlayerData] = React.useState([]);
    const [preQuestion, setPreQuestion] = React.useState({})
    const [curQuestion, setCurQuestion] = React.useState({});
    const [curPlayer, setCurPlayer] = React.useState('None');

    function sendMsg(user, data_type, data) {
        chatSocket.send(JSON.stringify({
            'username': user,
            'data_type': data_type,
            'data': data,
        }));

    }

    React.useEffect(() => {
        getPlayerData('players', 'all');
        getGameData('game', 'game')
    }, []);

    React.useEffect(() => {
        // console.log(`sock: ${JSON.stringify(props.socketData)}`)
        // if (props.socketData.data != undefined) {
        //     getGameData('game', props.socketData.data);
        // }
        if (props.socketData.data === 'quest') {
            getQuestionData('preq', 'game');
            getQuestionData('courq', 'game');
        }
        else if (props.socketData.data === 'players') {
            getPlayerData('players', 'all');
        }
        else if (props.socketData.data === 'game') {
            getGameData('game', 'game')
            console.log('game update')
        }
        else if (props.socketData.data === 'start') {
            // todo this may casue a sync problem!!!!!!!!!!!!1   
            getGameData('game', 'game')
            getQuestionData('preq', 'game');
            getQuestionData('courq', 'game');
            getPlayerData('players', 'all');
            sendMsg('dash', 'status', 'nextplayer')
        }
        else if (props.socketData.data === 'reset') {
            // todo this may casue a sync problem!!!!!!!!!!!!1   
            getGameData('game', 'game')
            getQuestionData('preq', 'game');
            getQuestionData('courq', 'game');
            getPlayerData('players', 'all');
            sendMsg('dash', 'status', 'nextplayer')
        }
    }, [props.socketData]);

    function getPlayerData(db, name) {
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, db, (res) => {
            setPlayerData(res.data)
            // console.log(`play: ${JSON.stringify(playerData)}`);
        }, (err) => {
            //error
            console.log(`GET REQUEST ERROR${err}`);
        });
    }

    function getGameData(db, name) {
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, db, (res) => {
            const games = res.data.filter((game) => game.name === name)
            // console.log(`${games[0].name}, ${games[0].current_player}, ${games[0].num_players}`)

            setGameData(games[0])
            setCurPlayer(games[0].current_player)
        }, (err) => {
            //error
            console.log(`GET REQUEST ERROR${err}`);
        });
    }
    function getQuestionData(db, name) {
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, db, (res) => {
            if (db == 'preq') {
                setPreQuestion(res.data[0]);
                console.log(`pre: ${JSON.stringify(preQuestion)}`);
            }
            else if (db === 'courq') {
                setCurQuestion(res.data[0]);
                console.log(`cur: ${JSON.stringify(curQuestion)}`);
            }
        }, (err) => {
            //error
            console.log(`GET REQUEST ERROR${err}`);
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <DashboardIcon color="secondary" sx={{ mr: 2 }} />
                    <Typography sx={{ mr: 4 }} variant="h6" color="secondary" noWrap>
                        Dashboard
                    </Typography>
                    <Button color="secondary"
                        sx={{ mr: 4 }}
                        variant="contained"
                        onClick={() => {
                            sendMsg('dash', 'status', 'start')
                        }}
                    >
                        Start</Button>

                    <Button color="secondary"
                        variant="outlined"
                        sx={{
                            mr: 20
                        }}
                        onClick={() => {
                            sendMsg('dash', 'status', 'reset')
                        }}
                    >
                        Reset</Button>
                    <Typography sx={{ mr: 6 }} variant="h4" color="white" noWrap>
                        Current Player: {curPlayer}
                    </Typography>
                    <Typography sx={{ mr: 8 }} variant="h4" color="white" noWrap>
                        Max Score: {gameData.max_score}
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>

                <Box
                    sx={{
                        bgcolor: grey,
                        pt: 8,
                        pb: 6,
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Container >
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="white"
                            gutterBottom
                        >
                            Player Stats
                        </Typography>
                        <Grid container spacing={2}>

                            {playerData.map((player) => (
                                < Grid item key={player.player_number} xs={12} sm={6} md={2} >
                                    <Card
                                        style={{ backgroundColor: player.theme }}>
                                        {/* <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    /> */}
                                        <CardContent sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',

                                        }}>
                                            <Typography gutterBottom variant="h6">
                                                {player.player}
                                            </Typography>
                                            <Typography >
                                                Number: {player.player_number}
                                            </Typography>
                                            <Typography>
                                                Dificulty: {player.difficulty}
                                            </Typography>
                                            <Typography>
                                                Slices: {player.completed_category}
                                            </Typography>
                                            <Typography>
                                                Points {player.score}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                <Container sx={{
                    bgcolor: grey,
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '40px',
                    marginBottom: '40px'
                }} >
                    {/* End hero unit */}
                    <Grid container spacing={2}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                margin: '10px',
                                marginRight: '20px',
                                width: 550,
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Previous Question:
                                </Typography>
                                <Typography variant="h6">
                                    Question: {preQuestion.pre_question}
                                </Typography>
                                <Typography variant="p" >
                                    Category: {preQuestion.pre_category}
                                </Typography>
                                <Typography variant="h6">
                                    Answer: {preQuestion.pre_answer}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                margin: '10px',
                                marginLeft: '20px'
                            }}
                        >
                            {/* <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    /> */}
                            <CardContent sx={{
                                flexGrow: 1,
                                flexWrap: 'wrap',
                                width: 550,

                            }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Current Question:
                                </Typography>
                                <Typography gutterBottom variant="h6">
                                    Question: {curQuestion.question}
                                </Typography>
                                <Typography gutterBottom variant="p" >
                                    Category: {curQuestion.category}
                                </Typography>
                                <Typography gutterBottom variant="h6">
                                    Answer: {curQuestion.answer}
                                </Typography>
                                <Typography>
                                    A: {curQuestion.answer_a}
                                </Typography>
                                <Typography>
                                    B: {curQuestion.answer_b}
                                </Typography>
                                <Typography>
                                    C: {curQuestion.answer_c}
                                </Typography>
                                <Typography >
                                    D: {curQuestion.answer_d}
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions> */}
                        </Card>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Build with React & Django
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color={theme.palette.primary.main}
                    component="p"
                >
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider >
    );
}