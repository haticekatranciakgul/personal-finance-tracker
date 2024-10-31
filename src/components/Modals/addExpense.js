import React from 'react'
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

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


function AddExpenseModal({
    isExpenseModalVisible,
    handleExpenseCancel,
 
}) {


  return (
      <Modal
            onCancel={handleExpenseCancel}
            open={isExpenseModalVisible}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box sx={style}>
                <IconButton 
                    onClick={handleExpenseCancel}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                   Expense Modal
                </Typography>
            </Box>
        </Modal>
 
  )
}

export default AddExpenseModal
