import React, { useEffect, useState } from "react";
import { Button, Space, Table, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditRequirementsModal from "./components/EditRequirementsModal/EditRequirementsModal";
import useStore from "../../services/store";
import "./FunctionAndRequirementsTable.scss";
import { getColumnSearchProps } from "../UsersTable/ColumnSearch/ColumnSearch";
import ListModal from "../ListModal/ListModal";

const FunctionAndRequirementsTable = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isReqModalVisible, setIsReqEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const roleOffers = useStore(({roleOffers})=>roleOffers);
  const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);
  const setFilterFields = useStore(({setFilterFields})=>setFilterFields);
  const filterFields = useStore((state) => state.filterFields);

  const dummy = [
    {
      entity: {name: 'Q22', id: 1, functionalArea: {name: 'Fa', id: 2, jobTitle: {name: 'Job', id: 3, venue: {name: 'Venue', id: 4, headcount: {name: 51, id:5} }}} }
    },
    {
      entity: {name: 'Q22', id: 1, functionalArea: {name: 'Fa', id: 2, jobTitle: {name: 'Job', id: 3, venue: {name: 'Venue', id: 4, headcount: {name: 51, id:6} }}} }
    },
  ]

  useEffect(() => {
    const newRO = dummy.map((offer) => {
      const requirements = functionalRequirements.find(el => el.id === offer.entity.functionalArea.jobTitle.venue.headcount.id).requirements;
      return{
        key: offer.entity.functionalArea.jobTitle.venue.headcount.id,
        entity: offer.entity.name,
        venue: offer.entity.functionalArea.jobTitle.venue.name,
        functionalArea:  offer.entity.functionalArea.name,
        jobTitle: offer.entity.functionalArea.jobTitle.name,
        functional_requirements: requirements.length,
        headcount: <InputNumber defaultValue={offer.entity.functionalArea.jobTitle.venue.headcount.name} onChange={handleHeadcount}/>
  }}) 
      setData(newRO)
  }, [roleOffers, functionalRequirements])

  const handleHeadcount = (value) => {
    console.log(value);
  }

  const handleEditModal = (key) => {
    const el = functionalRequirements.find(el => el.id === key).requirements;
    setFilterFields(el)
    setSelectedRow(key);
    setIsEditModalVisible(true)
  }

  const handleReqModal = (key) => {
    const el = functionalRequirements.find(el => el.id === key).requirements;
    setFilterFields(el)
    setIsReqEditModalVisible(true)
  }

  const columns = [
    {
      title: "Entity",
      dataIndex: "entity",
      ...getColumnSearchProps('entity')
    },
    {
      title: "Functional Area",
      dataIndex: "functionalArea",
      ...getColumnSearchProps('functionalArea')
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      ...getColumnSearchProps('jobTitle')
    },
    {
      title: "Venue",
      dataIndex: "venue",
      ...getColumnSearchProps('venue')
    },
    {
      title: "Headcount",
      dataIndex: "headcount",      
    },
    {
      title: "Functional Requirements",
      dataIndex: "functional_requirements",
      render: (data, record) => <a onClick={() => handleReqModal(record.key)}>  {data}... </a>,
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
      <ListModal 
        isModalVisible={isReqModalVisible} 
        setIsModalVisible={setIsReqEditModalVisible} 
        list={filterFields}
      />
      <EditRequirementsModal 
        isEditModalVisible={isEditModalVisible} 
        setIsEditModalVisible={setIsEditModalVisible}
        selectedRow = {selectedRow}
      />
    </>
  );
};

export default FunctionAndRequirementsTable;
