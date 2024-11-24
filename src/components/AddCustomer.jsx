import { useState } from "react"
import { saveCustomer } from "../personalapi";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function AddCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        saveCustomer(customer)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error(err))
    }

    return (

        <>
            <Button variant="outlined" onClick={handleClickOpen} style={{ marginBottom: 10 }}>Add Customer</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent>
                <TextField 
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange={event => setCustomer({...customer, firstname: event.target.value})}
                    label="First name"
                    fullWidth
                    variant="standard"
                />
                <TextField 
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange={event => setCustomer({...customer, lastname: event.target.value})}
                    label="Last name"
                    fullWidth
                    variant="standard"
                />
                <TextField 
                    margin="dense"
                    name="streetaddress"
                    value={customer.streetaddress}
                    onChange={event => setCustomer({...customer, streetaddress: event.target.value})}
                    label="Street address"
                    fullWidth
                    variant="standard"
                />
                <TextField 
                    margin="dense"
                    name="postcode"
                    value={customer.postcode}
                    onChange={event => setCustomer({...customer, postcode: event.target.value})}
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                <TextField 
                    margin="dense"
                    name="city"
                    value={customer.city}
                    onChange={event => setCustomer({...customer, city: event.target.value})}
                    label="City"
                    fullWidth
                    variant="standard"
                />
                <TextField 
                    margin="dense"
                    name="email"
                    value={customer.email}
                    onChange={event => setCustomer({...customer, email: event.target.value})}
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField 
                    margin="dense"
                    name="phone"
                    value={customer.phone}
                    onChange={event => setCustomer({...customer, phone: event.target.value})}
                    label="Phone"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </>
    )
};