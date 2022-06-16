import React, { useEffect, useState } from "react";
import { Modal, Button, message } from "antd";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
import useStore from "../../services/store";

function FilterTemplateModal(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const filterFields = useStore((state) => state.filterFields);
  const favoriteFilters = useStore((state) => state.favoriteFilters);

  useEffect(() => {
    let isFound = false;

    for (let i = 0; i < props.list.length; i++) {
      if (
        props.list[i].requirement_name === "Requirement" ||
        props.list[i].operator === "Operator" ||
        filterFields[i].value?.length === 0
      ) {
        isFound = true;
      }
    }
    if (isFound) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [props.list]);

  const handleOk = () => {
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };

  const handleSave = () => {
    favoriteFilters.map((el) => {
      if (el.key === props.templateId) {
        el.filters = filterFields;

        fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates/update`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(el),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
          })
          .then((data) => {
            message.success("Successfully Updated");
          })
          .catch((err) => message.error(err.message));

        props.setIsModalVisible(false);
      }
    });
  };

  return (
    <Modal
      centered
      closable={false}
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
      className="templates-page-modal"
      destroyOnClose
    >
      <FilterWrapper noReset={true} isFav={true} seeResultBtn={false} />
      <Button
        className="mt-20"
        type="primary"
        onClick={handleSave}
        disabled={isDisabled}
      >
        Save Changes
      </Button>
    </Modal>
  );
}

export default FilterTemplateModal;
