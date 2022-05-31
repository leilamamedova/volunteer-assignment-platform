import { Button, message } from "antd";
import useStore from "../../services/store";
import { FilterUserFetch } from "../../services/fetch";

function FreeButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setPagination = useStore(({ setPagination }) => setPagination);

  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/ChangeToAnyStatus`;

  const handleFree = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, status: null })
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
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      message.success('Success!');
      FilterUserFetch(filterFields, setUsersData, setPagination, setDataLoading, 1, 10);
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
