import React, { useState } from 'react';
import { Card } from 'antd';
import {PieChart} from "../../Charts";

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

const GenderChart = () => {
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

    return (
        <div style={{width: 200}} >
            <PieChart chartData={userData} />
        </div>        
    );
};

export default GenderChart;