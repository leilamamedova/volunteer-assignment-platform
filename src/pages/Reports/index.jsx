import { useState, useEffect } from "react";
import { Typography, Space, Row, Col, Button } from "antd";
import ReportsTable from "../../components/ReportsTable/index";
import ReportCreateModal from "../../components/ReportCreateModal/index";
import { UsersFieldsFetch, NewUsersFieldsFetch } from "../../services/fetch";

import "./index.scss";
import useStore from "../../services/store";

const { Title, Text } = Typography;

function Reports() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setUsersDataFields = useStore(
    ({ setUsersDataFields }) => setUsersDataFields
  );
  const setNewUsersDataFields = useStore(
    ({ setNewUsersDataFields }) => setNewUsersDataFields
  );
  const handleCreateModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    UsersFieldsFetch(setUsersDataFields);
    NewUsersFieldsFetch(setNewUsersDataFields);
  }, []);
  return (
    <>
      <Space className="w-100" direction="vertical">
        <Title className="report-title">Reports</Title>
        <Button className="my-20" type="primary" onClick={handleCreateModal}>
          Create
        </Button>
        <Row className="w-100 my-20">
          <Col span={24}>
            <ReportsTable />
          </Col>
        </Row>
      </Space>
      <ReportCreateModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}

export default Reports;
