import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { getCustomersForTraining } from '../personalapi';

export default function Calendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getCustomersForTraining()
            .then(data => {
                const calendarEvents = data.map(training => {
                    const customer = training.customer || {};
                    return {
                        title: `${training.activity} / ${customer.firstname || 'Unknown'} ${customer.lastname || 'Unknown'}`,
                        start: training.date,
                        end: calculateEndDate(training.date, training.duration),
                        display: 'block',
                        extendedProps: {
                            activity: training.activity,
                            customer: `${customer.firstname || 'Unknown'} ${customer.lastname || 'Unknown'}`,
                        },
                    };
                }
                );
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
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
                eventClick={(info) => {
                    alert(`Training: ${info.event.extendedProps.activity}, Customer: ${info.event.extendedProps.customer}`);
                }}
                headerToolbar={{
                    left: "prev next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
            />
        </>
    );
};
