import { Modal, Tabs } from "antd";
import VolunteerData from "./components/VolunteerData/VolunteerData";
import MatchingData from "./components/MatchingData/MatchingData";
import "./VolunteerProfile.scss";

const { TabPane } = Tabs;

function VolunteerProfile(props) {
  const handleOk = () => {
    props.setIsVolunteerModalVisible(false)
  };
  const handleCancel = () => {
    props.setIsVolunteerModalVisible(false)
  };

  return (
    <Modal
      className="volunteer-profile--modal"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >

      <Tabs defaultActiveKey="1" >
        <TabPane tab="Details" key="1">
          <VolunteerData/>
        </TabPane>
        <TabPane tab="Matching" key="2">
          <MatchingData/>
        </TabPane>
      </Tabs>  

    </Modal>
  );
}

export default VolunteerProfile;
