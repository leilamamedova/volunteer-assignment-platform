import React from 'react';
import { Chart } from '../../Charts';

const options = {
  indexAxis: 'y',
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const AssignmentsChart = ({data}) => {
  return (
      <div className='assignments-chart'>
          <Chart data={data} options={options}/>            
      </div>
  );
};

export default AssignmentsChart;