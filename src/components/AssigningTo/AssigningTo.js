import React from "react";
import { Space, Select, Button } from "antd";
import useStore from "../../services/store";
import FulfillmentCard from "../FulfillmentCard/FulfillmentCard";

import "./AssigningTo.scss";

const { Option } = Select;

const AssigningTo = () => {
  const setFilterFields = useStore(({ setFilterFields }) => setFilterFields);
  const roleOffers = useStore(({ roleOffers }) => roleOffers);

  function handleChange(value) {
    setFilterFields([
      {
        id: Math.random() * 100,
        default: false,
        field: "name",
        operator: "=",
        value: "Jane",
        logical: "and",
      },
      {
        id: Math.random() * 100,
        default: false,
        field: "age",
        operator: ">",
        value: "6",
        logical: "and",
      },
    ]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ width: "100%" }}>
      <Space direction="horizontal" className="assignin-to-component card">
        <Space direction="vertical">
          <form
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <Select
              defaultValue="Functional Area"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
            >
              <Option default disabled>
                Functional Area
              </Option>
              {roleOffers.map((el) => (
                <Option key={el.functionalArea.id} value={el.functionalArea.id}>
                  {el.functionalArea.name}
                </Option>
              ))}
            </Select>

            <Select
              defaultValue="Role - Job Title"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
            >
              <Option default disabled>
                Role - Job Title
              </Option>
              {roleOffers.map((el) => (
                <Option key={el.jobTitle.id} value={el.jobTitle.id}>
                  {el.jobTitle.name}
                </Option>
              ))}
            </Select>

            <Select
              defaultValue="Venue"
              showSearch
              optionFilterProp="children"
              onChange={handleChange}
            >
              <Option default disabled>
                Venue
              </Option>
              {roleOffers.map((el) => (
                <Option key={el.venue.id} value={el.venue.id}>
                  {el.venue.name}
                </Option>
              ))}
            </Select>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </form>
        </Space>

        <FulfillmentCard title="Role" value="90" percent="90" />
        <FulfillmentCard title="Waitlist" value="80" percent="80" />
      </Space>
    </div>
  );
};

export default AssigningTo;
