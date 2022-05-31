import { Space } from "antd";
import FilterWrapper from "../../../components/FilterWrapper/FilterWrapper";
import LoadFilterTemplate from "../../LoadFilterTemplate/LoadFilterTemplate";
import ROFilterWrapper from "../../ROFilterWrapper";

function Filters() {
  return (
    <div className="modal-filters">
      <Space size={"large"}>
        <div className="filter-column">
          <Space>
            {" "}
            <LoadFilterTemplate /> <p>Volunteer Filters</p>
          </Space>
          <FilterWrapper />
        </div>
        <div className="filter-column">
          <p>Role Offer Filters</p>
          <ROFilterWrapper isRoleOffer={true} />
        </div>
      </Space>
    </div>
  );
}

export default Filters;
