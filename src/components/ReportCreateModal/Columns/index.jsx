import { useState, useEffect } from "react";
import { Row, Col, Select } from "antd";
import useStore from "../../../services/store";
import SelectedColumns from "./SelectedColumns";

const { Option } = Select;
function Columns() {
  const [userFields, setUserFields] = useState([]);
  const [values, setValues] = useState([]);
  const selectedColumns = useStore(({ reportColumns }) => reportColumns);
  const setSelectedColumns = useStore(
    ({ setReportColumns }) => setReportColumns
  );

  useEffect(() => {
    setValues(selectedColumns);
  }, [selectedColumns]);
  const handleChange = (columns) => {
    setSelectedColumns(columns);
  };
  return (
    <Row className="w-100">
      <Col span={12} className="text-center">
        <Select
          style={{ width: "300px" }}
          mode="multiple"
          allowClear
          showSearch
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onChange={handleChange}
          value={values}
        >
          <Option value="Hello Word">Hello Word</Option>
          <Option value="Hello Mars">Hello Mars</Option>
          <Option value="Hello Jupi">Hello Jupi</Option>
          <Option value="Hello Nept">Hello Nept</Option>
          <Option value="Hello Pluto">Hello Pluto</Option>
        </Select>
      </Col>
      <Col span={12} className="text-center">
        <SelectedColumns />
      </Col>
    </Row>
  );
}

export default Columns;
