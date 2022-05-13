import { useState } from "react";
import VolunteerProfile from "../VolunteerProfile/VolunteerProfile";
import "./AssignSearchResult.scss";
import UsersTable from "../UsersTable/UsersTable";

const AssignSearchResult = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="assign-search-result">
        <UsersTable isAssignAction={true} isWaitlistAction={true} />
      </div>
      <VolunteerProfile
        isModalVisible={isModalVisible}
        setIsVolunteerModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default AssignSearchResult;
