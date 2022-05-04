import { Space, Modal, Button } from "antd";

import "./VolunteerProfile.scss";

function VolunteerProfile(props) {
  return (
    <Modal
      className="volunteer-profile--modal"
      title="Details"
      visible={props.isModalVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={700}
    >
      <Space
        direction="vertical"
        size="large"
        className="overflow-y--auto card volunteer--card"
      >
        <Space size="middle">
          <span className="fs-xl">Role Match: </span>
          <span className="perfect fs-xl bold">98%</span>
        </Space>
        <Space direction="vertical" size="small">
          <div className="fs-lg">
            <span className="bold">ID</span>: #JKSD23
          </div>
          <i className="fs-lg">Jerome Willhenberg</i>
        </Space>
        <Space direction="vertical" size="small">
          <div className="fs-lg">
            <span className="bold">Age</span>: 36
          </div>
          <div className="fs-lg perfect">
            <span className="bold">English</span>: Fluent
          </div>
          <div className="fs-lg ">
            <span className="bold">Skills</span>: Customer Services, Ability to
            handle difficult situations
          </div>
          <div className="fs-lg ">
            <span className="bold">Interview Score</span>: 100
          </div>
          <div className="fs-lg perfect">
            <span className="bold">Computer Proficiency</span>: High
          </div>
          <div className="fs-lg ">
            <span className="bold">Residence Zone</span>: Doha
          </div>
        </Space>
      </Space>
    </Modal>
  );
}

export default VolunteerProfile;
