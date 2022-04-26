import { Select, Input, Button } from "antd";
import "./FilterField.scss";
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

function FilterField(props) {
  return (
    <div className="flex">
      <Select className="selectWidth" defaultValue="Choose a field">
        <Option disabled>Default</Option>
        {DUMMY_OPTIONS.map((el) => (
          <Option key={el.id} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      <Select className="selectWidthComparison" defaultValue="Filter">
        <Option disabled>Default</Option>
        {DUMMY_COMPARISON.map((el) => (
          <Option key={el.id} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      <Input className="inputWidht" placeholder="value" />
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
