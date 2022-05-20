import { useEffect, useState } from "react";
import { Select, Input, Space } from "antd";
import {
  PlusCircleTwoTone,
  DeleteFilled,
  MinusCircleOutlined,
} from "@ant-design/icons";
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
  const usersData = useStore(({ usersData }) => usersData);
  const [requirements, setRequirements] = useState([]);
  const [orInput, setOrInput] = useState(false);

  const usersDataFields = useStore(({ usersDataFields }) => usersDataFields);
  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);

  useEffect(() => {
    usersData.length > 0 &&
      usersDataFields.map((item, index) => {
        setRequirements((prev) => [
          ...prev,
          {
            id: index,
            value: item,
          },
        ]);
      });
  }, [usersData]);

  useEffect(() => {
    requirements.length > 0 ? setDataLoading(false) : setDataLoading(true);
  }, [requirements])

  const handleInputAddition = () => {
    setOrInput(true);
  };
  const handleInputRemoval = () => {
    props.handleOrInputRemoval("value", props.id);
    setOrInput(false);
  };
  return (
    <div className="flex">
      <Select
        showSearch
        optionFilterProp="children"
        className="selectWidth"
        defaultValue={props.requirement}
        loading={dataLoading}
        onSelect={(e) => props.handleSelect(e, props.id, "requirement")}
      >
        <Option value={props.requirement}>{props.requirement}</Option>
        {requirements.map((el) => (
          <Option key={el.id} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      <Select
        className="selectWidthOperator"
        defaultValue={props.operator}
        onSelect={(e) => props.handleSelect(e, props.id, "operator")}
      >
        <Option value={props.operator}>{props.operator}</Option>
        {operator.map((el) => (
          <Option key={el.id} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      <Input
        className="inputWidth"
        placeholder="value"
        value={props.value[0]}
        name="value"
        onChange={(e) => props.handleChange(e, props.id, 0)}
      />
      {orInput ? (
        <Input
          className="inputWidth"
          placeholder="value"
          value={props.value[1]}
          name="value"
          onChange={(e) => props.handleChange(e, props.id, 1)}
        />
      ) : (
        ""
      )}
      <Space>
        {orInput ? (
          <MinusCircleOutlined
            style={{ fontSize: "1.5rem" }}
            onClick={() => handleInputRemoval()}
          />
        ) : (
          <PlusCircleTwoTone
            style={{ fontSize: "1.5rem" }}
            onClick={() => handleInputAddition()}
          />
        )}
        <DeleteFilled
          style={{ color: "red", fontSize: "1.5rem" }}
          onClick={() => props.handleDelete(props.id)}
        />
      </Space>
    </div>
  );
}

export default FilterField;
