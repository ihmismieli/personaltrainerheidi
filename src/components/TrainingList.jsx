import { useEffect, useState } from "react"
import { deleteTraining, getCustomers, getTrainings } from "../personalapi";
import { AgGridReact } from "ag-grid-react";
import dayjs from 'dayjs';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Typography } from "@mui/material";
import AddTraining from "./AddTraining";


export default function TrainingList() {

    const [trainings, setTrainings] = useState([]);

    const [trainingToDelete, setTrainingToDelete] = useState(null);

    const [open, setOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [colDefs, setColDefs] = useState([
        {
            field: "date", filter: true, width: 200,
            valueFormatter: (params) => {
                return params.value ? dayjs(params.value).format('DD.MM.YYYY HH:mm') : '';
            }
        },
        { field: "duration", filter: true, width: 150 },
        { field: "activity", filter: true },
        {
            field: "customer", filter: true,
            valueFormatter: (params) => `${params.value.firstname} ${params.value.lastname}`
            
        },
        {
            cellRenderer: params => <Button variant="contained" size="small" color="error" onClick={() => handleDelete(params.data)}>Delete</Button>

        }
    ])

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getTrainings()
            .then((data) => {
                //käytetään map -funktiota hakemaan tiedot jokaiselle harjoitukselle
                return Promise.all(
                    data._embedded.trainings.map((training) => {
                        return fetch(training._links.customer.href)
                            .then((response) => response.json())
                            .then((customer) => {
                                // liitetään asiakastiedot training objektin sisälle
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

    const handleDelete = (training) => {
        setTrainingToDelete(training);
        setOpenDialog(true);
    }

    const handleConfirmDelete = () => {
        if (trainingToDelete) {
            deleteTraining(trainingToDelete._links.self.href)
                .then(() => {
                    handleFetch();
                    setOpen(true);
                })
                .catch(err => console.error(err));
        }
        handleCloseDialog();
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTrainingToDelete(null);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <AddTraining handleFetch={handleFetch} />
            <Typography variant="h5" style={{ margin: 10 }}>Trainings</Typography>
            <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    {trainingToDelete && (
                        <DialogContentText>
                            Are you sure you want to delete this training?<br></br>
                            <span style={{fontWeight: "bold"}}>
                                {dayjs(trainingToDelete.date).format("DD.MM.YYYY HH:mm")}{" "}
                                {trainingToDelete.customer.firstname} {trainingToDelete.customer.lastname} {trainingToDelete.duration} min {trainingToDelete.activity}
                            </span>
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Training deleted successfully!"
            />
        </>
    )
}