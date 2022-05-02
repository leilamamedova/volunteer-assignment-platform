import React, { useState } from "react";
import { Button, Space, Table, Tag, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";
import FunctionAndRequirementsModal from "./components/FunctionAndRequirementsModal/FunctionAndRequirementsModal";
import "./FunctionAndRequirementsTable.scss";

const FunctionAndRequirementsTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleHeadcount = (value) => {
    console.log(value);
  }

  const handleModal = (key) => {
    console.log(key);
    setIsModalVisible(true)
  }

  const columns = [
    {
      title: "Venue",
      dataIndex: "venue",
    },
    {
      title: "Functional Area",
      dataIndex: "functional_area",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
    },
    {
      title: "Headcount",
      dataIndex: "headcount",
    },
    {
      title: "Functional Requirements",
      dataIndex: "functional_requirements",
      render: tags => (
        <>
          {tags.map(tag => {
            return (
              <Tag key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
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
      venue: "Lorem Ipsum",
      functional_area: 'Lorem Ipsum',
      job_title: "Lorem Ipsum",
      functional_requirements: ['Lorem', 'Ipsum'],
      headcount: <InputNumber defaultValue={3} onChange={handleHeadcount}/>
    },
    {
      key: "2",
      venue: "Lorem Ipsum",
      functional_area: 'Lorem Ipsum',
      job_title: "Lorem Ipsum",
      functional_requirements: ['Lorem', 'Ipsum'],
      headcount: <InputNumber defaultValue={3}/>
    },
    {
      key: "3",
      venue: "Lorem Ipsum",
      functional_area: 'Lorem Ipsum',
      job_title: "Lorem Ipsum",
      functional_requirements: ['Lorem', 'Ipsum'],
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
      <FunctionAndRequirementsModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  );
};

export default FunctionAndRequirementsTable;
