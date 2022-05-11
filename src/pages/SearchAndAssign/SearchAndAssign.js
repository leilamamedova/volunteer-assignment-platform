import { Row, Col, Button, Space } from "antd";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import AssigningTo from "../../components/AssigningTo/AssigningTo";
import AssignSearchResult from "../../components/AssignSearchResult/AssignSearchResult";
import VolunteerProfile from "../../components/VolunteerProfile/VolunteerProfile";
import "./SearchAndAssign.scss";
import ResultButton from "../../components/ResultButton/ResultButton";
import LoadFilterTemplate from "../../components/LoadFilterTemplate/LoadFilterTemplate";

const SearchAndAssign = () => {
  return (
    <div className="search-and-assign">
      <Space className="mb-20">
        <LoadFilterTemplate />
        <ResultButton />
      </Space>
      <Row gutter={15} wrap={true} justify="space-between">
        <Col xs={24} md={12} lg={11}>
          <FilterWrapper />
        </Col>

        <Col xs={24} md={12} lg={13}>
          <AssigningTo />
        </Col>
      </Row>

      <AssignSearchResult />
      <VolunteerProfile />
    </div>
  );
};

export default SearchAndAssign;
