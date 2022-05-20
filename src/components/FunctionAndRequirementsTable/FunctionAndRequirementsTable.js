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
  const [headcount, setHeadcount] = useState(null);

  const roleOffers = useStore(({roleOffers})=>roleOffers);
  const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);
  const setFilterFields = useStore(({setFilterFields})=>setFilterFields);
  const filterFields = useStore((state) => state.filterFields);

  useEffect(() => { 
    setData([])
    roleOffers.map((offer) => {
      offer.functionalAreas.map(fa => {
        fa.jobTitles.map(job => {
          job.venues.map(venue => {             
              setData(prev => [...prev,
                { 
                  key: venue.roleOffer.id,
                  id: venue.roleOffer.id,
                  functionalAreaType: offer.name,
                  functionalAreaCode: fa.code,
                  functionalArea: fa.name,
                  jobTitleCode: job.code,
                  jobTitle: job.name,
                  locationCode: venue.code,
                  location: venue.name,
                  totalDemand: venue.roleOffer.totalDemand
                }
              ])            
            }
          )
        })
      })
    })
  }, [roleOffers]) 

  const handleEditModal = (key, headcount) => {
    // const el = functionalRequirements.find(el => el.id === key).requirements;
    setFilterFields(functionalRequirements[0].requirements) //dummy
    setHeadcount(headcount);
    setSelectedRow(key);
    setIsEditModalVisible(true)
  }

  const handleReqModal = (key) => {
    // const el = functionalRequirements.find(el => el.id === key).requirements;
    setFilterFields(functionalRequirements[0].requirements) //dummy
    setIsReqEditModalVisible(true)
  }

  const columns = [
    {
      title: "Role Offer - ID",
      dataIndex: "id",
      ...getColumnSearchProps('id')
    },
    {
      title: "Functional Area Type",
      dataIndex: "functionalAreaType",
      ...getColumnSearchProps('functionalAreaType')
    },
    {
      title: "Functional Area Code",
      dataIndex: "functionalAreaCode",
      ...getColumnSearchProps('functionalArea')
    },
    {
      title: "Functional Area",
      dataIndex: "functionalArea",
      ...getColumnSearchProps('functionalArea')
    },
    {
      title: "Job Title Code",
      dataIndex: "jobTitleCode",
      ...getColumnSearchProps('jobTitleCode')
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      ...getColumnSearchProps('jobTitle')
    },
    {
      title: "Location Code",
      dataIndex: "locationCode",
      ...getColumnSearchProps('locationCode')
    },
    {
      title: "Location",
      dataIndex: "location",
      ...getColumnSearchProps('location')
    },
    {
      title: "Total Demand",
      dataIndex: "totalDemand",
      ...getColumnSearchProps('totalDemand')
    },
    {
      title: "Functional Requirements",
      dataIndex: "functional_requirements",
      fixed: 'right',
      render: (data, record) => <a onClick={() => handleReqModal(record.key)}>  See all... </a>,
    },
    {
      title: 'Action',
      key: "action",
      fixed: 'right',
      render: (_, record) => (
          <Space className="action-icons">
              <Button icon={<EditOutlined />} onClick={() =>  handleEditModal(record.key, record.totalDemand)} />
          </Space>
      ),
    },
  ];

  return (
    <>
      <div className="function-and-requirements-table">
        <Table
          scroll={{x: 100}}
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
        headcount = {headcount}
      />
    </>
  );
};

export default FunctionAndRequirementsTable;
