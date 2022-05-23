import { useEffect, useState } from "react";
import { Select, Input, Space, Tag } from "antd";
import { DeleteFilled } from "@ant-design/icons";
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
  const usersDataFields = useStore(({ usersDataFields }) => usersDataFields);
  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const [requirements, setRequirements] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tagsArray, setTagsArray] = useState(props.value);
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
  }, [requirements]);

  const handleChange = (value) => {
    setInputValue(value.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTagsArray((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };
  const handleClose = (index) => {
    tagsArray.splice(index, 1);
    setTagsArray(tagsArray);
    // setTagsArray(list);
  };

  useEffect(() => {
    props.handleChange(props.id, tagsArray);
  }, [tagsArray]);
  return (
    <div className="flex">
      <Select
        showSearch
        optionFilterProp="children"
        className="selectWidth"
        defaultValue={props.requirement}
        loading={dataLoading}
        onSelect={(e) => props.handleSelect(e, props.id, "requirement_name")}
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
      <div className="tag-box">
        {tagsArray.map((el, index) => (
          <Tag
            key={index}
            closable
            color="#2db7f5"
            onClose={() => handleClose(index)}
          >
            {el}
          </Tag>
        ))}
      </div>
      <Input
        className="inputWidth"
        placeholder="value"
        value={inputValue}
        name="value"
        onKeyUp={handleEnter}
        onChange={handleChange}
      />

      <Space>
        <DeleteFilled
          style={{ color: "red", fontSize: "1.5rem" }}
          onClick={() => props.handleDelete(props.id)}
        />
      </Space>
    </div>
  );
}

export default FilterField;
