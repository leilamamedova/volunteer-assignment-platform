import { useState, useEffect } from "react";
import { Button, message } from "antd";
import useStore from "../../services/store";
import { FilterUserFetch, RoleOffersFetch } from "../../services/fetch";

function WaitlistButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const activeRoleOfferId = useStore(
    ({ activeRoleOfferId }) => activeRoleOfferId
  );

  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const userEmail = useStore(({ userEmail }) => userEmail);
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const activeOfferData = useStore(({ activeOfferData }) => activeOfferData);

  const roleOffers = useStore(({ roleOffers }) => roleOffers);

  const setSelectedRoleOffer = useStore(
    ({ setSelectedRoleOffer }) => setSelectedRoleOffer
  );
  const [isDisabled, setIsDisabled] = useState(true);

  const handleOfferDataUpdate = () => {
    const offer = roleOffers
      .find((el) => el.name === activeOfferData.entity)
      .functionalAreas.find((el) => el.name === activeOfferData.functionalArea)
      .jobTitles.find((el) => el.name === activeOfferData.jobTitle)
      .locations.find((el) => el.name === activeOfferData.location).roleOffer;

    setSelectedRoleOffer(offer);
  };

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
        RoleOffersFetch(setRoleOffers, setDataLoading);
        handleOfferDataUpdate();
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
