import { useEffect, useRef, useState } from 'react';
import { deleteCustomer, getCustomers } from '../personalapi';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
// import DeleteCustomer from './DeleteCustomer';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, Snackbar, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ExportToCsv from './ExportToCSV';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const [customerToDelete, setCustomerToDelete] = useState(null);

    const [open, setOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const gridRef = useRef();

    const [colDefs, setColDefs] = useState([
        { headerName: "First name", field: "firstname", filter: true, width: 150 },
        { headerName: "Last name", field: "lastname", filter: true, width: 150 },
        { headerName: "Street address", field: "streetaddress", filter: true },
        { field: "postcode", filter: true, width: 150 },
        { field: "city", filter: true, width: 150 },
        { field: "email", filter: true },
        { field: "phone", filter: true, width: 150 },
        {
            cellRenderer: params => <EditCustomer data={params.data} handleFetch={handleFetch} />, 
            width: 120,
        },
        {
            cellRenderer: params => (
                <Button
                    variant='contained'
                    size='small'
                    color='error'
                    onClick={() => handleDelete(params.data)}
                >Delete</Button>
            ), 
            width: 140,
        }
    ]);


    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error))
    }

    const handleDelete = (customer) => {
        setCustomerToDelete(customer);
        setOpenDialog(true);
    }

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            deleteCustomer(customerToDelete._links.self.href)
                .then(() => {
                    handleFetch();
                    setOpen(true);
                })
                .catch(error => console.error(error));
        }
        handleCloseDialog();
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCustomerToDelete(null);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {<AddCustomer handleFetch={handleFetch} />}
            <ExportToCsv gridRef={gridRef} />
            <Typography variant="h5" style={{ margin: 10 }}>Customers</Typography>
            <div className='ag-theme-material' style={{ height: 500 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    {customerToDelete && (
                        <Typography>
                            Are you sure you want to delete{' '} 
                            <span style={{ fontWeight: 'bold' }}>
                                 {customerToDelete.firstname} {customerToDelete.lastname}
                            </span> ?
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color='primary'>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color='error'>Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Customer deleted successfully!"
            />

        </>
    );
}