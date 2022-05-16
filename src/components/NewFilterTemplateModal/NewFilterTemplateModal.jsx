import { Modal, Button, Form, Input } from "antd";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
import useStore from "../../services/store";

function NewFilterTemplateModal({ isModalVisible, setIsModalVisible }) {
  const filterFields = useStore((state) => state.filterFields);
  const resetFilterFields = useStore((state) => state.resetFilterFields);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetFilterFields();
  };

  const handleSubmit = (values) => {
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values["template-filter-name"],
        filters: filterFields,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log()); 

    resetFilterFields();
    setIsModalVisible(false);
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
        <FilterWrapper seeResultBtn={true} />
        <Button className="mt-20" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

export default NewFilterTemplateModal;
