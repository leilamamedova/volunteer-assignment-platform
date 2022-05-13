import React, { useState } from "react";
import { Button } from "antd";
import useStore from "../../services/store";

function ResultButton({fetch}) {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  
  const getResults = () => {
    fetch(filterFields, setUsersData);
  };
  
  return (
    <Button onClick={getResults} type="primary">
      See Results
    </Button>
  );
}

export default ResultButton;
