import React, { useEffect } from 'react'
import { Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { red } from '@mui/material/colors';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import { dark } from '@mui/material/styles/createPalette';
// import { alignProperty } from '@mui/material/styles/cssUtils';
import { Grid } from '@material-ui/core';
import { getData, postData, putData, delData } from './rest';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;

})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    backgroundColor: theme.palette.common.dark,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function QuestionCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [answer, setAnswer] = React.useState('');
    const [player, setPlayer] = React.useState({
        player: '',
        player_number: '',
        theme: '',
        score: 0,
        difficulty: '',
        completed_category: '',
        q_status: '',
        category: '',
        question: '',
        answer: '',
        answer_a: '',
        answer_b: '',
        answer_c: '',
        answer_d: ''
    });

    useEffect(() => {
        //use it 
        var config = { "Access-Control-Allow-Origin": "*" }
        getData(config, 'players', (res) => {
            if (localStorage.user) {
                const player = res.data.filter((player) => player.player == localStorage.user)
                setPlayer({
                    player: player[0].player,
                    player_number: player[0].player_number,
                    theme: player[0].theme,
                    score: player[0].score,
                    difficulty: player[0].difficulty,
                    completed_category: player[0].completed_category,
                    q_status: player[0].q_status,
                    category: player[0].category,
                    question: player[0].question,
                    answer: player[0].answer,
                    answer_a: player[0].answer_a,
                    answer_b: player[0].answer_b,
                    answer_c: player[0].answer_c,
                    answer_d: player[0].answer_d
                })
            }
        }, (err) => {
            //error
            console.log(`GET REQUEST ERROR${err}`);
        });


    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const answerHandler = (ans) => {
        setAnswer(ans);

    }

    return (
        <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            width="100%"
            style={{ minHeight: '100vh' }}
        >
            <Card sx={{
                width: 300,
                backgroundColor: player.theme,
                // backgroundColor: '#424242',
            }}>
                <CardHeader
                    sx={{
                        // color: "#cfd8dc",
                        color: "black",
                    }}

                    title={player.player}
                />
                <Typography variant="body1" color="black">
                    Difficulty: {player.difficulty}
                </Typography>
                <br />
                <Typography variant="body1" color="black">
                    Category: {player.category}
                </Typography>

                <CardContent>
                    <Typography variant="body1" color="black">
                        {player.question}
                    </Typography>
                    <Typography
                        style={{
                            color: 'black',
                            marginTop: '20px',
                            display: !expanded ? 'block' : 'none'
                        }} variant='p2'>Selected Answer: {answer}</Typography>
                </CardContent>
                <Typography variant="body1">Select an Answer then </Typography>
                <CardActions disableSpacing>
                    <Typography variant="body1">======= Tap to Submit ======{'>'} </Typography>
                    <ExpandMore
                        expand={!expanded}
                        onClick={handleExpandClick}
                        aria-expanded={!expanded}
                        aria-label="show more"
                    >
                        <QuestionAnswerIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={!expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Answers:</Typography>
                        <Button onClick={() => {
                            answerHandler('A')
                        }}
                            variant='outlined'>
                            Answer A: {player.answer_a}
                        </Button>
                        <br /><br />
                        <Button onClick={() => {
                            answerHandler('B')
                        }}
                            variant='outlined'>
                            Answer B: {player.answer_b}
                        </Button>
                        <br /><br />
                        <Button onClick={() => {
                            answerHandler('C')
                        }}
                            variant='outlined'>
                            Answer C: {player.answer_c}
                        </Button>
                        <br /><br />
                        <Button
                            onClick={() => {
                                answerHandler('D')
                            }}
                            variant='outlined'>
                            Answer D: {player.answer_d}
                        </Button>
                    </CardContent>
                </Collapse>
            </Card>
            <Button
                style={{
                    marginLeft: '-225px',
                    marginTop: '25px',
                    display: expanded ? 'block' : 'none'
                }}
                onClick={() => {
                    console.log(`Submited ${answer}`)
                }}
                variant='contained'>
                SUBMIT
            </Button>
            <Typography
                style={{
                    color: 'white',
                    marginTop: '20px',
                    display: expanded ? 'block' : 'none'
                }} variant='h6'>Selected Answer: {answer}</Typography>
        </Grid >
    );
}