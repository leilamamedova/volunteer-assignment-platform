import { Modal, Button, Form, Input } from "antd";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
import useStore from "../../services/store";
import { useEffect, useState } from "react";

function NewFilterTemplateModal({ isModalVisible, setIsModalVisible }) {
  const filterFields = useStore((state) => state.filterFields);
  const favoriteFilters = useStore((state) => state.favoriteFilters);
  const setFilterFields = useStore((state) => state.setFilterFields);

  const resetFilterFields = useStore((state) => state.resetFilterFields);
  const addFavoriteFilter = useStore((state) => state.addFavoriteFilter);

  const [templates, setTemplates] = useState({})

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const test = (allValues) => {
    const templateName = allValues["template-filter-name"];
    setTemplates(
      {
        name: templateName,
        filters: filterFields,
      }
    );
  }

  // useEffect(() => {
  //   // setFilterFields(favoriteFilters)

  //   favoriteFilters.map(el => console.log(el.filters))
  // }, [favoriteFilters])

  const handleSubmit = (values) => {
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templates),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log()); 

    resetFilterFields();
    setIsModalVisible(false);
    addFavoriteFilter([...favoriteFilters, {
      key: (Math.random() * 100).toFixed(1),
      name: values["template-filter-name"],
      action: ["Edit", "Delete"],
      filters: filterFields,
    }])
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
        onValuesChange={test}
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
