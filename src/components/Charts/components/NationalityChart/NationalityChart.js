import React from 'react';
import { VerticalBarChart } from '../../Charts';

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Nationality Chart',
      },
    },
};

const labels = ['Indian', 'American', 'European', 'Japanese', 'Others'];

const data = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

const NationalityChart = () => {
    return (
        <div>
            <VerticalBarChart data={data} options={options}/>            
        </div>
    );
};

export default NationalityChart;