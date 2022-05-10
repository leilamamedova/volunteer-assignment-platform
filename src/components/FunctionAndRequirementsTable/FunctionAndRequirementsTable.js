import React, { useState } from "react";
import { Button, Space, Table, Tag, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";
import FunctionAndRequirementsModal from "./components/FunctionAndRequirementsModal/FunctionAndRequirementsModal";
import useStore from "../../services/store";
import "./FunctionAndRequirementsTable.scss";

const FunctionAndRequirementsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);

  const handleHeadcount = (value) => {
    console.log(value);
  }

  const handleModal = (key) => {
    console.log(key);
    setSelectedRow(key);
    setIsModalVisible(true)
  }

  const columns = [
    {
      title: "Entity",
      dataIndex: "entity",
    },
    {
      title: "Venue",
      dataIndex: "venue",
    },
    {
      title: "Functional Area",
      dataIndex: "functional_area",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Headcount",
      dataIndex: "headcount",
    },
    {
      title: "Functional Requirements",
      dataIndex: "functional_requirements",
      width: 300,
      render: (tags, record) => (
        <>
         <Tag>
            Test
          </Tag>  
        </>
      ),
    },
    {
      title: 'Action',
      key: "action",
      render: (_, record) => (
          <Space className="action-icons">
              <Button icon={<EditOutlined />} onClick={() =>  handleModal(record.key)} />
          </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: "1",
      entity: 'Q22',
      venue: "Lorem Ipsum",
      functional_area: 'Lorem Ipsum',
      role: "Lorem Ipsum",
      functional_requirements: functionalRequirements,
      headcount: <InputNumber defaultValue={3} onChange={handleHeadcount}/>
    },
    {
      key: "2",
      entity: 'Q22',
      venue: "Lorem Ipsum",
      functional_area: 'Lorem Ipsum',
      role: "Lorem Ipsum",
      functional_requirements: functionalRequirements,
      headcount: <InputNumber defaultValue={3}/>
    },
    {
      key: "3",
      entity: 'Q22',
      venue: "Lorem Ipsum",
      functional_area: 'Lorem Ipsum',
      role: "Lorem Ipsum",
      functional_requirements: functionalRequirements,
      headcount: <InputNumber defaultValue={3}/>
    },
  ];

  return (
    <>
      <div className="function-and-requirements-table">
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
      <FunctionAndRequirementsModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} selectedRow={selectedRow}/>
    </>
  );
};

export default FunctionAndRequirementsTable;
