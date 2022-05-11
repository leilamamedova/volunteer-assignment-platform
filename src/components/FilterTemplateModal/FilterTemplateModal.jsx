import React from "react";
import { Modal } from "antd";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
function FilterTemplateModal(props) {
  const handleOk = () => {
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };
  return (
    <Modal
      centered
      closable={false}
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <FilterWrapper noReset={true} />
    </Modal>
  );
}

export default FilterTemplateModal;
