import React from "react";
import { Modal } from "antd";
import "./FilterListModal.scss";

const FunctionAndRequirementsModal = ({
  isModalVisible,
  setIsModalVisible,
  filterList,
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal
        centered
        closable={false}
        className="function-list-modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {filterList.map((item, index) => (
          <p key={index} className="filter-list-text">
            <span className="requirement">{item.requirement}</span>{" "}
            <span className="operator">{item.operator}</span>
            <span className="value">
              {item.value.trim() === "" ? "Empty" : item.value}
            </span>
          </p>
        ))}
      </Modal>
    </>
  );
};

export default FunctionAndRequirementsModal;
