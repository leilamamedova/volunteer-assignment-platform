import { Button } from "antd";
function Submit() {
  const handleSubmit = () => {
    console.log("Handling...");
  };
  return (
    <Button type="primary" onClick={handleSubmit}>
      Submit
    </Button>
  );
}

export default Submit;
