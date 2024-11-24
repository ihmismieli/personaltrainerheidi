import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert } from "@mui/material";
import { useState } from "react";

export default function DeleteCustomer({ data, deleteCustomer, handleFetch }) {

    const [open, setOpen] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);


    const handleOpenSnackbar = () => {
        console.log("Snackbar is being opened");
        setOpenSnackbar(true);
    }
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleDelete = () => {
        deleteCustomer(data._links.self.href)
            .then(() => {
                handleFetch();
                console.log("Delete successful, opening Snackbar...");
                handleOpenSnackbar();
                handleCloseDialog();
            })
            .catch(error => console.error("Error deleting customer: " + error));
    }
    return (
        <>
            <Button size="small" color="error" onClick={handleOpenDialog}>Delete</Button>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {data.firstname} {data.lastname}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                Customer deleted successfully!
                </Alert>
            </Snackbar>
        </>
    );
}