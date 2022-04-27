import { useState } from "react";
import { Button, Space, Radio } from "antd";
import "./FilterWrapper.scss";
import FilterField from "../FilterField/FilterField";

function FilterWrapper() {
  // Array to hold ald Filter Fields data.
  const [filterFields, setFilterFields] = useState([
    {
      id: 1,
      default: true,
      field: "default",
      comparison: "default",
      value: "",
      logical: "and",
    },
  ]);

  // Creating a new field
  const handleNewField = () => {
    setFilterFields((prev) => [
      ...prev,
      {
        id: filterFields[filterFields.length - 1] + Math.random() * 100,
        default: false,
        field: "default",
        comparison: "default",
        value: "",
        logical: "and",
      },
    ]);
  };
  // Removing a filter field
  const removeField = (del_id) => {
    const list = [...filterFields];
    list.splice(del_id, 1);
    setFilterFields(list);
  };

  // Submit Logic...
  const handleSubmit = (e) => {
    e.preventDefault();
    //Logic for creating the query will be here...
  };

  // Handling Change events
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...filterFields];
    list[index][name] = value;
    setFilterFields(list);
  };
  // Handling Select events
  const handleSelect = (e, index, name) => {
    const list = [...filterFields];
    list[index][name] = e;
    setFilterFields(list);
  };

  return (
    <>
      <div className={"card flexv "}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Space className="sticky" size="middle">
            <Button type="primary" onClick={handleNewField}>
              Add
            </Button>
            <Button type="primary">Save Search</Button>
            <Button type="primary">Load Search</Button>
            <Button type="primary" htmlType="submit">
              See results
            </Button>
          </Space>
          {filterFields.map((el, index) => (
            <Space
              direction="vertical"
              size="middle"
              key={el.id + "filter"}
              style={{ margin: "15px 0" }}
            >
              {index != 0 ? (
                <Radio.Group
                  name="logical"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={el.logical}
                >
                  <Radio value={"and"}>And</Radio>
                  <Radio value={"or"}>Or</Radio>
                </Radio.Group>
              ) : (
                ""
              )}
              <FilterField
                key={el.id}
                id={index}
                default={el.default}
                comparison={el.comparison}
                field={el.field}
                value={el.value}
                handleSelect={handleSelect}
                handleChange={handleChange}
                handleDelete={removeField}
              />
            </Space>
          ))}
        </form>
      </div>
    </>
  );
}

export default FilterWrapper;
