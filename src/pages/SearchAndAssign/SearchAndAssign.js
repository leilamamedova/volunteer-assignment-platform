import { Space, Row, Col } from "antd";
import React from "react";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import AssigningTo from "../../components/AssigningTo/AssigningTo";
import AssignSearchResult from "../../components/AssignSearchResult/AssignSearchResult";
import VolunteerProfile from "../../components/VolunteerProfile/VolunteerProfile";
import "./SearchAndAssign.scss";

const SearchAndAssign = () => {
  return (
    <div className="search-and-assign">
      <Space direction="horizontal" align="top">
        <Row gutter={15} wrap={true} justify="space-between">
          <Col xs={24} md={12} lg={11}>
            <FilterWrapper />
          </Col>

          <Col xs={24} md={12} lg={13}>
            <Space direction="vertical" className="search-and-assign-filters">
              <AssigningTo />
              <AssignSearchResult />
            </Space>
          </Col>
        </Row>
      </Space>
      <VolunteerProfile />
    </div>
  );
};

export default SearchAndAssign;
