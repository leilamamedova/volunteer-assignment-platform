import { Col, Row, Space } from "antd";
import { useEffect } from "react";
import FilterWrapper from "../../../components/FilterWrapper/FilterWrapper";
import useStore from "../../../services/store";
import ROFilterWrapper from "../../ROFilterWrapper";
import "./index.scss";
function Filters() {
  const setFilterFields = useStore((state) => state.setFilterFields);
  const setROFilterFields = useStore((state) => state.setROFilterFields);

  useEffect(() => {
    setFilterFields([]);
    setROFilterFields([]);
  }, []);
  return (
    <div className="modal-filters">
      <Row gutter={24} align="top">
        <Col span={12} className="filter-column">
          <Space align="top">
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
