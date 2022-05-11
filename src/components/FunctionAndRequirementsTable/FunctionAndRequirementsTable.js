import React, { useEffect, useState } from "react";
import { Button, Space, Table, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditRequirementsModal from "./components/EditRequirementsModal/EditRequirementsModal";
import FunctionAndRequirementsModal from "./components/FunctionAndRequirementsModal/FunctionAndRequirementsModal";
import useStore from "../../services/store";
import "./FunctionAndRequirementsTable.scss";

const FunctionAndRequirementsTable = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isReqModalVisible, setIsReqEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);
  const setFunctionalRequirements = useStore(({setFunctionalRequirements})=>setFunctionalRequirements);

  // Dummy data
  useEffect(() => {
    setFunctionalRequirements([
      {
        requirement: 'Age',
        comparison: '>',
        value: 19
      }
    ])
  }, [])

  const handleHeadcount = (value) => {
    console.log(value);
  }

  const handleEditModal = (key) => {
    setSelectedRow(key);
    setIsEditModalVisible(true)
  }

  const handleReqModal = (key) => {
    setSelectedRow(key);
    setIsReqEditModalVisible(true)
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
      render: (tags, record) => (
        <>
         <a onClick={handleReqModal}>           
            {functionalRequirements.length}...
          </a>  
        </>
      ),
    },
    {
      title: 'Action',
      key: "action",
      render: (_, record) => (
          <Space className="action-icons">
              <Button icon={<EditOutlined />} onClick={() =>  handleEditModal(record.key)} />
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
      <FunctionAndRequirementsModal isReqModalVisible={isReqModalVisible} setIsReqEditModalVisible={setIsReqEditModalVisible} functionalRequirements={functionalRequirements}/>
      <EditRequirementsModal isEditModalVisible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible}/>
    </>
  );
};

export default FunctionAndRequirementsTable;
