

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
// import { grey } from '@mui/material/colors';

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

const cards = [{
    "id": 1,
    "type": "Previous Question",
    "quest": "This is a question",
    "cat": "Sports",
    "answer": "The Answer",
}, {
    "id": 2,
    "type": "Current Question",
    "quest": "This is another question",
    "cat": "History",
    "answera": "A: The Answer a",
    "answerb": "B: The Answer b",
    "answerc": "C: The Answer c",
    "answerd": "D: The Answer d",
},];

const players = [{
    "id": 1,
    "name": "Jeff",
    "diff": "Easy",
    "sclices": ",History, Sports,",
    "points": 2,
}, {
    "id": 2,
    "name": "Tom",
    "diff": "Easy",
    "sclices": ",Music,",
    "points": 1,
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

export default function GameView() {
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
                        variant="contained">
                        Start</Button>

                    <Button color="secondary"
                        variant="outlined">
                        Reset</Button>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Player Stats
                        </Typography>
                        <Grid container spacing={12}>
                            {players.map((player) => (
                                <Grid item key={player.id} xs={12} sm={6} md={6}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                                                {player.name}
                                            </Typography>
                                            <Typography>
                                                Dificulty: {player.diff}
                                            </Typography>
                                            <Typography>
                                                Slices: {player.sclices}
                                            </Typography>
                                            <Typography>
                                                Points {player.points}
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
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={12}>
                        {cards.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={6}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                                        <Typography>
                                            Question: {card.quest}
                                        </Typography>
                                        <Typography>
                                            Category: {card.cat}
                                        </Typography>
                                        <Typography>
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
                                        <Typography>
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