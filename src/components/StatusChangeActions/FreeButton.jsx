import React from "react";
import { Button } from "antd";
function FreeButton(props) {
  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}`;

  const handleFree = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, role_offer_id: props.roleOfferId, status: 2 })
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
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <Button className="green-bg" onClick={handleFree}>
      Free
    </Button>
  );
}

export default FreeButton;
