import * as React from 'react';

import { fetchEventSource } from "@microsoft/fetch-event-source";
import IData from './IData';

const serverBaseURL = "http://localhost:5000";

interface ClickButtonChartProps {
    caption: string;
    setDataChart: (value: string) => void;
}

const ClickButtonChart = ({ caption, setDataChart }: ClickButtonChartProps) => {
    const [data, setData] = React.useState<IData[]>([] as IData[]);
    const [filter, setFilter] = React.useState<string>("a")
    React.useEffect(() => {
        const fetchData = async () => {
            await fetchEventSource(`${serverBaseURL}/sse`, {
                method: "POST",
                headers: {
                    Accept: "text/event-stream",
                    "Content-Type": "application/json"
                },
                onmessage(event) {
                    console.log(event.data);
                    const parsedData = JSON.parse(event.data)
                    setData((data) => [...data, parsedData])
                },
                onclose() {
                    console.log("Connection closed by the server");
                },
                onerror(err) {
                    console.log("There was an error from server", err)
                },
                body: JSON.stringify({
                    filter: filter
                })
            })
        }
        fetchData();
    }, [filter])

    const changeFilter = (fltr: string) => {
        console.log("before:" + filter)
        setFilter(fltr)
        console.log("after:" + filter)
    }

    return (
        <button onClick={() => changeFilter(`${ setDataChart }`)}>{caption}</button>
    )
}

export default ClickButtonChart;