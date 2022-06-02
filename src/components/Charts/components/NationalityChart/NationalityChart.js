import React from 'react';
import useStore from '../../../../services/store';
import { Chart } from '../../Charts';
import { countries } from '../../../../data/countries';

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
};

const NationalityChart = () => {
  const volunteerDemographics = useStore(({ volunteerDemographics }) => volunteerDemographics);

  const data = {
      labels: volunteerDemographics.countryNameDtos.map(el => countries[el.name]),
      datasets: [
        {
          label: 'Top 10 Nationalities',
          data: volunteerDemographics.countryNameDtos.map(el => el.count),
          borderColor: 'black',
          backgroundColor: '#2EB4E6',
          borderWidth: 1,
        },
      ],
  };

  return (
      <div>
          <Chart data={data} options={options}/>            
      </div>
  );
};

export default NationalityChart;