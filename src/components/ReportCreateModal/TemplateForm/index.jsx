import React from "react";
import { Form, Select, Input } from "antd";
const { Option } = Select;

function TemplateForm() {
  return (
    <Form>
      <Form.Item
        label="Template Name"
        rules={[
          {
            required: true,
            message: "Please input template name!",
          },
        ]}
      >
        <Input placeholder="Enter template name" />
      </Form.Item>
      <Form.Item
        label="File Type"
        rules={[{ required: true, message: "Please select file type!" }]}
      >
        <Input value="Excel" disabled />
      </Form.Item>
    </Form>
  );
}

export default TemplateForm;
