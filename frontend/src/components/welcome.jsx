import * as React from 'react';
import { Container, Typography } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Welcome = () => {

    return (
        <Container
            sx={{
                bgcolor: 'dark-grey',
                pt: 8,
                pb: '50%',
                display: 'flex',
                flexDirection: 'row',
            }}>
            <Typography variant="h3"
            >Welcome To inQUIZitive</Typography>
            <br />
        </Container>
    );
}

export default Welcome;