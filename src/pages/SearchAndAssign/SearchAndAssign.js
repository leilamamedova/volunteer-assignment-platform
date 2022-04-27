import { Space } from "antd";
import React from "react";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import "./SearchAndAssign.scss";

const SearchAndAssign = () => {
  return (
    <div className="search-and-assign">
      <Space direction="horizontal" align="top">
        <FilterWrapper />
        <Space direction="vertical" className="search-and-assign-filters">
          <AssigningTo />
          <AssignSearchResult />
        </Space>
      </Space>
    </div>
  );
};

export default SearchAndAssign;
