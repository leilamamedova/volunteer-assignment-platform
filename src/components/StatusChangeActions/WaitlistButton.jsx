import React from "react";
import { Button } from "antd";
function WaitlistButton(props) {
  const handleAssign = () => {
    console.log("Waitlisting...");
    console.log("--------------");
    console.log(props.users);
  };
  return (
    <Button type="primary" onClick={handleAssign} danger>
      Waitlist
    </Button>
  );
}

export default WaitlistButton;
