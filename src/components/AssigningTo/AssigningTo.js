import React from "react";
import { Space, Select } from "antd";
import useStore from "../../services/store";
import FulfillmentCard from "../FulfillmentCard/FulfillmentCard";

import "./AssigningTo.scss";

const { Option } = Select;

const AssigningTo = () => {
  const setFilterRequirements = useStore(
    ({ setFilterRequirements }) => setFilterRequirements
  );

  function handleChange(value) {
    console.log("value changed");
    setFilterRequirements([
      {
        id: Math.random() * 100,
        default: false,
        field: "name",
        comparison: "=",
        value: "Jane",
        logical: "and",
      },
      {
        id: Math.random() * 100,
        default: false,
        field: "age",
        comparison: ">",
        value: "6",
        logical: "and",
      },
    ]);
  }

  return (
    <div style={{ width: "100%" }}>
      <Space direction="horizontal" className="assignin-to-component card">
        <Space direction="vertical">
          <Select 
            defaultValue="FA" 
            showSearch 
            optionFilterProp="children" 
            onChange={handleChange}
          >
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
          </Select>

          <Select 
            defaultValue="Role" 
            showSearch 
            optionFilterProp="children" 
            onChange={handleChange}
          >
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
          </Select>

          <Select 
            defaultValue="Venue" 
            showSearch 
            optionFilterProp="children" 
            onChange={handleChange}
          >
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
          </Select>
        </Space>

        <FulfillmentCard title='Role' value='90' percent='90'/>
        <FulfillmentCard title='Waitlist' value='80' percent='80'/>
        
      </Space>
    </div>
  );
};

export default AssigningTo;
