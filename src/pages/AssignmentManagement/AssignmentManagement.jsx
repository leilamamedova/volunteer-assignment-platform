import React from "react";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import UsersTable from "../../components/UsersTable/UsersTable";
import "./AssignmentManagement.scss";

function AssignmentManagement() {
  return (
    <div>
      <FilterWrapper importRequired={false} />
      <UsersTable
        isAssignAction={true}
        isWaitlistAction={true}
        isFreeAction={true}
        isStatusColumn={true}
      />
    </div>
  );
}

export default AssignmentManagement;
