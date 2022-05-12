import { useState } from "react";
import { Col, Row, Table, Typography } from "antd";
import VolunteerProfile from "../VolunteerProfile/VolunteerProfile";
import "./AssignSearchResult.scss";
import AssignButton from "../StatusChangeActions/AssignButton";
import WaitlistButton from "../StatusChangeActions/WaitlistButton";
const { Link } = Typography;

const AssignSearchResult = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, field) => (
        <Link onClick={() => showModal()}>{field.name}</Link>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
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

  //Updating Store on Selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
<<<<<<< HEAD
      setSelectedUsers(selectedRowKeys);
=======
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRowKeys
      );
>>>>>>> 1a98932ce207b1cd4334ad0f5c7c2a5a6433b906
    },
  };

  return (
    <>
      <div className="assign-search-result">
        <Row justify="end" gutter={16}>
          <Col>
<<<<<<< HEAD
            <AssignButton users={selectedUsers} />
          </Col>
          <Col>
            <WaitlistButton users={selectedUsers} />
=======
            <Button type="primary">Assign</Button>
          </Col>
          <Col>
            <Button type="danger">Waitlist</Button>
>>>>>>> 1a98932ce207b1cd4334ad0f5c7c2a5a6433b906
          </Col>
        </Row>

        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={columns}
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
