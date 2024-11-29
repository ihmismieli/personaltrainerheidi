import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { getCustomersForTraining } from '../personalapi';
import { duration } from '@mui/material';

export default function Calendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getCustomersForTraining()
            .then(data => {
                const calendarEvents = data.map(training => ({
                    title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
                    start: training.date,
                    end: calculateEndDate(training.date, training.duration),
                    extendedProps: {
                        activity: training.activity,  
                        customer: `${training.customer.firstname} ${training.customer.lastname}`,  
                    },
                }));
                setEvents(calendarEvents);
            })
            .catch(err => console.error("Error fetching trainings: ", err));

    }, []);

    const calculateEndDate = (startDate, duration) => {
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + duration);
        return endDate.toISOString();
    }


    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                events={events}
                editable={true}
                droppable={true}
                eventClick={(info) => {
                    alert(`Training: ${info.event.extendedProps.activity}, Customer: ${info.event.extendedProps.customer}`);
                }}
                headerToolbar={{
                    left: "prev next today",
                    center: "title",
                    right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek", 
                }}
            />
        </>
    );
};
