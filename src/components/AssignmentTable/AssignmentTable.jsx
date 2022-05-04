import { useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import VolunteerProfile from "../VolunteerProfile/VolunteerProfile";
import AssignmentModal from "./AssignmentModal/AssignmentModal";
import "./AssignmentTable.scss";
const { Link } = Typography;

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    status: "assigned",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    status: "assigned",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "waitlist",
  },
  {
    key: "4",
    name: "Joe Doe",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "waitlist",
  },
  {
    key: "5",
    name: "Jane Doe",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "waitlist",
  },
  {
    key: "6",
    name: "Simon Fitzel",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "assigned",
  },
  {
    key: "7",
    name: "Richard Brown",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "waitlist",
  },
  {
    key: "8",
    name: "Susan Liol",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    status: "assigned",
  },
];

const AssignSearchResult = () => {
  const [isVolunteerModalVisible, setIsVolunteerModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  //Later id will fetch the active modal data.
  const showVolunteerModal = (id) => {
    setIsVolunteerModalVisible(true);
  };
  const showStatusModal = (id, status) => {
    setIsStatusModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, field) => (
        <Link onClick={() => showVolunteerModal(field.id)}>{field.name}</Link>
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
      title: "Status",
      key: "status",
      render: (_, field) => (
        <Space className="action-icons" align="baseline">
          <p>{field.status}</p>
          <Button
            icon={<EditOutlined />}
            onClick={() => showStatusModal(field.id, field.status)}
          />
        </Space>
      ),
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
        isModalVisible={isVolunteerModalVisible}
        setIsVolunteerModalVisible={setIsVolunteerModalVisible}
      />
      <AssignmentModal
        isModalVisible={isStatusModalVisible}
        setIsStatusModalVisible={setIsStatusModalVisible}
      />
    </>
  );
};

export default AssignSearchResult;
