import { useState, useEffect } from "react";
import { Space, Select, Button } from "antd";
import useStore from "../../services/store";
import FulfillmentCard from "../FulfillmentCard/FulfillmentCard";

import "./AssigningTo.scss";

const { Option } = Select;

const AssigningTo = () => {
  const setFilterFields = useStore(({ setFilterFields }) => setFilterFields);
  const roleOffers = useStore(({ roleOffers }) => roleOffers);
  const setActiveRoleOfferId = useStore(
    ({ setActiveRoleOfferId }) => setActiveRoleOfferId
  );
  const [entities, setEntities] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [venues, setVenues] = useState([]);
  const [roleOfferId, setRoleOfferId] = useState(0);
  const [isFADisabled, setIsFADisabled] = useState(true);
  const [isJobTitleDisabled, setIsJobTitleDisabled] = useState(true);
  const [isVenueDisabled, setIsVenueDisabled] = useState(true);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const entityData = roleOffers.map((el) => el.name);
    setEntities(entityData);
  }, []);

  useEffect(() => {
    if (roleOfferId === 0) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [roleOfferId]);

  //Submit Handler Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveRoleOfferId(roleOfferId);
  };

  //Select Boxes will be Enabled by order (top->bottom)
  //On every change options for the next select box will change
  //according to the selected value;
  const handleEntityChange = (value) => {
    let functionalAreaData = [];
    roleOffers.map((el) =>
      el.name === value ? (functionalAreaData = [...el.functionalAreas]) : ""
    );
    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setFunctionalAreas([...functionalAreaData]);
    setIsFADisabled(false);
  };
  const handleFAChange = (value) => {
    let jobTitleData = [];
    functionalAreas.map((el) =>
      el.name === value ? (jobTitleData = [...el.jobTitles]) : ""
    );
    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setJobTitles(jobTitleData);
    setIsJobTitleDisabled(false);
  };
  const handleJobTitleChange = (value) => {
    let venueData = [];
    jobTitles.map((el) =>
      el.name === value ? (venueData = [...el.venues]) : ""
    );
    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setVenues(venueData);
    setIsVenueDisabled(false);
  };
  const handleVenueChange = (value) => {
    setRoleOfferId(value);
    setSubmitDisabled(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Space direction="horizontal" className="assignin-to-component card">
        <Space direction="vertical">
          <form
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <Select
              defaultValue="Entity"
              showSearch
              optionFilterProp="children"
              onChange={handleEntityChange}
            >
              <Option default disabled>
                Entity
              </Option>
              {entities.map((el, index) => (
                <Option key={index} value={el}>
                  {el}
                </Option>
              ))}
            </Select>
            <Select
              disabled={isFADisabled}
              defaultValue="Functional Area"
              showSearch
              optionFilterProp="children"
              onChange={handleFAChange}
            >
              <Option default disabled>
                Functional Area
              </Option>
              {functionalAreas.map((el, index) => (
                <Option key={index} value={el.name}>
                  {el.name}
                </Option>
              ))}
            </Select>

            <Select
              disabled={isJobTitleDisabled}
              defaultValue="Role - Job Title"
              showSearch
              optionFilterProp="children"
              onChange={handleJobTitleChange}
            >
              <Option default disabled>
                Role - Job Title
              </Option>
              {jobTitles.map((el, index) => (
                <Option key={index} value={el.name}>
                  {el.name}
                </Option>
              ))}
            </Select>

            <Select
              disabled={isVenueDisabled}
              defaultValue="Venue"
              showSearch
              optionFilterProp="children"
              onChange={handleVenueChange}
            >
              <Option default disabled>
                Venue
              </Option>
              {venues.map((el, index) => (
                <Option key={index} value={el.roleOffer.id}>
                  {el.name}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </form>
        </Space>

        <FulfillmentCard title="Role" value="90" percent="90" />
        <FulfillmentCard title="Waitlist" value="80" percent="80" />
      </Space>
    </div>
  );
};

export default AssigningTo;
