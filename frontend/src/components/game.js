

import * as React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function GameView({ menuOption }) {


    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }}>
            <Stack
                spacing={2} direction="row">
                <Typography variant="h4"
                >Hello Home View: {menuOption}</Typography>
                <CircularProgress variant="determinate" value={50} />
            </Stack>
        </div>
    )
}

export default GameView;