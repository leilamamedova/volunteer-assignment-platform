import { useState } from "react";
import { Button, Space, Radio } from "antd";
import "./FilterWrapper.scss";
import FilterField from "../FilterField/FilterField";

function FilterWrapper() {
  const [filterField, setFilterField] = useState([
    {
      id: 1,
      default: true,
    },
  ]);

  const handleNewField = () => {
    setFilterField((prev) => [
      ...prev,
      {
        id: filterField[filterField.length - 1] + Math.random() * 100,
        default: false,
      },
    ]);
  };

  const removeField = (del_id) => {
    setFilterField(filterField.filter((el) => el.id != del_id));
  };
  return (
    <>
      <div className={"card flexv"}>
        <div style={{ width: "100%" }}>
          <Space size="middle">
            <Button type="primary" onClick={handleNewField}>
              Add
            </Button>
            <Button type="primary">Save Search</Button>
            <Button type="primary">Load Search</Button>
            <Button type="primary">See results</Button>
          </Space>
        </div>
        {filterField.map((el) => (
          <>
            <Radio.Group defaultValue="and">
              <Radio value={"and"}>And</Radio>
              <Radio value={"or"}>Or</Radio>
            </Radio.Group>
            <FilterField
              key={el.id}
              id={el.id}
              default={el.default}
              handleDelete={removeField}
            />
          </>
        ))}
      </div>
    </>
  );
}

export default FilterWrapper;
