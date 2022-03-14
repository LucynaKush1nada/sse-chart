import * as React from 'react';
import './App.css';

import { fetchEventSource } from "@microsoft/fetch-event-source";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import IData from './IData';

const serverBaseURL = "http://localhost:5000";

const App = () => {
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
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Stock prices of a and b</h1>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[20, 26]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="aTechStockPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="bTechStockPrice" stroke="#82ca9d" />
      </LineChart>
      <button onClick={() => changeFilter("a")}>Display A Price</button>
      <button onClick={() => changeFilter("b")}>Display B Price</button>
      <button onClick={() => changeFilter("both")}>Display both Price's</button>
    </div>
  )
}

export default App;
