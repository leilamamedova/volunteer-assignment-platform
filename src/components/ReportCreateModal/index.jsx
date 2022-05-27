import { useState } from "react";
import { Modal, Tabs } from "antd";
import TemplateForm from "./TemplateForm";
import Filters from "./Filters";
import Submission from "./Submission/index";
import Columns from "./Columns/index";

import "./index.scss";
const { TabPane } = Tabs;
function ReportCreateModal({ isModalVisible, setIsModalVisible }) {
  const [activeTab, setActiveTab] = useState(1);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const prevTab = () => {
    setActiveTab((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const nextTab = () => {
    setActiveTab((prev) => (prev === 4 ? 4 : prev + 1));
  };
  return (
    <Modal
      className="create-report-modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[""]}
      centered
    >
      <Tabs className="form-tab">
        <TabPane tab="Template" key={1}>
          <TemplateForm />
        </TabPane>
        <TabPane className="w-100" tab="Columns" key={2}>
          <Columns />
        </TabPane>
        <TabPane tab="Filters" key={3}>
          <Filters />
        </TabPane>
        <TabPane tab="Submission" key={4}>
          <Submission />
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default ReportCreateModal;
