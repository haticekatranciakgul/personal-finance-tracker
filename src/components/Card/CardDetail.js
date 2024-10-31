import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



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

function CardDetail({ showExpenseModal,
    showIncomeModal}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid container spacing={1}>

            <Grid size={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Current Balance
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>7 £</Typography>

                    </CardContent>
                    <CardActions>
                        <Button onClick={handleOpen} fullWidth variant="contained" size="small">Reset Balance</Button>
                    </CardActions>
                </Card>


            </Grid>
            <Grid size={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Total Income
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>7 £</Typography>

                    </CardContent>
                    <CardActions>
                        <Button onClick={showIncomeModal} fullWidth variant="contained" size="small">Reset Balance </Button>
                    </CardActions>
                </Card>

            </Grid>
            <Grid size={4}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 25 }}>
                            Total Expenses
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>7 £</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={showExpenseModal} fullWidth variant="contained" size="small">Reset Balance</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton focusVisibleClassName='none'
                        onClick={handleClose}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </Grid>

    )
}

export default CardDetail
