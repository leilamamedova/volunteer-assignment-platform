import { useEffect, useState } from "react";
import { Button, message } from "antd";
import useStore from "../../services/store";
import { FilterUserFetch } from "../../services/fetch";

function AssignButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const activeRoleOfferId = useStore(
    ({ activeRoleOfferId }) => activeRoleOfferId
  );
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const userEmail = useStore(({ userEmail }) => userEmail);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    activeRoleOfferId === 0 ? setIsDisabled(true) : setIsDisabled(false);

    return () => setIsDisabled(true);
  }, [activeRoleOfferId]);
  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}`;

  const handleAssign = () => {
    const postData = props.data.map((el) =>
      Object.assign({
        id: el,
        role_offer_id: activeRoleOfferId,
        status: "Pre-assigned",
        email: userEmail,
      })
    );
    console.log("postData", postData);
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        message.success("Success!");
        FilterUserFetch(
          filterFields,
          setUsersData,
          setPagination,
          setDataLoading,
          1,
          10
        );
      })
      .catch((err) => message.error(err.message));
  };

  return (
    <Button disabled={isDisabled} type="primary" onClick={handleAssign}>
      Assign
    </Button>
  );
}

export default AssignButton;
