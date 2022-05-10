import { Space, Modal, Row, Button, Image } from "antd";
import { useState } from "react";
import MatchingModal from "../MatchingModal/MatchingModal";

import "./VolunteerProfile.scss";

function VolunteerProfile(props) {
  const [showMatching, setShowMatching] = useState(false)

  const handleOk = () => {
    props.setIsVolunteerModalVisible(false)
    setShowMatching(false)
  };
  const handleCancel = () => {
    props.setIsVolunteerModalVisible(false)
    setShowMatching(false)
  };

  return (
    <Modal
      className="volunteer-profile--modal"
      title="Details"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
    {showMatching ?
      <MatchingModal/>
      :
      <>
      <Row justify='end'>
        <Button onClick={() => setShowMatching(true)}>Matching</Button>
      </Row>
      <Space
        direction="vertical"
        size="large"
        className="overflow-y--auto volunteer--card"
      >
        <Space size="middle">
          <span className="fs-xl">Role Match: </span>
          <span className="perfect fs-xl bold">98%</span>
        </Space>
        <Space direction="horizontal" size="small">
          <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <div>
            <div className="fs-lg">
              <span className="bold">ID</span>: #JKSD23
            </div>
            <i className="fs-lg">Jerome Willhenberg</i>
          </div>
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
      </>    
    }      
    </Modal>
  );
}

export default VolunteerProfile;
