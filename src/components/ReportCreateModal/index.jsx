import { useEffect, useState } from "react";
import { Modal, Tabs } from "antd";
import TemplateForm from "./TemplateForm";
import Filters from "./Filters";
import Submission from "./Submission/index";
import Columns from "./Columns/index";

import "./index.scss";
import useStore from "../../services/store";
const { TabPane } = Tabs;
function ReportCreateModal({ isModalVisible, setIsModalVisible }) {
  const resetFilterFields = useStore((state) => state.resetFilterFields);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    resetFilterFields();

    return resetFilterFields();
  }, []);

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
      destroyOnClose
      className="create-report-modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[<Submission cancel={handleCancel} />]}
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
      </Tabs>
    </Modal>
  );
}

export default ReportCreateModal;
