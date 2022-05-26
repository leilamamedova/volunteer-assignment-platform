import React, { useState } from 'react';
import {PieChart} from "../../Charts";
import './PieStatistics.scss';

const UserData = [
    {
      id: 1,
      year: 'male',
      userGain: 1
    },
    {
      id: 2,
      year: 'female',
      userGain: 5
    },
  ];

const PieStatistics = ({title, data}) => {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "#2EB4E6",
              "#E54A58",
            ],
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      });

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
            <PieChart chartData={userData} options={options} />
        </div>        
    );
};

export default PieStatistics;