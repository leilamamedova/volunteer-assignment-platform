import { useEffect } from "react";
import { Button, Space, Radio } from "antd";
import useStore from "../../services/store";
import FilterField from "../FilterField/FilterField";
import ResultButton from "../ResultButton/ResultButton";
import { FilterUserFetch } from "../../services/fetch";
import "./FilterWrapper.scss";

function FilterWrapper(props) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setFilterFields = useStore(({ setFilterFields }) => setFilterFields);
  const addFilterField = useStore(({ addFilterField }) => addFilterField);
  const removeFilterField = useStore(
    ({ removeFilterField }) => removeFilterField
  );
  const resetFilterFields = useStore(
    ({ resetFilterFields }) => resetFilterFields
  );

  //Everytime componenet loads, we are resetting the store
  useEffect(() => {
    if (!props.noReset) {
      resetFilterFields();
    }
  }, []);

  // Creating a new field
  const handleNewField = () => {
    addFilterField({
      default: false,
      requirement: "Requirement",
      operator: "Operator",
      value: "",
      logical: "and",
    });
  };

  // Removing a filter field
  const removeField = (del_id) => {
    const list = [...filterFields];
    list.splice(del_id, 1);

    //Remove From store if exists
    if (filterFields.find((el) => el.id === del_id) !== "undefined") {
      removeFilterField(del_id);
    }
    setFilterFields(list);
  };

  // Handling Change events
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...filterFields];
    list[index][name] = value;
    setFilterFields(list);
  };
  // Handling Select events
  const handleSelect = (e, index, name) => {
    const list = [...filterFields];
    list[index][name] = e;
    setFilterFields(list);
  };

  return (
    <>
      <div className={"card flexv overflow-y--auto"}>
        <div style={{ width: "100%" }} className="flexv">
          <Space className="sticky" size="middle">
            <Button type="primary" onClick={handleNewField}>
              Add
            </Button>
            {
              props.seeResultBtn ? <ResultButton fetch={FilterUserFetch} /> : null
            }
          </Space>

          {filterFields.map((el, index) => (
            <Space
              direction="vertical"
              size="middle"
              key={index + "filter"}
              style={{ margin: "15px 0" }}
            >
              {index !== 0 ? (
                <Radio.Group
                  name="logical"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={el.logical}
                >
                  <Radio value={"and"}>And</Radio>
                  <Radio value={"or"}>Or</Radio>
                </Radio.Group>
              ) : (
                ""
              )}
              <FilterField
                key={el.id}
                id={index}
                default={!props.isFav && index === 0 ? true : false}
                operator={el.operator}
                requirement={el.requirement}
                value={el.value}
                handleSelect={handleSelect}
                handleChange={handleChange}
                handleDelete={removeField}
              />
            </Space>
          ))}
        </div>
      </div>
    </>
  );
}

export default FilterWrapper;
