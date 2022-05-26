import React, { useState } from 'react';
import { Table, Progress } from 'antd';

const FaRoleVenueStatistics = () => {
    const columns = [
        {
          title: 'FA',
          dataIndex: 'fa',
          key: 'fa',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Venue',
            dataIndex: 'venue',
            key: 'venue',
        },
        {
            title: 'Fullfilment ',
            dataIndex: 'fullfilment ',
            key: 'fullfilment ',
            render: () => (
                <>
                 <Progress percent={30} status="active" />            
                </>
            )
        },    
        {
            title: 'Demand',
            dataIndex: 'demand',
            key: 'demand',
        },
        {
            title: 'Pre Assigned',
            dataIndex: 'preassigned',
            key: 'preassigned',
        },
        {
            title: 'Assigned',
            dataIndex: 'assigned',
            key: 'assigned',
        },
        {
            title: 'Pending',
            dataIndex: 'pending',
            key: 'pending',
        },
        {
            title: 'Accepted',
            dataIndex: 'accepted',
            key: 'accepted',
        },
        {
            title: 'Waitlist Fullfilment',
            dataIndex: 'waitlistfullfilment',
            key: 'waitlistfullfilment',
            render: () => (
                <>
                 <Progress percent={50} status="active" />            
                </>
            )
        },    
        {
            title: 'Waitlist Demand',
            dataIndex: 'waitlistdemand',
            key: 'waitlistdemand',
        },    
        {
            title: 'Waitlist Assigned',
            dataIndex: 'waitlistassigned',
            key: 'waitlistassigned',
        },   
        {
            title: 'Waitlist Offered',
            dataIndex: 'waitlistoffered',
            key: 'waitlistoffered',
        },  
        {
            title: 'Waitlist Accepted',
            dataIndex: 'waitlistaccepted',
            key: 'waitlistaccepted',
        },    
    ];

    const data = [
        {key: 1},
        {key: 2},
        {key: 3}
    ]

    return (
        <>
            <div className='card statistics'>
                <Table 
                    pagination={false} 
                    columns={columns} 
                    dataSource={data} 
                    scroll={{x: 2000}}
                />  
            </div>
        </>
    );
};

export default FaRoleVenueStatistics;