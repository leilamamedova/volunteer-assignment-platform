import React from "react";
import { Button } from "antd";
function FreeButton(props) {
  const handleAssign = () => {
    console.log("Free...");
    console.log("--------------");
    console.log(props.users);
  };
  return (
    <Button className="green-bg" onClick={handleAssign}>
      Free
    </Button>
  );
}

export default FreeButton;
