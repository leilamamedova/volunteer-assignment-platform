import { Modal, Button, Form, Input } from "antd";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
import useStore from "../../services/store";
import { useEffect } from "react";

function NewFilterTemplateModal({ isModalVisible, setIsModalVisible }) {
  const filterFields = useStore((state) => state.filterFields);
  const favoriteFilters = useStore((state) => state.favoriteFilters);

  const resetFilterFields = useStore((state) => state.resetFilterFields);
  const addFavoriteFilter = useStore((state) => state.addFavoriteFilter);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    const templateName = values["template-filter-name"];
    addFavoriteFilter({
      key: (Math.random() * 100).toFixed(1),
      name: templateName,
      action: ["Edit", "Delete"],
      filters: filterFields,
    });
    resetFilterFields();
  };
  return (
    <Modal
      centered
      closable={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Tempalte Filter Name"
          name="template-filter-name"
          rules={[{ required: true, message: "Name your filter" }]}
        >
          <Input />
        </Form.Item>
        <FilterWrapper />
        <Button className="mt-20" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

export default NewFilterTemplateModal;
