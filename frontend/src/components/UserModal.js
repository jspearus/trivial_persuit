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
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Grid } from '@material-ui/core';
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
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('None Selected');

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
                    width: 400,
                    backgroundColor: 'white',
                    // backgroundColor: '#424242',
                }}>
                <div>
                    <Typography variant="h4" component="div">
                        Curent User
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        Selected: {selectedValue}
                    </Typography>
                    <br />
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Select Or Create User
                    </Button>
                    <SimpleDialog
                        selectedValue={selectedValue}
                        open={open}
                        onClose={handleClose}
                    />
                </div>
            </Card>
        </Grid >
    );
}