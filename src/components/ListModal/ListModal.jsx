import React from "react";
import { Modal } from "antd";
import "./ListModal.scss";

const ListModal = ({ isModalVisible, setIsModalVisible, list }) => {
  
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
        { list.length>0 ?
          list.map((item, index) => (
            <p key={index} className="filter-list-text">
              <span className="requirement">{item.requirement_name}</span>{" "}
              <span className="operator">{item.operator}</span>
              <span className="value">
                {item.value === "" ? "Empty" : item.value.join(", ")}
              </span>
            </p>
          ))
          :
          <h1>Empty</h1>
        }
      </Modal>
    </>
  );
};

export default ListModal;
