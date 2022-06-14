import { Col, Row, Space } from "antd";
import FilterWrapper from "../../../components/FilterWrapper/FilterWrapper";
import LoadFilterTemplate from "../../LoadFilterTemplate/LoadFilterTemplate";
import ROFilterWrapper from "../../ROFilterWrapper";

function Filters() {
  return (
    <div className="modal-filters">
      <Row gutter={24} align='top'>
        <Col span={12} className="filter-column">
          <Space align='top'>
            <LoadFilterTemplate /> 
            <p>Volunteer Filters</p>
          </Space>
          <FilterWrapper />
        </Col>
        <Col span={12} className="filter-column">
          <p>Role Offer Filters</p>
          <ROFilterWrapper isRoleOffer={true} />
        </Col>
      </Row>
    </div>
  );
}

export default Filters;
