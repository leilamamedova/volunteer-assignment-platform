import { Modal, Tabs } from "antd";
import VolunteerData from "./components/VolunteerData/VolunteerData";
import MatchingData from "./components/MatchingData/MatchingData";
import History from "./components/History/History";
import "./VolunteerProfile.scss";

const { TabPane } = Tabs;

function VolunteerProfile({isModalVisible, setIsVolunteerModalVisible, userID}) {
  const handleOk = () => {
    setIsVolunteerModalVisible(false)
  };
  const handleCancel = () => {
    setIsVolunteerModalVisible(false)
  };

  return (
    <Modal
      className="volunteer-profile--modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >

      <Tabs defaultActiveKey="1" >
        <TabPane tab="Details" key="1">
          <VolunteerData userID={userID}/>
        </TabPane>
        <TabPane tab="Matching" key="2">
          <MatchingData userID={userID}/>
        </TabPane>
        <TabPane tab="History" key="3">
          <History userID={userID}/>
        </TabPane>
      </Tabs>  

    </Modal>
  );
}

export default VolunteerProfile;
