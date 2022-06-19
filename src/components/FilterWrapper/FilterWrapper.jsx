import { useEffect, useState } from "react";
import { Button, Space, Typography, Collapse } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import useStore from "../../services/store";
import FilterField from "../FilterField/FilterField";
import ResultButton from "../ResultButton/ResultButton";
import LoadFilterTemplate from "../LoadFilterTemplate/LoadFilterTemplate";

import { FilterUserFetch, NewUsersFieldsFetch } from "../../services/fetch";
import "./FilterWrapper.scss";

const { Text } = Typography;
const { Panel } = Collapse;
function FilterWrapper(props) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setFilterFields = useStore(({ setFilterFields }) => setFilterFields);
  const setFilterTotal = useStore(({ setFilterTotal }) => setFilterTotal);
  const addFilterField = useStore(({ addFilterField }) => addFilterField);

  const [STfilters, setSTfilters] = useState([]);
  const [FRfilters, setFRfilters] = useState([]);
  const [DFfilters, setDFfilters] = useState([]);

  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const setSelectedFavoriteFilters = useStore(
    (state) => state.setSelectedFavoriteFilters
  );
  const [toogleSize, setToogleSize] = useState(false);
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
  useEffect(() => {
    const _fr = filterFields.filter(
      (el) => el.type === "FunctionalRequirements"
    );
    const _st = filterFields.filter((el) => el.type === "SavedTemplate");
    const _df = filterFields.filter(
      (el) => el.type === undefined || el.type === "Default"
    );

    setSTfilters(_st);
    setFRfilters(_fr);
    setDFfilters(_df);
  }, [filterFields]);
  // Creating a new field
  const handleNewField = () => {
    addFilterField({
      default: false,
      type: "Default",
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
  const handleToggle = () => {
    setToogleSize((prev) => !prev);
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

  const handleGroupReset = (e, groupType) => {
    e.stopPropagation();
    const mutate = filterFields.filter((el) => el.type !== groupType);
    if (groupType === "SavedTemplate") {
      setSelectedFavoriteFilters(0);
    }
    setFilterFields(mutate);
  };

  const accordionExtra = (count, type) => {
    return (
      <Space className="align-center">
        <p style={{ fontSize: "1.1rem" }}>Count: {count}</p>
        <Button
          type="primary"
          danger
          onClick={(e) => handleGroupReset(e, type)}
        >
          Delete All
        </Button>
      </Space>
    );
  };
  return (
    <>
      <div
        className={
          toogleSize ? "card outer flexv min-h-500" : "card outer flexv"
        }
      >
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
            <LoadFilterTemplate />
            <div onClick={handleToggle}>
              {toogleSize ? (
                <FullscreenExitOutlined
                  style={{
                    fontSize: "1.8rem",
                    color: "#1890FF",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <FullscreenOutlined
                  style={{
                    fontSize: "1.8rem",
                    color: "#1890FF",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </Space>
          <div
            className={
              toogleSize
                ? "card no-border no-shadow p-0 flexv overflow-y--auto min-h-500"
                : "card no-border no-shadow p-0 flexv overflow-y--auto"
            }
          >
            <div style={{ width: "100%" }} className="flexv">
              {filterFields.length > 0 ? (
                <Collapse accardion>
                  {DFfilters.length > 0 ? (
                    <Panel
                      header="Defaults"
                      key="1"
                      extra={accordionExtra(DFfilters?.length, "Default")}
                    >
                      {filterFields.map((el, index) =>
                        el.type === "Default" || el.type === undefined ? (
                          <FilterField
                            key={index}
                            id={index}
                            type={el.type}
                            default={el.default}
                            operator={el.operator}
                            requirement={el.requirement_name}
                            value={el.value}
                            handleSelect={handleSelect}
                            handleChange={handleChange}
                            handleDelete={removeField}
                            isRoleOffer={props.isRoleOffer}
                          />
                        ) : (
                          ""
                        )
                      )}
                    </Panel>
                  ) : (
                    ""
                  )}
                  {STfilters.length > 0 ? (
                    <Panel
                      header="Saved Template"
                      key="2"
                      extra={accordionExtra(STfilters?.length, "SavedTemplate")}
                    >
                      {filterFields.map((el, index) =>
                        el.type === "SavedTemplate" ? (
                          <FilterField
                            key={index}
                            id={index}
                            type={el.type}
                            default={el.default}
                            operator={el.operator}
                            requirement={el.requirement_name}
                            value={el.value}
                            handleSelect={handleSelect}
                            handleChange={handleChange}
                            handleDelete={removeField}
                            isRoleOffer={props.isRoleOffer}
                          />
                        ) : (
                          ""
                        )
                      )}
                    </Panel>
                  ) : (
                    ""
                  )}
                  {FRfilters.length > 0 ? (
                    <Panel
                      header="Functional Requirements"
                      key="3"
                      extra={accordionExtra(
                        FRfilters?.length,
                        "FunctionalRequirements"
                      )}
                    >
                      {filterFields.map((el, index) =>
                        el.type === "FunctionalRequirements" ? (
                          <FilterField
                            key={index}
                            id={index}
                            type={el.type}
                            default={el.default}
                            operator={el.operator}
                            requirement={el.requirement_name}
                            value={el.value}
                            handleSelect={handleSelect}
                            handleChange={handleChange}
                            handleDelete={removeField}
                            isRoleOffer={props.isRoleOffer}
                          />
                        ) : (
                          ""
                        )
                      )}
                    </Panel>
                  ) : (
                    ""
                  )}
                </Collapse>
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
