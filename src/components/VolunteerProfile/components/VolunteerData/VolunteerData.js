import { Space, Image } from 'antd';
import React from 'react';
import useStore from '../../../../services/store';

const VolunteerData = ({userID}) => {
    const usersData = useStore(({usersData}) => usersData);  

    return (
        <Space
            direction="vertical"
            size="large"
            className="overflow-y--auto volunteer--card"
        >
            {
                typeof usersData.find(data => data.candidate_id === userID) !== 'undefined' && Object.entries(usersData.find(data => data.candidate_id === userID)).map((item, index) => (
                    <div key={index} className='fs-lg'>
                        <span>{item[0].replaceAll('_', ' ')}</span>                           
                        <span> : </span> 
                        <span className="bold">{item[1]}</span>
                    </div>
                )) 
            }
        </Space>    
    );
};

export default VolunteerData;