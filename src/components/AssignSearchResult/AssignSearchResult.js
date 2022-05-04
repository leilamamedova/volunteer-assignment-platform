import { useState } from "react";
import { Button, Space, Table, Tooltip, Typography } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import VolunteerProfile from "../VolunteerProfile/VolunteerProfile";
import "./AssignSearchResult.scss";
const { Link } = Typography;
const AssignSearchResult = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    {
      title: <a>Assign all</a>,
      key: "assign",
      render: () => (
        <Space className="action-icons">
          <Tooltip title="Assign">
            <Button icon={<CheckCircleOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: <a>Deassign all</a>,
      key: "deassign",
      render: () => (
        <Space className="action-icons">
          <Tooltip title="Deassign">
            <Button icon={<CloseCircleOutlined />} />
          </Tooltip>
        </Space>
      ),
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <>
      <div className="assign-search-result">
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
