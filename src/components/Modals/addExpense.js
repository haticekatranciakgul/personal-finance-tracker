import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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


function AddExpenseModal({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish,

}) {

    const [tag, setTag] = React.useState('');
    const [formValues, setFormValues] = useState({
        name: '',
        amount: '',
        date: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleDateChange = (newValue) => {
        setFormValues({
            ...formValues,
            date: newValue,
        });
    };

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleSubmit = () => {
        onFinish({ ...formValues, tag }, "expense");
        setFormValues({ name: '', amount: '', date: null });
        setTag('');
        handleExpenseCancel();
    };
    return (
        <Modal
            open={isExpenseModalVisible}
            onCancel={handleExpenseCancel}
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
                <Typography variant="h5" id="modal-modal-description" sx={{ mt: 2, color: 'text.secondary' }}>
                    Add Expense
                </Typography>

                <FormGrid size={{ xs: 12, md: 6 }} >
                    <FormControl sx={{ paddingY: '20px' }}>
                        <FormLabel htmlFor="name" required>
                            Name
                        </FormLabel>
                        <OutlinedInput
                            id="name"
                            name="name"
                            type="text"
                            required
                            size="small"
                            value={formValues.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl sx={{ paddingBottom: '20px' }}>
                        <FormLabel htmlFor="amount" required>
                            Amount
                        </FormLabel>
                        <OutlinedInput
                            id="amount"
                            name="amount"
                            type="number"
                            required
                            size="small"
                            value={formValues.amount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl sx={{ paddingBottom: '20px' }}>
                        <FormLabel htmlFor="date" required>
                            Date
                        </FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select Date"
                                value={formValues.date}
                                onChange={handleDateChange}
                                slotProps={{ textField: { size: "small", fullWidth: true } }} // renderInput yerine textField slot'u eklendi
                                />
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl sx={{ paddingBottom: '20px' }}>
                        <FormLabel htmlFor="tag" required>
                            Tag
                        </FormLabel>
                        <Select
                            id="tag"
                            value={tag}
                            onChange={handleTagChange}
                            size="small"
                        >
                            <MenuItem value="food">Food</MenuItem>
                            <MenuItem value="education">Education</MenuItem>
                            <MenuItem value="office">Office</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ paddingBottom: '20px' }}>
                        <Button variant="contained" onClick={handleSubmit} sx={{ width: { xs: '100%', sm: 'fit-content' } }}>
                            Add Expense
                        </Button>
                    </FormControl>
                </FormGrid>
            </Box>
        </Modal>

    )
}

export default AddExpenseModal
