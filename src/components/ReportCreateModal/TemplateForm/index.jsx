import React, { useState } from "react";
import { Form, Input } from "antd";
import useStore from "../../../services/store";

function TemplateForm() {
  const setTemplateReportName = useStore(
    (state) => state.setTemplateReportName
  );
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    setTemplateReportName(e.target.value);
  };

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
        <Input
          value={name}
          onChange={handleChange}
          placeholder="Enter template name"
        />
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
