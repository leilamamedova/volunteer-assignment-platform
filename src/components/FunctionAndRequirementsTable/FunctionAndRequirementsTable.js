import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditRequirementsModal from "./components/EditRequirementsModal/EditRequirementsModal";
import useStore from "../../services/store";
import { getColumnSearchProps } from "../UsersTable/ColumnSearch/ColumnSearch";
import ListModal from "../ListModal/ListModal";
import "./FunctionAndRequirementsTable.scss";

const FunctionAndRequirementsTable = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isReqModalVisible, setIsReqEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [headcount, setHeadcount] = useState(null);
  const [levelOfConfidence, setLevelOfConfidence] = useState(null);
  const [waitlistFulfillment, setWaitlistFulfillment] = useState(null);
  const [disableAction, setDisableAction] = useState(true);
  const [defaultFilters, setDefeaultFilters] = useState([]);
  const roleOffers = useStore(({ roleOffers }) => roleOffers);
  const functionalRequirements = useStore(
    ({ functionalRequirements }) => functionalRequirements
  );
  const setFunctionalRequirements = useStore(
    ({ setFunctionalRequirements }) => setFunctionalRequirements
  );

  const setFilterFields = useStore(({ setFilterFields }) => setFilterFields);
  const filterFields = useStore((state) => state.filterFields);
  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const systemRole = useStore(({ systemRole }) => systemRole);

  useEffect(() => {
    setData([]);
    roleOffers.map((offer) => {
      offer.functionalAreas.map((fa) => {
        fa.jobTitles.map((job) => {
          job.locations.map((venue) => {
            venue.roleOffer.role_offer_id !== null &&
            setData((prev) => [
              ...prev,
              {
                key: venue.roleOffer.id,
                roleId: venue.roleOffer.role_offer_id,
                functionalAreaType: offer.name,
                functionalAreaCode: fa.code,
                functionalArea: fa.name,
                jobTitleCode: job.code,
                jobTitle: job.name,
                locationCode: venue.code,
                location: venue.name,
                totalDemand: venue.roleOffer.totalDemand,
                levelOfConfidence: venue.roleOffer.level_of_confidence,
                waitlistDemand: venue.roleOffer.waitlist_demand,
                assigneeDemand: venue.roleOffer.assignee_demand,
              },
            ]);
            setFunctionalRequirements({
              id: venue.roleOffer.functionalRequirement.id,
              key: venue.roleOffer.id,
              requirements: venue.roleOffer.functionalRequirement.requirements,
            });
          });
        });
      });
    });

    roleOffers.length > 0 ? setDataLoading(false) : setDataLoading(true);
  }, [roleOffers]);

  useEffect(() => {
    systemRole.some((el) => el === "Admin")
      ? setDisableAction(false)
      : setDisableAction(true);
  }, [systemRole]);

  const handleEditModal = (record) => {
    const el = functionalRequirements.find((el) => el.key === record.key);
    const originalEl = JSON.parse(JSON.stringify(el));
    setFilterFields(originalEl.requirements);
    const dublicateEl = JSON.parse(JSON.stringify(el));
    setDefeaultFilters(dublicateEl.requirements);
    setHeadcount(record.totalDemand);
    setLevelOfConfidence(record.levelOfConfidence);
    setWaitlistFulfillment(record.waitlistDemand);
    setSelectedRow(record.key);
    setIsEditModalVisible(true);
  };
  const handleReqModal = (key) => {
    const el = functionalRequirements.find((el) => el.key === key).requirements;
    setFilterFields(el);
    setIsReqEditModalVisible(true);
  };

  const columns = [
    {
      title: "Role Offer - ID",
      dataIndex: "roleId",
      ...getColumnSearchProps("roleId"),
    },
    {
      title: "Functional Area Type",
      dataIndex: "functionalAreaType",
      ...getColumnSearchProps("functionalAreaType"),
    },
    {
      title: "Functional Area Code",
      dataIndex: "functionalAreaCode",
      ...getColumnSearchProps("functionalArea"),
    },
    {
      title: "Functional Area",
      dataIndex: "functionalArea",
      ...getColumnSearchProps("functionalArea"),
    },
    {
      title: "Job Title Code",
      dataIndex: "jobTitleCode",
      ...getColumnSearchProps("jobTitleCode"),
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      ...getColumnSearchProps("jobTitle"),
    },
    {
      title: "Location Code",
      dataIndex: "locationCode",
      ...getColumnSearchProps("locationCode"),
    },
    {
      title: "Location",
      dataIndex: "location",
      ...getColumnSearchProps("location"),
    },
    {
      title: "Total Demand",
      dataIndex: "totalDemand",
      ...getColumnSearchProps("totalDemand"),
    },
    {
      title: "Level of Confidence",
      dataIndex: "levelOfConfidence",
    },
    {
      title: "Assignee Demand",
      dataIndex: "assigneeDemand",
    },
    {
      title: "Waitlist Demand",
      dataIndex: "waitlistDemand",
    },
    {
      title: "Functional Requirements",
      dataIndex: "functional_requirements",
      fixed: "right",
      render: (data, record) => (
        <a onClick={() => handleReqModal(record.key)}> See all... </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space className="action-icons">
          <Button
            icon={<EditOutlined />}
            disabled={disableAction}
            onClick={() => handleEditModal(record)}
            type="link"
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="function-and-requirements-table">
        <Table
          scroll={{ x: 1500, y: 500 }}
          columns={columns}
          dataSource={data}
          loading={dataLoading}
          pagination={{
            defaultPageSize: 100,
          }}
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
        selectedRow={selectedRow}
        headcount={headcount}
        levelOfConfidence={levelOfConfidence}
        waitlistFulfillment={waitlistFulfillment}
        defaultRequirements={defaultFilters}
      />
    </>
  );
};

export default FunctionAndRequirementsTable;
