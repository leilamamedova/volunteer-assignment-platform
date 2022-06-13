import React from "react";
import { Button, message } from "antd";
import useStore from "../../services/store";

function ResultButton({ fetchFiltered }) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);

  const warning = () => {
    message.warning("Please select valid Requirement or Operator name !");
    return;
  };

  const getResults = (e) => {
    e.preventDefault();
    let isFound = false;
    filterFields.forEach((el) => {
      if (el.operator === "Operator" || el.requirement_name === "Requirement") {
        isFound = true;
        warning();
      }
    });
    if (!isFound) {
      filterFields.length &&
        fetchFiltered(
          filterFields,
          setUsersData,
          setPagination,
          setDataLoading,
          1,
          10
        );
    }
  };

  return (
    <Button onClick={getResults} type="primary">
      See Results
    </Button>
  );
}

export default ResultButton;
