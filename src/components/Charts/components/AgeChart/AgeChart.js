import React from 'react';
import { Chart } from '../../Charts';

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Age range',
    },
  },
};

const labels = ['18-24', '25-35', '35-44'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 100)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const AgeChart = () => {
    return (
        <div>
            <Chart data={data} options={options}/>            
        </div>
    );
};

export default AgeChart;