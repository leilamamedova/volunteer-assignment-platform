import React from "react";
import AssignmentTable from "../../components/AssignmentTable/AssignmentTable";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import "./AssignmentManagement.scss";

function AssignmentManagement() {
  return (
    <div>
      <FilterWrapper />
      <AssignmentTable />
    </div>
  );
}

export default AssignmentManagement;
