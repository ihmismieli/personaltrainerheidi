import { useEffect, useState } from "react"
import { getTrainings } from "../personalApi";
import { AgGridReact } from "ag-grid-react";
import dayjs from 'dayjs';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Typography } from "@mui/material";


export default function TrainingList() {

    const [trainings, setTrainings] = useState([]);

    const [colDefs, setColDefs] = useState([
        {
            field: "date", filter: true, width: 200,
            valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm')
        },
        { field: "duration", filter: true, width: 150 },
        { field: "activity", filter: true },
        { field: "customer", filter: true,
            cellRenderer: (params) => {
                return params.data.customer 
                    ? `${params.data.customer.firstname} ${params.data.customer.lastname}`
                    : "";
            }
        },
    ])

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getTrainings()
            .then((data) => {
                //käytetään `map`-funktiota hakemaan tiedot jokaiselle harjoitukselle
                return Promise.all(
                    data._embedded.trainings.map((training) => {
                        return fetch(training._links.customer.href)
                            .then((response) => response.json())
                            .then((customer) => {
                                // liitetään asiakastiedot 'training' objektin sisälle
                                return {
                                    ...training,
                                    customer: {
                                        firstname: customer.firstname,
                                        lastname: customer.lastname
                                    }
                                };
                            });
                    })
                );
            })
            .then((trainingsWithCustomers) => {
                setTrainings(trainingsWithCustomers);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <>
        <Typography variant="h5" style={{margin: 10}}>Trainings</Typography>
            <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </>
    )
}