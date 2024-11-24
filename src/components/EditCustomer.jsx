import { useState } from "react"
import { updateCustomer } from "../personalapi";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function EditCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        updateCustomer(props.data._links.customer.href, customer)
            .then(() => props.handleFetch())
            .catch(err => console.error(err))
    }

    return (

        <>
            <Button size="small" variant="contained" onClick={handleClickOpen}>Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Customer</DialogTitle>
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
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}