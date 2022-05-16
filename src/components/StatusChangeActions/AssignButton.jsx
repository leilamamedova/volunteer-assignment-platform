import React from "react";
import { Button } from "antd";
import useStore from "../../services/store";
import { UsersFetch, UsersFieldsFetch } from "../../services/fetch";

function AssignButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setUsersDataFields = useStore(
    ({ setUsersDataFields }) => setUsersDataFields
  );

  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}`;

  const handleAssign = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, role_offer_id: 12885, status: 0 })
    );
    console.log(postData);
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        console.log(response);
        UsersFetch(setUsersData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Button type="primary" onClick={handleAssign}>
      Assign
    </Button>
  );
}

export default AssignButton;
