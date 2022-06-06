import { useEffect, useState } from "react";
import { Select, Input, Space, Tag, DatePicker } from "antd";
import moment from "moment";
import { DeleteFilled } from "@ant-design/icons";
import useStore from "../../services/store";
import "./FilterField.scss";
const { Option } = Select;

const operator = [
  {
    id: 1,
    value: "contains",
  },
  {
    id: 2,
    value: "not equal",
  },
  {
    id: 3,
    value: "equal",
  },
  {
    id: 4,
    value: ">",
  },
  {
    id: 5,
    value: "<",
  },
  {
    id: 6,
    value: ">=",
  },
  {
    id: 7,
    value: "<=",
  },
];
const dateFormat = "YYYY-MM-DD";
const ROLE_OFFER_DATA = ["Entity", "Functional_Area", "Job_Title", "Location"];

function FilterField(props) {
  const usersDataFields = useStore(({ usersDataFields }) => usersDataFields);
  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const NewUsersDataFields = useStore(
    ({ NewUsersDataFields }) => NewUsersDataFields
  );

  const [requirements, setRequirements] = useState([]);
  const [tagsArray, setTagsArray] = useState(props.value);

  const [newUserFieldsArray, setNewUserFieldsArray] = useState([]);
  const [enumOptions, setEnumOptions] = useState([]);
  const [isDateTime, setDateTime] = useState(false);
  const [isSelectEnum, setSelectEnum] = useState(false);
  const [isInput, setIsInput] = useState(true);

  useEffect(() => {
    setTagsArray(props.value);
  }, [props]);

  useEffect(() => {
    if (props.isRoleOffer) {
      ROLE_OFFER_DATA.map((item, index) => {
        setRequirements((prev) => [
          ...prev,
          {
            id: index,
            value: item,
          },
        ]);
      });
    } else {
      usersDataFields.map((item, index) => {
        setRequirements((prev) => [
          ...prev,
          {
            id: index,
            value: item,
          },
        ]);
      });
    }
  }, [usersDataFields]);

  useEffect(() => {
    requirements.length > 0 ? setDataLoading(false) : setDataLoading(true);
  }, [requirements]);
  useEffect(() => {
    console.log("------------------");
    console.log(NewUsersDataFields);
    console.log("------------------");
    console.log("CONVERTED");
    const arr = Object.entries(NewUsersDataFields);
    setNewUserFieldsArray(arr);
  }, [NewUsersDataFields]);
  const handleChange = (value) => {
    setTagsArray(value);
  };

  const handleFieldSelect = (e) => {
    let selectedObject;
    newUserFieldsArray.forEach((el) =>
      el[0] === e ? (selectedObject = el) : ""
    );
    if (selectedObject[1].type === "input") {
      setIsInput(true);
      setSelectEnum(false);
      setDateTime(false);
    }
    if (selectedObject[1].type === "select") {
      setEnumOptions(selectedObject[1].value_options);
      setSelectEnum(true);
      setIsInput(false);
      setDateTime(false);
    }
    if (selectedObject[1].value_type === "date") {
      setDateTime(true);
      setIsInput(false);
      setSelectEnum(false);
    }
    props.handleSelect(e, props.id, "requirement_name");
  };
  const handleEnumChange = (value) => {
    props.handleChange(props.id, value);
  };
  const handleDateTime = (e) => {
    const formatted_value = moment(e).format(dateFormat);
    props.handleChange(props.id, [formatted_value]);
  };

  useEffect(() => {
    props.handleChange(props.id, tagsArray);
  }, [tagsArray]);

  return (
    <div className="filter-field">
      <Select
        showSearch
        optionFilterProp="children"
        className="selectWidth"
        defaultValue={props.requirement}
        value={props.requirement}
        loading={dataLoading}
        onSelect={handleFieldSelect}
      >
        <Option value={props.requirement}>{props.requirement}</Option>
        {requirements.map((el, index) => (
          <Option key={index} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      <Select
        className="selectWidthOperator"
        defaultValue={props.operator}
        value={props.operator}
        onSelect={(e) => props.handleSelect(e, props.id, "operator")}
      >
        <Option value={props.operator}>{props.operator}</Option>
        {operator.map((el) => (
          <Option key={el.id} value={el.value}>
            {el.value}
          </Option>
        ))}
      </Select>
      {/* <div className="tag-box">
        {tagsArray.length > 0 &&
          tagsArray.map((el, index) => (
            <Tag
              key={index}
              closable
              color="#2db7f5"
              onClose={() => handleClose(index)}
            >
              {el}
            </Tag>
          ))}
      </div> */}
      {isInput ? (
        <Select
          mode="tags"
          allowClear
          style={{
            width: "140px",
            height: "52px",
          }}
          placeholder="Type Values"
          onChange={handleChange}
        >
          {/* {children} */}
        </Select>
      ) : // <Input
      //   className="inputWidth"
      //   placeholder="value"
      //   value={inputValue}
      //   name="value"
      //   onKeyUp={handleEnter}
      //   onChange={handleChange}
      // />
      isDateTime ? (
        <DatePicker
          placeholder="yyyy-mm-dd"
          onChange={handleDateTime}
          format={dateFormat}
        />
      ) : (
        <Select
          mode="tags"
          placeholder="Select Values"
          onChange={handleEnumChange}
          defaultValue={[]}
          allowClear
        >
          {enumOptions.map((el, index) => (
            <Option key={index} value={el}>
              {el}
            </Option>
          ))}
        </Select>
      )}

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
