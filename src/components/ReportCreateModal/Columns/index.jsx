import { useState, useEffect } from "react";
import { Row, Col, Select } from "antd";

const { Option } = Select;
function Columns() {
  const [userFields, setUserFields] = useState([]);
  return (
    <Row className="w-100">
      <Col span={12}>
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
        >
          <Option value="1">Hello Word</Option>
          <Option value="2">Hello Mars</Option>
          <Option value="3">Hello Jupi</Option>
          <Option value="4">Hello Nept</Option>
          <Option value="5">Hello Pluto</Option>
        </Select>
      </Col>
      <Col span={12}>Right</Col>
    </Row>
  );
}

export default Columns;
