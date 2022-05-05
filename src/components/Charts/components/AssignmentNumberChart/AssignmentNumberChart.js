import React from 'react';
import { Card, Space } from 'antd';
import AnalysisImg from '../../../../assets/img/analysis.png';
import './AssignmentNumberChart.scss';

const AssignmentNumberChart = () => {
    return (
        <Card className='assignment-number-card'>
            <Space direction='horizontal'>
                <img src={AnalysisImg}/>
                <Space direction='vertical'>
                    <h1 className='perfect bold'>44.2%</h1>
                    <h5>Assignment Number - <span>1290</span></h5>
                </Space>
            </Space>            
        </Card>
    );
};

export default AssignmentNumberChart;