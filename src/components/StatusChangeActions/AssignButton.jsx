import { useEffect, useState } from "react";
import { Button } from "antd";
import useStore from "../../services/store";
import { UsersFetch } from "../../services/fetch";

function AssignButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const activeRoleOfferId = useStore(
    ({ activeRoleOfferId }) => activeRoleOfferId
  );
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    activeRoleOfferId === 0 ? setIsDisabled(true) : setIsDisabled(false);

    return () => setIsDisabled(true);
  }, [activeRoleOfferId]);
  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}`;

  const handleAssign = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, role_offer_id: activeRoleOfferId, status: 0 })
    );
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
    <Button disabled={isDisabled} type="primary" onClick={handleAssign}>
      Assign
    </Button>
  );
}

export default AssignButton;
