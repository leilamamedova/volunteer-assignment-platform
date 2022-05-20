import React from "react";
import { Button } from "antd";
import useStore from "../../services/store";

function ResultButton({ fetchDefault, fetchFiltered }) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);

  const getResults = (e) => {
    e.preventDefault();
    if (filterFields.length) {
      fetchFiltered(filterFields);
    } else {
      fetchDefault(setUsersData);
    }
  };

  return (
    <Button onClick={getResults} type="primary">
      See Results
    </Button>
  );
}

export default ResultButton;
