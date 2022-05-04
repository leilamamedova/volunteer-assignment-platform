import React from "react";
import UsersTable from "../../components/UsersTable/UsersTable";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
function Users() {
  return (
    <>
      <FilterWrapper />
      <UsersTable />
    </>
  );
}

export default Users;
