import { useEffect } from "react";
import { Button, Space, Typography } from "antd";
import useStore from "../../services/store";
import FilterField from "../FilterField/FilterField";
import ResultButton from "../ResultButton/ResultButton";
import "./index.scss";

const { Text } = Typography;
function ROFilterWrapper(props) {
  const ROfilterFields = useStore(({ ROfilterFields }) => ROfilterFields);
  const setROFilterFields = useStore(
    ({ setROFilterFields }) => setROFilterFields
  );
  const addROFilterField = useStore(({ addROFilterField }) => addROFilterField);

  const removeROFilterField = useStore(
    ({ removeROFilterField }) => removeROFilterField
  );
  const resetROFilterFields = useStore(
    ({ resetROFilterFields }) => resetROFilterFields
  );

  // Creating a new field
  const handleNewField = () => {
    addROFilterField({
      default: false,
      requirement_name: "Requirement",
      operator: "Operator",
      value: [],
    });
  };

  // Removing a filter field
  const removeField = (del_id) => {
    const list = [...ROfilterFields];
    list.splice(del_id, 1);

    //Remove From store if exists
    if (ROfilterFields.find((el) => el.id === del_id) !== "undefined") {
      removeROFilterField(del_id);
    }
    setROFilterFields(list);
  };

  // Handling Change events
  const handleChange = (index, tagsArray) => {
    const list = [...ROfilterFields];
    list[index]["value"] = tagsArray;
    setROFilterFields(list);
  };
  // Handling Select events
  const handleSelect = (e, index, name) => {
    const list = [...ROfilterFields];
    list[index][name] = e;
    setROFilterFields(list);
  };
  //Handle Reset
  //Set default FilterFields , Fetch Users without Filter
  const resetHandler = () => {
    resetROFilterFields();
  };
  return (
    <>
      <div className={"card flexv overflow-y--auto"}>
        <div style={{ width: "100%" }} className="flexv">
          <Space className="sticky" size="middle">
            <Button type="primary" onClick={handleNewField}>
              Add
            </Button>

            <Button onClick={resetHandler} type="primary">
              Reset
            </Button>
          </Space>

          {ROfilterFields.length > 0 ? (
            ROfilterFields.map((el, index) => (
              <Space
                direction="vertical"
                size="middle"
                key={index}
                style={{ margin: "15px 0" }}
              >
                <FilterField
                  key={el.id}
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
              </Space>
            ))
          ) : (
            <Text>Click on Add..</Text>
          )}
        </div>
      </div>
    </>
  );
}

export default ROFilterWrapper;
