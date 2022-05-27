import { Row, Col } from "antd";
import FilterWrapper from "../../../components/FilterWrapper/FilterWrapper";
import LoadFilterTemplate from "../../LoadFilterTemplate/LoadFilterTemplate";

function Filters() {
  return (
    <div>
      <LoadFilterTemplate />
      <FilterWrapper />
    </div>
  );
}

export default Filters;
