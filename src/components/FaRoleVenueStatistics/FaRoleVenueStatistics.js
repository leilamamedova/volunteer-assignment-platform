import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import useStore from '../../services/store';

const FaRoleVenueStatistics = () => {
    const overallAssignments = useStore(({ overallAssignments }) => overallAssignments);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        console.log("overallAssignments", overallAssignments);
        if(overallAssignments.length > 0) {
            const data = overallAssignments.map(el => {
                return {
                    key: el.key,
                    role_id: el.role_offer_id,
                    entity: el.functionalAreaType.name,
                    fa: el.functionalArea.name,
                    role: el.jobTitle.name,
                    venue: el.location.name,
                    fulfilment: el.roleOfferFulfillment,
                    demand: el.assigneeDemand,
                    preassigned: el.preAssigned,
                    assigned: el.assigned,
                    pending: el.pending,
                    accepted: el.accepted,
                    waitlistfulfilment: el.waitlistFulfillment,
                    waitlistdemand: el.waitlistDemand,
                    waitlistassigned: el.waitlistAssigned,
                    waitlistoffered: el.waitlistOffered,
                    waitlistaccepted: el.waitlistAccepted,
                }
            });
            setDataSource(data);
        }else{
            setDataSource([]);
        }
    }, [overallAssignments])

    const columns = [
        {
            title: 'Role Offer Id',
            dataIndex: 'role_id',
            key: 'role_id',
        },
        {
            title: 'Entity',
            dataIndex: 'entity',
            key: 'entity',
        },
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
            title: 'Fulfilment',
            dataIndex: 'fulfilment',
            key: 'fulfilment',
            render: (data) => (<span>{data}%</span>)
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
            title: 'Waitlist Fulfilment',
            dataIndex: 'waitlistfulfilment',
            key: 'waitlistfulfilment',
            render: (data) => (<span>{data}%</span>)
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

    return (
        <>
            {overallAssignments.length>0 ? null: <p style={{color: 'red'}}>*Select filters</p> }
            <div className='card statistics'>
                <Table 
                    pagination={false} 
                    columns={columns} 
                    dataSource={dataSource} 
                    scroll={{x: 2000, y: 500}}
                />  
            </div>
        </>
    );
};

export default FaRoleVenueStatistics;