import { Modal, Button, Form, Input, message } from "antd";
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
    .then((data) => {
      if(data.statusCode === 200) {
        message.success('Success!');
      }else {
        message.error(data.value);
      }
    })
    .catch((err) => console.log()); 

    resetFilterFields();
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
          label="Tempalte Filter Name"
          name="template-filter-name"
          rules={[{ required: true, message: "Name your filter" }]}
        >
          <Input/>
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
