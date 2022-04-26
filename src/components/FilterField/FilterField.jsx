import React from "react";
import { Select, Input } from "antd";
import classes from "./FilterField.module.css";

const { Option } = Select;

const DUMMY_OPTIONS = [
  {
    id: 1,
    value: "name",
  },
  {
    id: 2,
    value: "surname",
  },
  {
    id: 3,
    value: "age",
  },
  {
    id: 4,
    value: "nationality",
  },
  {
    id: 5,
    value: "residence",
  },
];

const DUMMY_COMPARISON = [
  {
    id: 1,
    value: "=",
  },
  {
    id: 2,
    value: "Contains",
  },
  {
    id: 3,
    value: ">",
  },
  {
    id: 4,
    value: "<",
  },
  {
    id: 5,
    value: ">=",
  },
  {
    id: 6,
    value: "<=",
  },
];

function FilterField() {
  return (
    <div className={classes.flex}>
      <div>
        <Select className={classes.selectWidth} defaultValue="Choose a field">
          <Option disabled>Default</Option>
          {DUMMY_OPTIONS.map((el) => (
            <Option key={el.id} value={el.value}>
              {el.value}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Select className={classes.selectWidthComparison} defaultValue="Filter">
          <Option disabled>Default</Option>
          {DUMMY_COMPARISON.map((el) => (
            <Option key={el.id} value={el.value}>
              {el.value}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <Input className={classes.inputWidth} placeholder="value" />
      </div>
    </div>
  );
}

export default FilterField;
