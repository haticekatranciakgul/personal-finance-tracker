import React from 'react'
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

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

function AddIncomeModal({
    isIncomeModalVisible,
    handleIncomeCancel,

}) {


    return (

        <Modal
            open={isIncomeModalVisible}
            onCancel={handleIncomeCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    onClick={handleIncomeCancel}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant='h5' id="modal-modal-description" sx={{ mt: 2 }}>
                    Add Income 
                </Typography>
                <Divider />


                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormControl 
                    sx={{ paddingY:'20px'}}
                    >
                        <FormLabel htmlFor="name" required>
                            Name
                        </FormLabel>
                        <OutlinedInput
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            size="small"
                        />
                    </FormControl>
                    <FormControl
                    sx={{ paddingBottom:'20px'}}
                    >
                        <FormLabel htmlFor="amount" required>
                            Amount
                        </FormLabel>
                        <OutlinedInput
                            id="amount"
                            name="amount"
                            type="amount"
                            autoComplete="amount"
                            required
                            size="small"
                        />
                    </FormControl>
                    <FormControl
                    sx={{ paddingBottom:'20px'}}
                    >
                        <FormLabel htmlFor="Date" required>
                            Date
                        </FormLabel>
                        <OutlinedInput
                            id="Date"
                            name="Date"
                            type="Date"
                            autoComplete="Date"
                            required
                            size="small"
                        />
                    </FormControl>
                    <FormControl
                    sx={{ paddingBottom:'20px'}}
                    >
                        <FormLabel htmlFor="lTag" required>
                            Tag
                        </FormLabel>
                        <OutlinedInput
                            id="Tag"
                            name="Tag"
                            type="Tag"
                            autoComplete="Tag"
                            required
                            size="small"
                        />
                    </FormControl>

                    <FormControl
                    sx={{ paddingBottom:'20px'}}
                    >
                        <Button variant="contained" fullWidth="false"
                         sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                        >Add Income</Button>
                    </FormControl>
                </FormGrid>











               
              
            </Box>
        </Modal>

    )
}

export default AddIncomeModal
