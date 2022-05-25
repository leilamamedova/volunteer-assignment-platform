import { useState, useEffect } from "react";
import { Button } from "antd";
import useStore from "../../services/store";
import { FilterUserFetch } from "../../services/fetch";

function WaitlistButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const activeRoleOfferId = useStore(({ activeRoleOfferId }) => activeRoleOfferId);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setPagination = useStore(({ setPagination }) => setPagination);
  
  const [isDisabled, setIsDisabled] = useState(true);

  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}`;

  useEffect(() => {
    activeRoleOfferId === 0 ? setIsDisabled(true) : setIsDisabled(false);

    return () => setIsDisabled(true);
  }, [activeRoleOfferId]);

  const handleWaitlist = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, role_offer_id: activeRoleOfferId, status: 1 })
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
        FilterUserFetch(filterFields, setUsersData, setPagination, setDataLoading, 1, 10);
      })
      .catch((err) => console.log(err));
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
