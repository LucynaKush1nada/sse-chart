import * as React from 'react';

interface ClickButtonChartProps {
    caption: string;
    indFilter: string;
    onChangeFilter: (value: string) => void;
}

const ClickButtonChart = ({ caption, indFilter, onChangeFilter }: ClickButtonChartProps) => {

    const changeFilter = (fltr: string) => {
        console.log(fltr);
        console.log("before:" + fltr);

        onChangeFilter(fltr);
        
        console.log("after:" + fltr);
    }

    return (
        <button onClick={() => changeFilter(`${indFilter}`)}>{caption}</button>
    )
}

export default ClickButtonChart;