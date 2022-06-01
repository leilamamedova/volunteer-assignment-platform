import { Space, Spin, Table  } from 'antd';
import React, { useEffect, useState } from 'react';
import { HistoryFetch } from '../../../../services/fetch';
import useStore from '../../../../services/store';

const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Role offer ID',
      dataIndex: 'role_offer',
      key: 'role_offer',
    },
  ];

const History = ({userID}) => {
    const [historyData, setHistoryData] = useState([]); 
    const history = useStore(({history}) => history);   
    const setHistory = useStore(({setHistory}) => setHistory);   
    const setDataLoading = useStore(({setDataLoading}) => setDataLoading);   
    const dataLoading = useStore(({dataLoading}) => dataLoading); 

    useEffect(() => {
        HistoryFetch(setHistory, setDataLoading, userID);
    }, [userID])

    useEffect(() => {
        console.log('history', history);
        const historyObject = history.map((item, index) => {
            return {
                key: index,
                status: item.status,
                date: item.created_at.replaceAll('T', ' ').substring(0, 19),
                role_offer: item.role_offer_id
            }
        });
        setHistoryData(historyObject);
    }, [history])

    return (
        <Space
            direction="vertical"
            size="large"
            className="overflow-y--auto volunteer--card"
        >
            <Table 
                columns={columns} 
                dataSource={historyData}
                loading={dataLoading} 
                pagination={false}
                scroll={{y: 1200}}
            />
        </Space>    
    );
};

export default History;