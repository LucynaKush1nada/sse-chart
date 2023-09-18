import * as React from 'react';
import './App.css';

import Chart from './Chart';
import ClickButtonChart from './ClickButtonChart';

const App = () => {
  const [dataChart, setDataChart] = React.useState<string>("a");

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Stock prices of a and b</h1>
      <Chart data={ () => dataChart }/>
      <ClickButtonChart caption="Display A Price" indFilter='a' setDataChartClick={() => setDataChart('a')}/>
      <ClickButtonChart caption="Display B Price" indFilter='b' setDataChartClick={() => setDataChart('b')}/>
      <ClickButtonChart caption="Display both Price's" indFilter='both' setDataChartClick={() => setDataChart('both')}/>
    </div>
  )
}

export default App;
