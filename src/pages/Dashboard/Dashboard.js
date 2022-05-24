import React, { useEffect } from "react";
import GenderChart from "../../components/Charts/components/GenderChart/GenderChart";
import NationalityChart from "../../components/Charts/components/NationalityChart/NationalityChart";
import AssignmentNumberCard from "../../components/AssignmentNumberCard/AssignmentNumberCard";
import FaRoleVenueStatistics from "../../components/FaRoleVenueStatistics/FaRoleVenueStatistics";
import { Col, Row } from "antd";
import useStore from "../../services/store";
import {
  UsersFieldsFetch,
} from "../../services/fetch";
import "./Dashboard.scss";

const Dashboard = () => {
  const setUsersDataFields = useStore(({ setUsersDataFields }) => setUsersDataFields);

  useEffect(() => {
    UsersFieldsFetch(setUsersDataFields);    
  }, []);

  return (
    <div className="dashboard">
      <Row justify="center" gutter={30}>
        <Col span={8}>
          <AssignmentNumberCard />
        </Col>

        <Col span={8}>
          <AssignmentNumberCard />
        </Col>

        <Col span={8}>
          <AssignmentNumberCard />
        </Col>
      </Row>

      <Row justify="center" align="middle" gutter={30}>
        <Col span={16}>
          <NationalityChart />
        </Col>

        <Col span={8}>
          <GenderChart />
        </Col>
      </Row>

      <FaRoleVenueStatistics />
    </div>
  );
};

export default Dashboard;
