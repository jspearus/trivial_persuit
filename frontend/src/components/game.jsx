

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

let cards = [{
    "id": 1,
    "type": "Previous Question",
    "quest": "",
    "cat": "",
    "answer": "",
}, {
    "id": 2,
    "type": "Current Question",
    "quest": "This is another question",
    "cat": "History",
    "answera": "A: ",
    "answerb": "B: ",
    "answerc": "C: ",
    "answerd": "D: ",
},];

let testPlayers = [
    {
        "player_number": 1,
        "player": "Jeff",
        "difficullty": "Easy",
        "completed_category": ",History, Sports,",
        "score": 2,
    }, {
        "player_number": 2,
        "player": "Tom",
        "difficullty": "Easy",
        "completed_category": ",Music,",
        "score": 1,
    }, {
        "player_number": 3,
        "player": "Tim",
        "difficullty": "Easy",
        "completed_category": ",Music,",
        "score": 1,
    }, {
        "player_number": 4,
        "player": "Jim",
        "difficullty": "Easy",
        "completed_category": ",Music,",
        "score": 1,
    },
    {
        "player_number": 5,
        "player": "Jay",
        "difficullty": "Easy",
        "completed_category": ",Music,",
        "score": 1,
    }, {
        "player_number": 6,
        "player": "Superlongnamen",
        "difficullty": "Easy",
        "completed_category": ",Music,",
        "score": 1,
    },];


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
    const [preQuestion, setpreQuestion] = React.useState({
        name: '',
        pre_category: '',
        pre_question: '',
        pre_answer: ''
    });
    const [curQuestion, setCurQuestion] = React.useState({
        name: '',
        category: '',
        question: '',
        answera: '',
        answerb: '',
        answerc: '',
        answerd: '',
    });

    React.useEffect(() => {
        console.log(`sock: ${JSON.stringify(props.socketData)}`)
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
            getGameData('game', 'all')
        }
    }, [props.socketData]);

    function getPlayerData(db, name) {
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, db, (res) => {
            // const games = res.data.filter((game) => game.name == name)
            // console.log(`Players:  ${JSON.stringify(res.data)}`);
            setPlayerData(res.data)
            if (playerData.length > 0) {
                playerData.map((player) => (
                    console.log(player)
                ))
            }

            //todo trying to send this to component with useState ?????
            // setPlaerData(`${games[0].name}, ${games[0].current_player}, ${games[0].num_players}`);
        }, (err) => {
            //error
            console.log(`GET REQUEST ERROR${err}`);
        });
    }
    function getGameData(db, name) {
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, db, (res) => {
            const games = res.data.filter((game) => game.name === name)
            console.log(`${games[0].name}, ${games[0].current_player}, ${games[0].num_players}`)

            //todo trying to send this to component with useState ?????
            setGameData(`${games[0].name}, ${games[0].current_player}, ${games[0].num_players}`);
        }, (err) => {
            //error
            console.log(`GET REQUEST ERROR${err}`);
        });
    }
    function getQuestionData(db, name) {
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, db, (res) => {
            const games = res.data.filter((game) => game.name === name)

            //todo trying to send this to component with useState ?????
            if (db === 'preq') {
                setpreQuestion({
                    name: games[0].name,
                    pre_category: games[0].pre_category,
                    pre_question: games[0].pre_question,
                    pre_answer: games[0].pre_answer
                });
                cards[0].quest = preQuestion.pre_question;
                cards[0].cat = preQuestion.pre_category;
                cards[0].answer = preQuestion.pre_answer;
            }
            if (db === 'courq') {
                setCurQuestion({
                    name: games[0].name,
                    category: games[0].category,
                    question: games[0].question,
                    answer: games[0].answer,
                    answera: games[0].answer_a,
                    answerb: games[0].answer_b,
                    answerc: games[0].answer_c,
                    answerd: games[0].answer_d,
                });
                cards[1].quest = curQuestion.question;
                cards[1].cat = curQuestion.category;
                cards[1].answera = 'A: ' + curQuestion.answera;
                cards[1].answerb = 'B: ' + curQuestion.answerb;
                cards[1].answerc = 'C: ' + curQuestion.answerc;
                cards[1].answerd = 'D: ' + curQuestion.answerd;
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
                        Dashboard: {gameData}
                    </Typography>
                    <Button color="secondary"
                        sx={{ mr: 4 }}
                        variant="contained"
                    >
                        Start</Button>

                    <Button color="secondary"
                        variant="outlined"
                    >
                        Reset</Button>
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
                                    <Card>
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
                                            flexDirection: 'column'

                                        }}>
                                            <Typography gutterBottom variant="h6">
                                                {player.player}
                                            </Typography>
                                            <Typography >
                                                Number: {player.player_number}
                                            </Typography>
                                            <Typography>
                                                Dificulty: {player.difficullty}
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
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={12}>
                        {cards.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={6}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
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
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.type}
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            Question: {card.quest}
                                        </Typography>
                                        <Typography gutterBottom variant="p" >
                                            Category: {card.cat}
                                        </Typography>
                                        <Typography gutterBottom variant="h6">
                                            Answer: {card.answer}
                                        </Typography>
                                        <Typography>
                                            {card.answera}
                                        </Typography>
                                        <Typography>
                                            {card.answerb}
                                        </Typography>
                                        <Typography>
                                            {card.answerc}
                                        </Typography>
                                        <Typography >
                                            {card.answerd}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                        ))}
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