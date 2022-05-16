import React from "react";
import { Button } from "antd";
function WaitlistButton(props) {
  const endpoint = `${process.env.REACT_APP_VAP_API_BASE}/Assignments/${props.route}`;

  const handleWaitlist = () => {
    const postData = props.data.map((el) =>
      Object.assign({ id: el, role_offer_id: props.roleOfferId, status: 1 })
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
    <Button type="primary" onClick={handleWaitlist} danger>
      Waitlist
    </Button>
  );
}

export default WaitlistButton;
