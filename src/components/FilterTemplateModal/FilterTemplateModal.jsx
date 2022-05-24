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
    favoriteFilters.map((el) => {
      if (el.key === props.templateId ) {
        el.filters = filterFields;

        fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates/update`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(el),
        })
          .then((response) => response.json())
          .then((data) => console.log('Update', data))
          .catch((err) => console.log(err));

        props.setIsModalVisible(false);
        console.log('el', el)
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
    >
      <FilterWrapper noReset={true} isFav={true} seeResultBtn={false} />
      <Button className="mt-20" type="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </Modal>
  );
}

export default FilterTemplateModal;
