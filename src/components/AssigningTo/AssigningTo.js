import React from "react";
import { Space, Select, Card } from "antd";
import "./AssigningTo.scss";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const AssigningTo = () => {
  return (
    <div style={{ width: "100%" }}>
      <Space direction="horizontal" className="assignin-to-component card">
        <Space direction="vertical">
          <Select defaultValue="default" onChange={handleChange}>
            <Option value="default">FA</Option>
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
          </Select>

          <Select defaultValue="default" onChange={handleChange}>
            <Option value="default">Role</Option>
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
          </Select>

          <Select defaultValue="default" onChange={handleChange}>
            <Option value="default">Venue</Option>
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
          </Select>
        </Space>

        <Card size="small">
          <p>Role Fulfillment</p>
          <p>90 out of 100</p>
          <p>90%</p>
        </Card>
      </Space>
    </div>
  );
};

export default AssigningTo;
