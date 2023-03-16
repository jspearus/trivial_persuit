import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Grid, TextField } from '@material-ui/core';
import { DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { blue } from '@mui/material/colors';

const emails = ['Player1', 'Player2'];

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
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    <ListItem disableGutters key={email}>
                        <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} />
                        </ListItemButton>
                    </ListItem>
                ))}

                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('New User')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="New User" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function UserModal() {
    const [theme, setTheme] = React.useState('Blue');
    const [difficulty, setDifficulty] = React.useState('Medium');
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('None Selected');

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };
    const handleChange = (event) => {
        setDifficulty(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
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
                    backgroundColor: 'white',
                    // backgroundColor: '#424242',
                }}>
                <div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please Enter Username (Can be whatever you want) and select difficulty
                            </DialogContentText>
                            <Box
                                component="joinForm"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="outlined-controlled"
                                    label="Enter Username"
                                // value=""
                                // onChange={(event) => {
                                //     // setName(event.target.value);
                                //     console.log(event)
                                // }}
                                />
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={difficulty}
                                        label="Difficulty"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Easy</MenuItem>
                                        <MenuItem value={20}>Medium</MenuItem>
                                        <MenuItem value={30}>Hard</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={theme}
                                        label="Theme"
                                        onChange={handleThemeChange}
                                    >
                                        <MenuItem value={10}>Red</MenuItem>
                                        <MenuItem value={20}>Green</MenuItem>
                                        <MenuItem value={30}>Blue</MenuItem>
                                        <MenuItem value={40}>Orange</MenuItem>
                                        <MenuItem value={50}>Purple</MenuItem>
                                        <MenuItem value={60}>Pink</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Join</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                    <Typography
                        variant="h4"
                        sx={{
                            mt: 10,
                        }}
                    >Join Game</Typography>
                    <Button sx={{
                        mt: 10,
                    }}
                        variant="contained"
                        onClick={handleClickOpen}>
                        Join Game
                    </Button>
                </div>
            </Card>
        </Grid >
    );
}