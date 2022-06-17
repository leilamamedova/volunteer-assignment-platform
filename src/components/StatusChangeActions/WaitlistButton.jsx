import { useState, useEffect } from "react";
import { Button, message } from "antd";
import useStore from "../../services/store";
import { FilterUserFetch } from "../../services/fetch";

function WaitlistButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const activeRoleOfferId = useStore(
    ({ activeRoleOfferId }) => activeRoleOfferId
  );

  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const userEmail = useStore(({ userEmail }) => userEmail);

  const [isDisabled, setIsDisabled] = useState(true);

  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}/?email=${userEmail}`;

  useEffect(() => {
    activeRoleOfferId === 0 ? setIsDisabled(true) : setIsDisabled(false);

    return () => {
      setIsDisabled(true);
    };
  }, [activeRoleOfferId]);

  const handleWaitlist = () => {
    const postData = props.data.map((el) =>
      Object.assign({
        id: el,
        role_offer_id: activeRoleOfferId,
        status: "Waitlist Offered",
        email: userEmail,
      })
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
          100
        );
      })
      .catch((err) => message.error(err.message));
  };

  return (
    <Button
      disabled={isDisabled}
      type="primary"
      onClick={handleWaitlist}
      danger
    >
      Waitlist
    </Button>
  );
}

export default WaitlistButton;
