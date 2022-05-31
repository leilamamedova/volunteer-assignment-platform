import { Modal, Button, Form, Input, message } from "antd";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
import useStore from "../../services/store";
import { useState } from "react";

function NewFilterTemplateModal({ isModalVisible, setIsModalVisible }) {
  const filterFields = useStore((state) => state.filterFields);
  const resetFilterFields = useStore((state) => state.resetFilterFields);
  const [templateName, setTemplateName] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetFilterFields();
    setTemplateName(true);
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
    .then((response) =>{
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      message.success('Success!');
    })
   .catch((err) => message.error(err.message))

    resetFilterFields();
    setTemplateName(true);
    setIsModalVisible(false);
  };

  const handleEnter = (event) => {
    if (event.which == '13') {
      event.preventDefault();
    }
  }

  return (
    <Modal
      centered
      closable={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
      className="templates-page-modal"
    >
      <Form
        initialValues={{ remember: false }}
        autoComplete="off"
        onFinish={handleSubmit}
        onKeyDown={handleEnter}
      >
        <Form.Item
          label="Template Filter Name"
          name="template-filter-name"
          rules={[{ required: true, message: "Name your filter" }]}
        >
          {templateName ? <Input value=''/> : <Input/> }          
        </Form.Item>
        <FilterWrapper seeResultBtn={false} />
        <Button className="mt-20" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

export default NewFilterTemplateModal;
