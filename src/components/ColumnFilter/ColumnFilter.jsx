import { useState, useEffect } from "react";
import { Checkbox, Button } from "antd";
import "./ColumnFilter.scss";

function ColumnFilter({ columns, handleColumns }) {
  const [plainOptions, setPlainOptions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    columns.map((el) => !plainOptions.includes(el.title) && setPlainOptions(prev => [...prev, el.title]));
  }, [columns])

  //Listens for Checbox.Group component changes
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    handleChange(list);
  };
  //Listens for the Check/Uncheck
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    handleChange([]);
  };

  const handleChange = (value) => {
    handleColumns(value);
  };

  const handleClick = () => {
    setToggle((prev) => !prev);
  };
  const reset = () => {
    setCheckedList([]);
    setIndeterminate(false);
    setCheckAll(false);
    handleChange([]);
  };
  return (
    <div className="column--list-wrapper">
      <Button className="mb-20" type="primary" onClick={handleClick}>
        {toggle ? "Hide" : "Filter Columns"}
      </Button>
      {toggle ? (
        <>
          <Checkbox
            className="ml-20"
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check All
          </Checkbox>
          <Button className="ml-20" type="primary" onClick={reset}>
            Reset
          </Button>
        </>
      ) : (
        ""
      )}

      <Checkbox.Group
        className={toggle ? "column--list" : "hide"}
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </div>
  );
}

export default ColumnFilter;
