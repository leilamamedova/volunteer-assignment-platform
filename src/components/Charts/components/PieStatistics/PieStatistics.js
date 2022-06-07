import React, { useEffect, useState } from 'react';
import {PieChart} from "../../Charts";
import './PieStatistics.scss';

const PieStatistics = ({title, label, data}) => {
    const [labels, setLabels] = useState(['']);

    useEffect(() => {
      data[0] === 0 && data[1] === 0 ? setLabels(['No data']) : setLabels(label);
    }, [data])

    const dataSet = {
      labels: labels,
      datasets: [
        {
          label: "Users Gained",
          data: data,
          backgroundColor: [
            "#2EB4E6",
            "#F58216",
          ],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    }
    
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    };

    return (
        <div className='gender-chart'>
            <PieChart chartData={dataSet} options={options} />
        </div>        
    );
};

export default PieStatistics;