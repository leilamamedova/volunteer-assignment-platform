import React from "react";
import { Button } from "antd";
function AssignButton(props) {
  const handleAssign = () => {
    console.log("Assigning...");
    console.log("--------------");
    console.log(props.users);
  };
  return (
    <Button type="primary" onClick={handleAssign}>
      Assign
    </Button>
  );
}

export default AssignButton;
