import React, { useState } from 'react';
import { Table, Progress } from 'antd';
import FaRoleVenueModal from './components/FaRoleVenueModal/FaRoleVenueModal';
  
const data = [
    {
      key: '1',
      title: 'Functional Area',
      count: 123
    },
    {
        key: '2',
        title: 'Venue',
        count: 123
    },
    {
        key: '3',
        title: 'Role',
        count: 123
    },
];

const FaRoleVenueStatistics = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => {
        setIsModalVisible(true)
    }

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => <a onClick={handleModal}>{text}</a>,
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Progress ',
            dataIndex: 'progress ',
            key: 'progress ',
            render: () => (
                <>
                 <Progress percent={50} status="active" />            
                </>
            )
        },    
    ];

    return (
        <>
            <div className='card'>
                <Table pagination={false} columns={columns} dataSource={data} />  
            </div>
            <FaRoleVenueModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
        </>
    );
};

export default FaRoleVenueStatistics;