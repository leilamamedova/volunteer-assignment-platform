import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import "./ColumnFilter.scss";
function ColumnFilter({ columns, handleColumns }) {
  const [toggle, setToggle] = useState(false);
  const handleChange = (value) => {
    handleColumns(value);
  };
  const handleClick = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="column--list-wrapper">
      <Button className="mb-20" type="primary" onClick={handleClick}>
        {toggle ? "Hide" : "Filter Columns"}
      </Button>
      <Checkbox.Group
        className={toggle ? "column--list" : "hide"}
        options={columns.map((el) => el.title)}
        onChange={handleChange}
      />
    </div>
  );
}

export default ColumnFilter;
