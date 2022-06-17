import { useEffect, useState } from "react";
import { Button, Space, Typography } from "antd";
import useStore from "../../services/store";
import FilterField from "../FilterField/FilterField";
import ResultButton from "../ResultButton/ResultButton";

import { FilterUserFetch, NewUsersFieldsFetch } from "../../services/fetch";
import "./FilterWrapper.scss";

const { Text } = Typography;
function FilterWrapper(props) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setFilterFields = useStore(({ setFilterFields }) => setFilterFields);
  const setFilterTotal = useStore(({ setFilterTotal }) => setFilterTotal);

  const addFilterField = useStore(({ addFilterField }) => addFilterField);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setPagination = useStore(({ setPagination }) => setPagination);

  const removeFilterField = useStore(
    ({ removeFilterField }) => removeFilterField
  );
  const resetFilterFields = useStore(
    ({ resetFilterFields }) => resetFilterFields
  );
  const setNewUsersDataFields = useStore(
    ({ setNewUsersDataFields }) => setNewUsersDataFields
  );

  //Everytime componenet loads, we are resetting the store
  useEffect(() => {
    if (props.isReset) {
      resetFilterFields();
    }
    NewUsersFieldsFetch(setNewUsersDataFields);
  }, []);
  // Creating a new field
  const handleNewField = () => {
    addFilterField({
      default: false,
      requirement_name: "Requirement",
      operator: "Operator",
      value: [],
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
  const handleChange = (index, valueArr) => {
    const list = [...filterFields];
    list[index]["value"] = valueArr;
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
    resetFilterFields();
    setFilterTotal(0);
    FilterUserFetch(
      filterFields,
      setUsersData,
      setPagination,
      setDataLoading,
      1,
      100
    );
  };

  return (
    <>
      <div className={"card outer flexv "}>
        <div style={{ width: "100%" }} className="flexv">
          <Space className="sticky" size="middle">
            <Button type="primary" onClick={handleNewField}>
              Add
            </Button>
            {props.seeResultBtn ? (
              <ResultButton fetchFiltered={FilterUserFetch} />
            ) : null}
            <Button onClick={resetHandler} type="primary">
              Reset
            </Button>
          </Space>
          <div className={"card flexv overflow-y--auto"}>
            <div style={{ width: "100%" }} className="flexv">
              {filterFields.length > 0 ? (
                filterFields.map((el, index) => (
                  <FilterField
                    key={index}
                    id={index}
                    default={el.default}
                    operator={el.operator}
                    requirement={el.requirement_name}
                    value={el.value}
                    handleSelect={handleSelect}
                    handleChange={handleChange}
                    handleDelete={removeField}
                    isRoleOffer={props.isRoleOffer}
                  />
                ))
              ) : (
                <Text>Click on Add..</Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterWrapper;
