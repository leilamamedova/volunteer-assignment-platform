import React from "react";
import { Button } from "antd";
import useStore from "../../services/store";

function ResultButton() {
  const filterFields = useStore(({ filterFields }) => filterFields);

  const getResults = () => {
    console.log(filterFields);
  };
  return (
    <Button onClick={getResults} type="primary">
      See Results
    </Button>
  );
}

export default ResultButton;
