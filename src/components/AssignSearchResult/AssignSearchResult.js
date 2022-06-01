import "./AssignSearchResult.scss";
import UsersTable from "../UsersTable/UsersTable";

const AssignSearchResult = () => {
  return (
    <>
      <div className="assign-search-result">
        <UsersTable
          isAssignAction={true}
          isWaitlistAction={true}
          isFreeAction={true}
          isStatusColumn={true}
        />
      </div>
    </>
  );
};

export default AssignSearchResult;
