import { Row, Col, Space } from "antd";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import AssigningTo from "../../components/AssigningTo/AssigningTo";
import AssignSearchResult from "../../components/AssignSearchResult/AssignSearchResult";
import VolunteerProfile from "../../components/VolunteerProfile/VolunteerProfile";
import "./SearchAndAssign.scss";
import LoadFilterTemplate from "../../components/LoadFilterTemplate/LoadFilterTemplate";
import BulkImport from "../../components/BulkImport/BulkImport";

const SearchAndAssign = () => {
  return (
    <div className="search-and-assign">
      <Row justify="space-between">
        <Col>
          <LoadFilterTemplate />
        </Col>

        <Col>
          <BulkImport title={'Users'}/>
        </Col>
      </Row>
      <Row gutter={15} wrap={true} justify="space-between">
        <Col xs={24} md={12} lg={11}>
          <FilterWrapper seeResultBtn={true} />
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
