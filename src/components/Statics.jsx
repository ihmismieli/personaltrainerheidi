import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getCustomersForTraining } from "../personalapi";

import _ from "lodash";

export default function Statics(){

const [data, setData] = useState([]);

useEffect(() => {
    getCustomersForTraining()
        .then(trainings => processData(trainings))
        .catch(err => console.error(err));
}, []);

const processData = (trainings) => {
    const grouped = _.groupBy(trainings, "activity");
    const chartData = Object.keys(grouped).map(activity => ({
        activity,
        duration: _.sumBy(grouped[activity], "duration"),
    }));
    setData(chartData);
}

    return(
        
        <>
        <ResponsiveContainer width="100%" height={500}>
            <BarChart  width="100%" height={500} data={data}>
                {/* <CartesianGrid strokeDasharray="2 2" /> */}
                <XAxis dataKey="activity"/>
                <YAxis label={{value: 'Duration (min)', angle: -90, position: 'insideLeft', fill: 'black'}}/>
                <Tooltip />
                <Bar dataKey="duration" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        </>
    )
}