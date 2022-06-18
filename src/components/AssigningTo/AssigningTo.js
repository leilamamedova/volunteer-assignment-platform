import { useState, useEffect } from "react";
import { Space, Select, Button } from "antd";
import useStore from "../../services/store";
import FulfillmentCard from "../FulfillmentCard/FulfillmentCard";

import "./AssigningTo.scss";
import { RoleOffersFetch } from "../../services/fetch";

const { Option } = Select;

const AssigningTo = () => {
  const [entities, setEntities] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [roleOfferId, setRoleOfferId] = useState(0);
  const [isFADisabled, setIsFADisabled] = useState(true);
  const [isJobTitleDisabled, setIsJobTitleDisabled] = useState(true);
  const [isVenueDisabled, setIsVenueDisabled] = useState(true);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [entity, setEntity] = useState("");
  const [functionalArea, setFunctionalArea] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const selectedRoleOffer = useStore(
    ({ selectedRoleOffer }) => selectedRoleOffer
  );
  const setSelectedRoleOffer = useStore(
    ({ setSelectedRoleOffer }) => setSelectedRoleOffer
  );
  const roleOffers = useStore(({ roleOffers }) => roleOffers);

  const activeRoleOfferId = useStore(
    ({ activeRoleOfferId }) => activeRoleOfferId
  );
  const setActiveRoleOfferId = useStore(
    ({ setActiveRoleOfferId }) => setActiveRoleOfferId
  );
  const setActiveOfferData = useStore(
    ({ setActiveOfferData }) => setActiveOfferData
  );

  const filterFields = useStore((state) => state.filterFields);
  const setFilterFields = useStore((state) => state.setFilterFields);

  useEffect(() => {
    RoleOffersFetch(setRoleOffers, setDataLoading);
  }, []);

  useEffect(() => {
    const entityData = roleOffers.map((el) => el.name);
    setEntities(entityData);
  }, [roleOffers]);

  useEffect(() => {
    entity.length > 0 ? setIsFADisabled(false) : setSelectedRoleOffer({});
    entity.length > 0 &&
      functionalArea.length > 0 &&
      setIsJobTitleDisabled(false);
    entity.length > 0 &&
      functionalArea.length > 0 &&
      jobTitle.length > 0 &&
      setIsVenueDisabled(false);
    entity.length > 0 &&
      functionalArea.length > 0 &&
      jobTitle.length > 0 &&
      location.length > 0 &&
      setSubmitDisabled(false);
  }, [entity, functionalArea, location, jobTitle]);

  //Submit Handler Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeRoleOfferId != roleOfferId) {
      setActiveRoleOfferId(roleOfferId);
      const offer = roleOffers
        .find((el) => el.name === entity)
        .functionalAreas.find((el) => el.name === functionalArea)
        .jobTitles.find((el) => el.name === jobTitle)
        .locations.find((el) => el.name === location).roleOffer;
      const offerRequirements = offer.functionalRequirement.requirements;
      setActiveOfferData({ entity, functionalArea, jobTitle, location });
      setFilterFields([...filterFields, ...offerRequirements]);
      setSelectedRoleOffer(offer);
    }
  };
  //Select Boxes will be Enabled by order (top->bottom)
  //On every change options for the next select box will change
  //according to the selected value;
  const handleEntityChange = (value) => {
    setEntity(value);
    let functionalAreaData = [];
    roleOffers.map((el) =>
      el.name === value ? (functionalAreaData = [...el.functionalAreas]) : ""
    );
    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setFunctionalAreas([...functionalAreaData]);
  };
  const handleFAChange = (value) => {
    setFunctionalArea(value);
    let jobTitleData = [];
    functionalAreas.map((el) =>
      el.name === value ? (jobTitleData = [...el.jobTitles]) : ""
    );
    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setJobTitles(jobTitleData);
  };
  const handleJobTitleChange = (value) => {
    setJobTitle(value);
    let venueData = [];
    jobTitles.map((el) =>
      el.name === value ? (venueData = [...el.locations]) : ""
    );
    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    const venueListWithId = venueData.filter(
      (venue) => venue.roleOffer.role_offer_id !== null
    );
    setLocations(venueListWithId);
  };
  const handleVenueChange = (value, location) => {
    setLocation(location.children);
    setRoleOfferId(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <Space className="assignin-to-component card" direction="vertical">
        <Space direction="vertical">
          <form
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onSubmit={handleSubmit}
          >
            {roleOfferId !== 0 && (
              <p style={{ marginBottom: "0", fontSize: "1.5rem" }}>
                Role Offer ID: {roleOfferId}
              </p>
            )}
            <Select
              defaultValue="Entity"
              showSearch
              optionFilterProp="children"
              loading={dataLoading}
              onChange={handleEntityChange}
            >
              <Option default disabled>
                Entity
              </Option>
              {entities.length > 0 &&
                entities.map((el, index) => (
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
              {locations.map((el, index) => (
                <Option key={index} value={el.roleOffer.role_offer_id}>
                  {el.name}
                </Option>
              ))}
            </Select>

            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitDisabled}
              className="submit-btn"
            >
              Submit
            </Button>
          </form>
        </Space>

        <Space className="fulfillment-wrapper">
          <FulfillmentCard
            title="Assignee"
            value1={selectedRoleOffer.overallAssigned}
            value2={selectedRoleOffer.assignee_demand}
            percent={selectedRoleOffer.assigneeDemandPercentage}
          />
          <FulfillmentCard
            title="Waitlist"
            value1={selectedRoleOffer.overallWaitlisted}
            value2={selectedRoleOffer.waitlist_demand}
            percent={selectedRoleOffer.waitlistDemandPercentage}
          />
        </Space>
      </Space>
    </div>
  );
};

export default AssigningTo;
