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

export default function QuestionCard() {
    const [expanded, setExpanded] = React.useState(false);
    const [answer, setAnswer] = React.useState('');
    const [player, setPlayer] = React.useState({
        player: '',
        player_number: '',
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
                backgroundColor: 'white',
                // backgroundColor: '#424242',
            }}>
                <CardHeader
                    sx={{
                        // color: "#cfd8dc",
                        color: "blue",
                    }}
                    subheaderTypographyProps={{ color: 'blue' }}

                    title={player.player}
                    subheader="Difficulty: Easy"
                />
                {/* <Typography variant="body1" color="blue">
                    {socketData[0].name}
                </Typography> */}
                <Typography variant="body1" color="blue">
                    Category: {player.category}
                </Typography>

                <CardContent>
                    <Typography variant="body1" color="blue">
                        {player.question}
                    </Typography>
                    <Typography paragraph>Selected Answer:{answer}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <QuestionAnswerIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Answers:</Typography>
                        <Button onClick={() => {
                            answerHandler('a')
                        }}
                            variant='outlined'>
                            Answer A: {player.answer_a}
                        </Button>
                        <br /><br />
                        <Button onClick={() => {
                            answerHandler('b')
                        }}
                            variant='outlined'>
                            Answer B: {player.answer_b}
                        </Button>
                        <br /><br />
                        <Button onClick={() => {
                            answerHandler('c')
                        }}
                            variant='outlined'>
                            Answer C: {player.answer_c}
                        </Button>
                        <br /><br />
                        <Button
                            onClick={() => {
                                answerHandler('d')
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
                    display: !expanded ? 'block' : 'none'
                }}
                onClick={() => {
                    console.log(`Submited ${answer}`)
                }}
                variant='contained'>
                SUBMIT
            </Button>
        </Grid >
    );
}