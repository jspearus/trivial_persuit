import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const WS_URL = 'ws://synapse.viewdns.net:8080/ws/game/';

const chatSocket = new WebSocket(WS_URL);


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function WinnerModalClient(props) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        setOpen(props.win);
    }, [props.win]);

    function sendMsg(user, data_type, data) {
        chatSocket.send(JSON.stringify({
            'username': user,
            'data_type': data_type,
            'data': data,
        }));

    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        WINNER!!!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {props.player} Has Won!
                    </Typography>
                    <br></br>
                    <Button onClick={() => {
                        console.log('home')
                        navigate('/')
                    }}
                        sx={{
                            mr: 20,
                        }}
                        variant='contained'>
                        Home
                    </Button>
                    <Button onClick={() => {
                        console.log('play')
                        sendMsg('game', 'status', 'reset')
                        navigate('/join')
                        setOpen(false)
                    }}
                        variant='contained'>
                        Play Again
                    </Button>
                </Box>
            </Modal>
        </div >
    );
}