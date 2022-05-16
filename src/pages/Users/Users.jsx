import React from "react";
import UsersTable from "../../components/UsersTable/UsersTable";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import { Row } from "antd";
import BulkImport from "../../components/BulkImport/BulkImport";

function Users() {
  return (
    <>
     <Row justify='end'>
        <BulkImport title={'Users'}/>
      </Row>
      <FilterWrapper seeResultBtn={true} />
      <UsersTable />
    </>
  );
}

export default Users;
