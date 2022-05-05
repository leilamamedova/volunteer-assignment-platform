import React from 'react';
import GenderChart from '../../components/Charts/components/GenderChart/GenderChart';
import NationalityChart from '../../components/Charts/components/NationalityChart/NationalityChart';
import AssignmentNumberChart from '../../components/Charts/components/AssignmentNumberChart/AssignmentNumberChart';
import './Dashboard.scss';

const Dashboard =  () => {
    return (
        <>
            <GenderChart/>       
            <NationalityChart/> 
            <AssignmentNumberChart/>
        </>
    )
};

export default Dashboard;