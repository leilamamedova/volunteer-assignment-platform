import { useState } from "react";
import { Col, Row, Table, Typography, Space, Button } from "antd";
import VolunteerProfile from "../VolunteerProfile/VolunteerProfile";
import "./AssignSearchResult.scss";
import AssignButton from "../StatusChangeActions/AssignButton";
import WaitlistButton from "../StatusChangeActions/WaitlistButton";
import ColumnFilter from "../ColumnFilter/ColumnFilter";
const { Link } = Typography;

const AssignSearchResult = () => {
  const columns = [
    {
      id: 1,
      title: "Name",
      dataIndex: "name",
      render: (_, field) => (
        <Link onClick={() => showModal()}>{field.name}</Link>
      ),
    },
    {
      id: 2,
      title: "Age",
      dataIndex: "age",
    },
    {
      id: 3,
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Joe Doe",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "5",
      name: "Jane Doe",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "6",
      name: "Simon Fitzel",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "7",
      name: "Richard Brown",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "8",
      name: "Susan Liol",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tableColumns, setTableColumns] = useState(columns);

  const showModal = () => {
    setIsModalVisible(true);
  };

  //Updating Store on Selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedUsers(selectedRowKeys);
    },
  };

  const handleColumns = (value) => {
    const result = [];
    if (value.length === 0) {
      setTableColumns(columns);
    } else {
      for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (columns[i].title === value[j]) {
            result.push(columns[i]);
          }
        }
      }
      setTableColumns(result);
    }
  };

  const handleReset = () => {
    setTableColumns(columns);
  };

  return (
    <>
      <div className="assign-search-result">
        <Row justify="space-between" gutter={16}>
          <Col>
            <Space align="stretch">
              <ColumnFilter columns={columns} handleColumns={handleColumns} />
              <Button type="primary" onClick={handleReset}>
                Reset
              </Button>
            </Space>
          </Col>
          <Col>
            <Space>
              <AssignButton users={selectedUsers} />
              <WaitlistButton users={selectedUsers} />
            </Space>
          </Col>
        </Row>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={tableColumns}
          dataSource={data}
        />
      </div>
      <VolunteerProfile
        isModalVisible={isModalVisible}
        setIsVolunteerModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default AssignSearchResult;
