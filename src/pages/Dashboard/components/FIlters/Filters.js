import { useState, useEffect } from "react";
import { Space, Select, Button, Checkbox, Divider } from "antd";
import useStore from "../../../../services/store";
import { RoleOffersFetch } from "../../../../services/fetch";

const { Option } = Select;

const statusList = [
  'Assigned',
  'Pending',
  'Accepted',
  'Confirmed',
  'Complete',
  'Declined',
  'Removed',
  'Expired',
  'Waitlist Offered',
  'Waitlist Accepted',
  'Waitlist Declined',
  'Pre-assigned',
  'Not Approved',
  'Waitlist Assigned',
];

const locationList = [
  'Locals',
  'Internationals',
]

const Filters = ({showUserData=false}) => {
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
  const [isStatusDisabled, setStatusDisabled] = useState(true);
  const [isLocationDisabled, setLocatiobDisabled] = useState(true);

  const [entity, setEntity] = useState([]);
  const [functionalArea, setFunctionalArea] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);
  const [venue, setVenue] = useState([]);
  const [status, setStatus] = useState([]);
  const [location, setLocation] = useState([]);

  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setSelectedRoleOffer = useStore(({ setSelectedRoleOffer }) => setSelectedRoleOffer);

  useEffect(() => {
      RoleOffersFetch(setRoleOffers, setDataLoading);
  }, [])

  useEffect(() => {
    const entityData = roleOffers.map((el) => el.name);
    setEntities(entityData);
  }, [roleOffers]);

  //Submit Handler Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveRoleOfferId(roleOfferId);
  };

  const handleEntityChange = (value) => {
    setEntity(value);
    let functionalAreaData = [];
    value.forEach(value => { functionalAreaData.push(roleOffers.find(c => c.name === value)) })
    let functionalAreaMerged = [].concat.apply([],  functionalAreaData.map(item => item.functionalAreas))

    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setSubmitDisabled(true);
    setIsFADisabled(false);
    setFunctionalAreas(functionalAreaMerged);
  };

  const handleFAChange = (value) => { 
    setFunctionalArea(value)
    let jobTitleData = [];
    value.forEach(value => { jobTitleData.push(functionalAreas.find(c => c.name === value)) })
    let jobTitleMerged = [].concat.apply([],  jobTitleData.map(item => item.jobTitles))

    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setSubmitDisabled(true);
    setIsJobTitleDisabled(false);
    setIsVenueDisabled(true);
    setJobTitles(jobTitleMerged);
  };
  const handleJobTitleChange = (value) => {
    setJobTitle(value)
    let venueData = [];
    value.forEach(value => { venueData.push(jobTitles.find(c => c.name === value)) })
    let venueMerged = [].concat.apply([],  venueData.map(item => item.locations))

    setRoleOfferId(0);
    setActiveRoleOfferId(0);
    setSubmitDisabled(true);
    setIsVenueDisabled(false);
    setVenues(venueMerged);
  };
  const handleVenueChange = (value) => {
    setVenue(value)
    setRoleOfferId(1);
    setStatusDisabled(false);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setLocatiobDisabled(false);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    setSubmitDisabled(false);
  };

  const selectAllEntity = (e) => {
    e.target.checked === true ? handleEntityChange(entities) : setEntity([])
  };

  const selectAllFa = (e) => {
    e.target.checked === true ? handleFAChange(functionalAreas.map(fa => fa.name)) : setFunctionalArea([])
  };

  const selectAllRoles = (e) => {
    e.target.checked === true ? handleJobTitleChange(jobTitles.map(job => job.name)) : setJobTitle([])
  };

  const selectAllVenues = (e) => {
    e.target.checked === true ? handleVenueChange(venues.map(venue => venue.name)) : setVenue([])
  };

  const selectAllStatus = (e) => {
    e.target.checked === true ? handleStatusChange(statusList.map(status => status)) : setStatus([])
  };

  const selectAllLocations = (e) => {
    e.target.checked === true ? handleLocationChange(locationList.map(location => location)) : setLocation([])
  };

  return (
    <div style={{ width: "100%" }}>      
        <Space direction="vertical" className="filters assignin-to-component card">
          <form
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <Select
              mode="multiple"
              defaultValue="Entity"
              placeholder='Entity'
              showSearch
              optionFilterProp="children"
              loading={dataLoading}
              onChange={handleEntityChange}
              value={entity}
              dropdownRender={(menu) => (
                <>
                {menu}   
                <Divider
                    style={{
                    margin: '8px 0',
                    }}
                />             
                <Checkbox
                  style={{
                    margin: '4px 8px',
                  }}
                  onChange={selectAllEntity}
                  checked={entities.length === entity.length}
                >All</Checkbox>
                </>
              )}
            >
              <Option default disabled>
                Entity
              </Option>
              {entities.length>0 && entities.map((el, index) => (
                <Option key={index} value={el}>
                  {el}
                </Option>
              ))}
            </Select>
            <Select
              mode="multiple"
              disabled={isFADisabled}
              placeholder="Functional Area"
              defaultValue="Functional Area"
              showSearch
              optionFilterProp="children"
              onChange={handleFAChange}
              value={functionalArea}
              dropdownRender={(menu) => (
                <>
                {menu}   
                <Divider
                    style={{
                    margin: '8px 0',
                    }}
                />             
                <Checkbox
                  style={{
                    margin: '4px 8px',
                  }}
                  onChange={selectAllFa}
                  checked={functionalAreas.length === functionalArea.length}
                >All</Checkbox>
                </>
              )}
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
              mode='multiple'
              disabled={isJobTitleDisabled}
              placeholder='Role'
              defaultValue="Role"
              showSearch
              optionFilterProp="children"
              onChange={handleJobTitleChange}
              value={jobTitle}
              dropdownRender={(menu) => (
                <>
                {menu}   
                <Divider
                    style={{
                    margin: '8px 0',
                    }}
                />             
                <Checkbox
                  style={{
                    margin: '4px 8px',
                  }}
                  onChange={selectAllRoles}
                  checked={jobTitles.length === jobTitle.length}
                >All</Checkbox>
                </>
              )}
            >
              <Option default disabled>
                Role
              </Option>
              {jobTitles.map((el, index) => (
                <Option key={index} value={el.name}>
                  {el.name}
                </Option>
              ))}
            </Select>

            <Select
              mode='multiple'
              disabled={isVenueDisabled}
              placeholder='Venue'
              defaultValue="Venue"
              showSearch
              optionFilterProp="children"
              onChange={handleVenueChange}
              value={venue}
              dropdownRender={(menu) => (
                <>
                {menu}   
                <Divider
                    style={{
                    margin: '8px 0',
                    }}
                />             
                <Checkbox
                  style={{
                    margin: '4px 8px',
                  }}
                  onChange={selectAllVenues}
                  checked={venues.length === venue.length}
                >All</Checkbox>
                </>
              )}
            >
              <Option default disabled>
                Venue
              </Option>
              {venues.map((el, index) => (
                <Option key={index} value={el.name}>
                  {el.name}
                </Option>
              ))}
            </Select>

            {
              showUserData &&
              <>
                <Select
                mode='multiple'
                disabled={isStatusDisabled}
                placeholder='Status'
                defaultValue="Status"
                showSearch
                optionFilterProp="children"
                value={status}
                onChange={handleStatusChange}         
                dropdownRender={(menu) => (
                  <>
                {menu}   
                <Divider
                    style={{
                    margin: '8px 0',
                    }}
                />             
                <Checkbox
                  style={{
                    margin: '4px 8px',
                  }}
                  onChange={selectAllStatus}
                  checked={statusList.length === status.length}
                >All</Checkbox>
                </>
              )}
              >
                <Option default disabled>
                  Venue
                </Option>
                {statusList.map((el, index) => (
                  <Option key={index} value={el}>
                    {el}
                  </Option>
                ))}
              </Select>
            
              <Select
                mode='multiple'
                disabled={isLocationDisabled}
                placeholder='Location'
                defaultValue="Location"
                showSearch
                optionFilterProp="children"
                value={location}
                onChange={handleLocationChange}         
                dropdownRender={(menu) => (
                  <>
                  {menu}   
                  <Divider
                      style={{
                      margin: '8px 0',
                      }}
                  />             
                  <Checkbox
                    style={{
                      margin: '4px 8px',
                    }}
                    onChange={selectAllLocations}
                    checked={locationList.length === location.length}
                  >All</Checkbox>
                  </>
                )}
              >
                <Option default disabled>
                  Venue
                </Option>
                {locationList.map((el, index) => (
                  <Option key={index} value={el}>
                    {el}
                  </Option>
                ))}
              </Select> 
              </>
            }        

            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </form>
        </Space>
    </div>
  );
};

export default Filters;
