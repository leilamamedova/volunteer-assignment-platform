import { Button, message } from "antd";
import useStore from "../../services/store";
import { FilterUserFetch } from "../../services/fetch";

function FreeButton(props) {
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setPagination = useStore(({ setPagination }) => setPagination);

  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}`;

  const handleFree = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, status: 2 })
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
    .then(response => response.json())
    .then((data) => {
      if(data.statusCode === 200) {
        message.success('Success!');
      }else {
        message.error(data.value);
      }
        FilterUserFetch(filterFields, setUsersData, setPagination, setDataLoading, 1, 10);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button className="green-bg" onClick={handleFree}>
      Free
    </Button>
  );
}

export default FreeButton;
