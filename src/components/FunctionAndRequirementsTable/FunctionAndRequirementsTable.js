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
  const [data, setData] = useState([]);

  const roleOffers = useStore(({roleOffers})=>roleOffers);
  const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);
  const setFunctionalRequirements = useStore(({setFunctionalRequirements})=>setFunctionalRequirements);

  // Dummy data
  useEffect(() => {
    setFunctionalRequirements([
      {
        requirement: 'Age',
        operator: '>',
        value: 19
      }
    ])
  }, [])

  useEffect(() => {
    roleOffers.map((offer, index) => {
      setData((prev) => [...prev,
        {
          key: offer.id,
          entity: 'Q22',
          venue: offer.functionalArea.jobTitle.venue.name,
          functionalArea: offer.functionalArea.name,
          jobTitle: offer.functionalArea.jobTitle.name,
          functional_requirements: functionalRequirements,
          headcount: <InputNumber defaultValue={offer.headcount} onChange={handleHeadcount}/>
        }
      ])
    })
  }, [roleOffers])

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
      title: "Functional Area",
      dataIndex: "functionalArea",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
    },
    {
      title: "Venue",
      dataIndex: "venue",
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
