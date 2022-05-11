import React from "react";
import { Modal, Button } from "antd";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
import useStore from "../../services/store";
function FilterTemplateModal(props) {
  const filterFields = useStore((state) => state.filterFields);
  const favoriteFilters = useStore((state) => state.favoriteFilters);
  const handleOk = () => {
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };
  const handleSave = () => {
    favoriteFilters.forEach((el) => {
      el.key === props.templateId
        ? (el.filters = filterFields)
        : alert("failed");
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
    >
      <FilterWrapper noReset={true} isFav={true} />
      <Button className="mt-20" type="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Modal>
  );
}

export default FilterTemplateModal;
