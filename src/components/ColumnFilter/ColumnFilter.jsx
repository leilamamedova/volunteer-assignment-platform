import { useState, useEffect } from "react";
import { Button, Select, Divider } from "antd";
import "./ColumnFilter.scss";

const { Option } = Select;

function ColumnFilter({ columns, handleColumns }) {
  const [plainOptions, setPlainOptions] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState([]);

  useEffect(() => {
    columns.slice(4).map((el) => {
      !plainOptions.includes(el.title) && setPlainOptions(prev => [...prev, el.title]);
    });
  }, [columns])

  useEffect(() => {
    checkedOptions.length === 0 && handleChange(plainOptions);
  }, [checkedOptions])

  const onChange = (list) => {
    setCheckedOptions(list);
    handleChange(list);
  };
  const resetAll = () => {
    setCheckedOptions([]);
    handleChange(plainOptions);
  };
  const handleChange = (value) => {
    handleColumns([...new Set(['Details', 'candidate id', 'status', ...value])]);
  };

  return (
    <div className="column--list-wrapper">
      <Select
        mode="multiple"
        placeholder='Find columns'
        showSearch
        optionFilterProp="children"
        onChange={onChange}
        value={checkedOptions}
        dropdownRender={(menu) => (
          <>
          {menu}   
          <Divider
              style={{
              margin: '8px 0',
              }}
          />  
          <Button 
            style={{
              margin: '0 0 6px 8px',
            }}
            type='primary'
            onClick={resetAll}
          >Reset</Button>           
          </>
        )}
      >
        {plainOptions.length>0 && plainOptions.map((el, index) => (
          <Option key={index} value={el}>
            {el}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default ColumnFilter;
