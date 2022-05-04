import { useState } from "react";
import { Modal, Select } from "antd";
const { Option } = Select;

function AssignmentModal(props) {
  const [status, setStatus] = useState(props.status);
  const handleOk = () => {
    //Update status on OK with POST request
    console.log(status);
    //Hide Modal
    props.setIsStatusModalVisible(false);
  };
  const handleCancel = () => props.setIsStatusModalVisible(false);
  const handleChange = (e) => setStatus(e);
  return (
    <Modal
      title="Basic Modal"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Select
        defaultValue="Change Status"
        className="select-width"
        onChange={handleChange}
      >
        <Option value="assigned">Assigned</Option>
        <Option value="waitlist">Waitlist</Option>
        <Option value="free">Free</Option>
      </Select>
    </Modal>
  );
}

export default AssignmentModal;
