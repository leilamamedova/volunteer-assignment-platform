import { useState, useEffect } from "react";
import { Space, Select, Button, Form } from "antd";
import useStore from "../../services/store";
import FulfillmentCard from "../FulfillmentCard/FulfillmentCard";

import "./AssigningTo.scss";
import { RoleOffersFetch } from "../../services/fetch";

const { Option } = Select;

const AssigningTo = () => {
  const roleOffers = useStore(({ roleOffers }) => roleOffers);
  const setActiveRoleOfferId = useStore(
    ({ setActiveRoleOfferId }) => setActiveRoleOfferId
  );
  const [entities, setEntities] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [roleOfferId, setRoleOfferId] = useState(0);
  const [isFADisabled, setIsFADisabled] = useState(true);
  const [isJobTitleDisabled, setIsJobTitleDisabled] = useState(true);
  const [isVenueDisabled, setIsVenueDisabled] = useState(true);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [roleOfferFulfillment, setRoleOfferFulfillment] = useState(0);
  const [waitlistFulfillment, setWaitlistFulfillment] = useState(0);

  const [entity, setEntity] = useState("");
  const [functionalArea, setFunctionalArea] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setSelectedRoleOffer = useStore(
    ({ setSelectedRoleOffer }) => setSelectedRoleOffer
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

  //Submit Handler Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveRoleOfferId(roleOfferId);
    const offer = roleOffers
      .find((el) => el.name === entity)
      .functionalAreas.find((el) => el.name === functionalArea)
      .jobTitles.find((el) => el.name === jobTitle)
      .locations.find((el) => el.name === location).roleOffer;
    const offerRequirements = offer.functionalRequirement.requirements;
    setFilterFields([...filterFields, ...offerRequirements]);
    setSelectedRoleOffer(offer);
    setRoleOfferFulfillment(offer.role_offer_fulfillment);
    setWaitlistFulfillment(offer.waitlist_fulfillment);
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
    setSubmitDisabled(true);
    setIsFADisabled(false);
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
    setSubmitDisabled(true);
    setIsJobTitleDisabled(false);
    setIsVenueDisabled(true);
    console.log("NEW JOBS");
    console.log(jobTitleData);
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
    setSubmitDisabled(true);
    setIsVenueDisabled(false);
    console.log("NEW VENUES");
    console.log(venueData);
    setLocations(venueData);
  };
  const handleVenueChange = (value, location) => {
    setLocation(location.children);
    setRoleOfferId(value);
    setSubmitDisabled(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Space className="assignin-to-component card">
        <Space direction="vertical">
          <form
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            {
              roleOfferId !== 0 && <p style={{marginBottom: '0'}}>Role Offer ID: {roleOfferId}</p>
            }
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

        <Space className="fulfillment-wrapper">
          <FulfillmentCard
            title="Role"
            value={roleOfferFulfillment}
            percent={roleOfferFulfillment}
          />
          <FulfillmentCard
            title="Waitlist"
            value={waitlistFulfillment}
            percent={waitlistFulfillment}
          />
        </Space>
      </Space>
    </div>
  );
};

export default AssigningTo;
