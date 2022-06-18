import { Button, message } from "antd";
import useStore from "../../services/store";
import { FilterUserFetch, RoleOffersFetch } from "../../services/fetch";

function FreeButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
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
  const handleOfferDataUpdate = () => {
    const offer = roleOffers
      .find((el) => el.name === activeOfferData.entity)
      .functionalAreas.find((el) => el.name === activeOfferData.functionalArea)
      .jobTitles.find((el) => el.name === activeOfferData.jobTitle)
      .locations.find((el) => el.name === activeOfferData.location).roleOffer;

    setSelectedRoleOffer(offer);
  };

  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/ChangeToAnyStatus/?email=${userEmail}`;

  const handleFree = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, status: null, email: userEmail })
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
    <Button className="green-bg" onClick={handleFree}>
      Free
    </Button>
  );
}

export default FreeButton;
