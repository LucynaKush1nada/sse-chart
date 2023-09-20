import * as React from 'react';
import './App.css';

import { fetchEventSource } from "@microsoft/fetch-event-source";

import IData from './IData';

import Chart from './Chart';
import ClickButtonChart from './ClickButtonChart';

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

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Stock prices of a and b</h1>
      <Chart data={data} />
      <ClickButtonChart caption="Display A Price" indFilter='a' onChangeFilter={() => setFilter('a')} />
      <ClickButtonChart caption="Display B Price" indFilter='b' onChangeFilter={() => setFilter('b')} />
      <ClickButtonChart caption="Display both Price's" indFilter='both' onChangeFilter={() => setFilter('both')} />
    </div>
  )
}

export default App;
