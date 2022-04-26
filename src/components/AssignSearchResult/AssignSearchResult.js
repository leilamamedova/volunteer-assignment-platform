import React  from 'react';
import { Button, Space, Table, Tooltip  } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './AssignSearchResult.scss';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: <a>Assign all</a>,
        key: 'assign',
        render: () => (
            <Space className='action-icons'>
                <Tooltip title="Assign">
                    <Button icon={<CheckCircleOutlined />}/>
                </Tooltip>
            </Space>
        ),
    },
    {
        title: <a>Deassign all</a>,
        key: 'deassign',
        render: () => (
            <Space className='action-icons'>
                <Tooltip title="Deassign">
                    <Button icon={<CloseCircleOutlined />}/>
                </Tooltip>
            </Space>
        ),
    },
];

const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
]; 
  
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

const AssignSearchResult = () => {
  return (
    <div className='assign-search-result'>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default AssignSearchResult;