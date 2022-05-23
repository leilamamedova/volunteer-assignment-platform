import { useEffect } from "react";
import { Button, Space } from "antd";
import useStore from "../../services/store";
import FilterField from "../FilterField/FilterField";
import ResultButton from "../ResultButton/ResultButton";
import { UsersFetch, FilterUserFetch } from "../../services/fetch";
import "./FilterWrapper.scss";

function FilterWrapper(props) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setFilterFields = useStore(({ setFilterFields }) => setFilterFields);
  const addFilterField = useStore(({ addFilterField }) => addFilterField);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);

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
      value: [""],
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
  const handleChange = (index, tagsArray) => {
    const list = [...filterFields];
    list[index]["value"] = tagsArray;
    setFilterFields(list);
  };
  // Handling Select events
  const handleSelect = (e, index, name) => {
    const list = [...filterFields];
    list[index][name] = e;
    setFilterFields(list);
  };
  //Handle Reset
  //Set default FilterFields , Fetch Users without Filter
  const resetHandler = () => {
    UsersFetch(setUsersData);
    resetFilterFields();
  };
  return (
    <>
      <div className={"card flexv overflow-y--auto"}>
        <div style={{ width: "100%" }} className="flexv">
          <Space className="sticky" size="middle">
            <Button type="primary" onClick={handleNewField}>
              Add
            </Button>
            {props.seeResultBtn ? (
              <ResultButton
                fetchFiltered={FilterUserFetch}
                fetchDefault={UsersFetch}
              />
            ) : null}
            <Button onClick={resetHandler} type="primary">
              Reset
            </Button>
          </Space>

          {filterFields.map((el, index) => (
            <Space
              direction="vertical"
              size="middle"
              key={index}
              style={{ margin: "15px 0" }}
            >
              {/* Logical Statement  */}
              {/* {index !== 0 ? (
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
              )} */}
              <FilterField
                key={el.id}
                id={index}
                default={el.default}
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
