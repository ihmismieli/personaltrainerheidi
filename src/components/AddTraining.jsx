import { useEffect, useState } from "react";
import { getCustomersForTraining, saveTraining } from "../personalapi";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function AddTraining(props) {

    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: ""
    });


    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomersForTraining()
            .then(data => {
                setCustomers(data);
            })
            .catch(error => {
                console.error("Error fetching customer: " + error)
            });
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        console.log("Saving training:", training);
        saveTraining(training)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.log(err))
    }

    return (

        <>
            <Button variant="outlined" onClick={handleClickOpen} style={{ marginBottom: 10 }}>Add Training</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ mt: 2, width: '100%' }}>
                            <DateTimePicker
                                label="Select training date"
                                value={dayjs(training.date)}
                                onChange={(date) => setTraining({ ...training, date: date })}
                                style={{ marginTop: 20 }}
                            />
                        </Box>
                    </LocalizationProvider>
                    <Select
                        value={training.customer}
                        onChange={(event) =>
                            setTraining({ ...training, customer: event.target.value })}
                        displayEmpty

                        style={{ marginTop: 10 }}
                    >
                        <MenuItem value="" disabled>Select customer</MenuItem>
                        {customers.map((customer) => (
                            <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={event => setTraining({ ...training, duration: event.target.value })}
                        label="Duration (min)"
                        fullWidth
                        variant="standard"
                        style={{ marginTop: 10 }}
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={event => setTraining({ ...training, activity: event.target.value })}
                        label="Activity"
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: 10 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}