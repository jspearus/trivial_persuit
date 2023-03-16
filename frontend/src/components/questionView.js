import React from 'react'
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
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

                    title="Player: Jeff"
                    subheader="Difficulty: Easy"
                />

                <CardContent>
                    <Typography variant="body2" color="blue">
                        This is where the question will be?
                    </Typography>
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
                        <Button variant='outlined'>
                            Answer A: This will be the answer to the question.
                        </Button>
                        <Button variant='outlined'>
                            Answer B: This will be the answer to the question.
                        </Button>
                        <Button variant='outlined'>
                            Answer C: This will be the answer to the question.
                        </Button>
                        <Button variant='outlined'>
                            Answer D: This will be the answer to the question.
                        </Button>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid >
    );
}