import { useEffect, useState } from 'react';
import { getCustomers } from '../personalApi';
import { AgGridReact } from 'ag-grid-react';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Typography } from '@mui/material';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const [colDefs, setColDefs] = useState([
        { headerName: "First name",field: "firstname", filter: true, width: 150},
        { headerName: "Last name",field: "lastname", filter: true, width: 150},
        { headerName: "Street address",field: "streetaddress", filter: true},
        { field: "postcode", filter: true, width: 150},
        { field: "city", filter: true, width: 150},
        { field: "email", filter: true},
        { field: "phone", filter: true, width: 150}
    ]);


    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error))
    }

    return (
        <>
            <Typography variant="h5" style={{margin: 10}}>Customers</Typography>
            <div className='ag-theme-material' style={{height: 500}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}