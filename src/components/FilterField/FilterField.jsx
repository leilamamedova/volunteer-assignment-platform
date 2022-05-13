import { Select, Input, Button } from "antd";
import { useEffect, useState } from "react";
import useStore from "../../services/store";
import "./FilterField.scss";
const { Option } = Select;

const operator = [
  {
    id: 1,
    value: "=",
  },
  {
    id: 2,
    value: "contains",
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

function FilterField(props) {
  const usersData = useStore(({usersData}) => usersData);
  const [requirements, setRequirements] = useState([]);
  const usersDataFields = useStore(({usersDataFields}) => usersDataFields);

  useEffect(() => {
    usersData.length>0 && usersDataFields.map((item, index) => {
      setRequirements((prev) => [...prev, 
        {
          id: index,
          value: item,
        }    
      ])
    })    
  }, [usersData])

  return (
    <div className="flex">
      <Select
        showSearch 
        optionFilterProp="children"
        className="selectWidth"
        placeholder='Requirement'
        onSelect={(e) => props.handleSelect(e, props.id, "field")}
      >
        {requirements.map((el) => (
          <Option key={el.id} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      <Select
        className="selectWidthOperator"
        placeholder='Operator'
        onSelect={(e) => props.handleSelect(e, props.id, "operator")}
      >
        {operator.map((el) => (
          <Option key={el.id} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      <Input
        className="inputWidth"
        placeholder="value"
        value={props.value}
        name="value"
        onChange={(e) => props.handleChange(e, props.id)}
      />
      <Button
        type="primary"
        danger
        disabled={props.default}
        onClick={() => props.handleDelete(props.id)}
      >
        Del
      </Button>
    </div>
  );
}

export default FilterField;
