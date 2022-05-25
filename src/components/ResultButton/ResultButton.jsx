import React from "react";
import { Button } from "antd";
import useStore from "../../services/store";

function ResultButton({ fetchFiltered }) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);

  const getResults = (e) => {
    e.preventDefault();
    filterFields.length && fetchFiltered(filterFields, setUsersData, setPagination, setDataLoading, 1, 10);
  };

  return (
    <Button onClick={getResults} type="primary">
      See Results
    </Button>
  );
}

export default ResultButton;
