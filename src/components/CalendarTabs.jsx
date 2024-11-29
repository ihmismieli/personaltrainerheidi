import { TabPanel, Tabs } from "react-tabs";
import Calendar from "./Calendar";

export default function CalendarTabs() {

    return (
        <>
        <Tabs>
            <TabPanel>
                <Calendar initialView="dayGridWeek" />
            </TabPanel>
            <TabPanel>
                <Calendar initialView="dayGridMonth" />
            </TabPanel>
            <TabPanel>
                <Calendar initialView="timeGridDay" />
            </TabPanel>
        </Tabs>
        </>
    )
}