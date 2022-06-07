import React, { useEffect, useState } from 'react';
import useStore from '../../../../services/store';
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
      position: 'top',
    },
  },
};

const AgeChart = () => {
  const volunteerDemographics = useStore(({ volunteerDemographics }) => volunteerDemographics);
  const [labels, setLabels] = useState([]);
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    const labels = volunteerDemographics.ageRanges.reverse().map(el => `${el.fromAge}-${el.toAge}`);
    labels.unshift(`${volunteerDemographics.startingAges.map(el => el.age)}+`);
    setLabels(labels);

    const data = volunteerDemographics.ageRanges.map(el => el.count);
    data.unshift(volunteerDemographics.startingAges.map(el => el.count)[0]);
    setDataSet(data);
  }, [volunteerDemographics])

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Age range',
        data: dataSet,
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

export default AgeChart;