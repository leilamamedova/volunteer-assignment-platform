import React from 'react';
import GenderChart from '../../components/Charts/components/GenderChart/GenderChart';
import NationalityChart from '../../components/Charts/components/NationalityChart/NationalityChart';
import './Dashboard.scss';

const Dashboard =  () => {
    return (
        <>
            <GenderChart/>       
            <NationalityChart/> 
        </>
    )
};

export default Dashboard;