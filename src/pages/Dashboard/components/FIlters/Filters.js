import { useState, useEffect } from "react";
import { Space, Select, Button, Checkbox, Divider, Row, Col } from "antd";
import useStore from "../../../../services/store";
import {
  OverallAssignmentsPost,
  RoleOffersFetch,
  VolunteerDemographicsPost,
} from "../../../../services/fetch";

const { Option } = Select;

const statusList = [
  "Free",
  "Assigned",
  "Pending",
  "Accepted",
  "Confirmed",
  "Complete",
  "Declined",
  "Removed",
  "Expired",
  "Waitlist Offered",
  "Waitlist Accepted",
  "Waitlist Declined",
  "Pre-assigned",
  "Not Approved",
  "Waitlist Assigned",
];

const locationList = ["local", "international"];

const Filters = ({ showUserData = false }) => {
  const roleOffers = useStore(({ roleOffers }) => roleOffers);
  const [entities, setEntities] = useState([]);
  const [functionalAreas, setFunctionalAreas] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [venues, setVenues] = useState([]);
  const [roleOfferId, setRoleOfferId] = useState([]);
  const [isFADisabled, setIsFADisabled] = useState(true);
  const [isJobTitleDisabled, setIsJobTitleDisabled] = useState(true);
  const [isVenueDisabled, setIsVenueDisabled] = useState(true);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  const [entity, setEntity] = useState([]);
  const [functionalArea, setFunctionalArea] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);
  const [venue, setVenue] = useState([]);
  const [status, setStatus] = useState([]);
  const [location, setLocation] = useState([]);
  const [role, setRole] = useState([]);
  const [entitySelectOpened, setEntitySelectOpened] = useState(false);
  const [faSelectOpened, setFaSelectOpened] = useState(false);
  const [roleSelectOpened, setRoleSelectOpened] = useState(false);
  const [venueSelectOpened, setVenueSelectOpened] = useState(false);
  const [statusSelectOpened, setStatusSelectOpened] = useState(false);
  const [locationSelectOpened, setLocationSelectOpened] = useState(false);

  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setOverallAssignments = useStore(
    ({ setOverallAssignments }) => setOverallAssignments
  );
  const setVolunteerDemographics = useStore(
    ({ setVolunteerDemographics }) => setVolunteerDemographics
  );

  function removeDuplicateObjectFromArray(array) {
    var check = new Set();
    return array.filter(
      (obj) => !check.has(obj["name"]) && check.add(obj["name"])
    );
  }

  useEffect(() => {
    RoleOffersFetch(setRoleOffers, setDataLoading);
  }, []);

  useEffect(() => {
    const entityData = roleOffers.map((el) => el.name);
    setEntities(entityData);
  }, [roleOffers]);

  useEffect(() => {
    if (entity.length > 0) {
      setIsFADisabled(false);
    } else {
      setIsFADisabled(true);
      setIsJobTitleDisabled(true);
      setIsVenueDisabled(true);
      setFunctionalArea([]);
      setJobTitle([]);
      setVenue([]);
    }
    if (entity.length > 0 && functionalArea.length > 0) {
      setIsJobTitleDisabled(false);
    } else {
      setIsJobTitleDisabled(true);
      setIsVenueDisabled(true);
      setJobTitle([]);
      setVenue([]);
    }
    if (entity.length > 0 && functionalArea.length > 0 && jobTitle.length > 0) {
      setIsVenueDisabled(false);
    } else {
      setIsVenueDisabled(true);
      setVenue([]);
    }
    if (
      entity.length > 0 &&
      functionalArea.length > 0 &&
      jobTitle.length > 0 &&
      venue.length > 0
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
    if (
      entity.length > 0 &&
      functionalArea.length > 0 &&
      jobTitle.length > 0 &&
      venue.length > 0 &&
      status.length > 0 &&
      location.length > 0
    ) {
      setSubmitDisabled(false);
    }

    if (showUserData) {
      setSubmitDisabled(false);
      if (entity.length > 0) {
        setSubmitDisabled(true);
      }
      if (
        entity.length > 0 &&
        functionalArea.length > 0 &&
        jobTitle.length > 0 &&
        venue.length > 0 &&
        status.length > 0 &&
        location.length > 0
      ) {
        setSubmitDisabled(false);
      }
    }
  }, [entity, functionalArea, jobTitle, location, venue, status, showUserData]);

  //Submit Handler Logic
  const handleSubmit = (e) => {
    const data = {
      role_offer_ids: roleOfferId,
      statuses: status,
      locations: location,
      countryCount: 10,
      ageRanges: [
        {
          fromAge: 18,
          toAge: 24,
        },
        {
          fromAge: 25,
          toAge: 34,
        },
        {
          fromAge: 35,
          toAge: 44,
        },
        {
          fromAge: 45,
          toAge: 54,
        },
        {
          fromAge: 55,
          toAge: 64,
        },
      ],
      startingAges: [65],
    };
    e.preventDefault();

    if (showUserData) {
      if (roleOfferId.length > 0 || status.length > 0 || location.length > 0) {
        VolunteerDemographicsPost(
          data,
          setVolunteerDemographics,
          setDataLoading
        );
      }
    } else {
      OverallAssignmentsPost(
        roleOfferId,
        setOverallAssignments,
        setDataLoading
      );
    }
  };

  const handleEntityChange = (value) => {
    setFunctionalArea([]);
    setJobTitle([]);
    setVenue([]);
    setEntity(value);
    let functionalAreaData = [];
    value.forEach((value) => {
      functionalAreaData.push(roleOffers.find((c) => c.name === value));
    });
    let functionalAreaMerged = removeDuplicateObjectFromArray(
      [].concat.apply(
        [],
        functionalAreaData.map((item) => item.functionalAreas)
      )
    );
    setFunctionalAreas(functionalAreaMerged);
  };

  const handleFAChange = (value) => {
    setJobTitle([]);
    setVenue([]);
    setFunctionalArea(value);
    let jobTitleData = [];
    value.forEach((value) => {
      jobTitleData.push(functionalAreas.find((c) => c.name === value));
    });
    let jobTitleMerged = removeDuplicateObjectFromArray(
      [].concat.apply(
        [],
        jobTitleData.map((item) => item.jobTitles)
      )
    );
    setJobTitles(jobTitleMerged);
  };
  const handleJobTitleChange = (value) => {
    setVenue([]);
    setJobTitle(value);
    let venueData = [];
    value.forEach((value) => {
      venueData.push(jobTitles.find((c) => c.name === value));
    });
    const locations = [].concat.apply(
      [],
      venueData.map((item) => item.locations)
    );
    setRole(
      locations.map((el) => {
        return {
          venue: el.name,
          roleId: el.roleOffer.id,
          roleOfferId: el.roleOffer.role_offer_id,
        };
      })
    );
    let venueMerged = removeDuplicateObjectFromArray(locations);
    const venueListWithId = venueMerged.filter(venue => venue.roleOffer.role_offer_id !== null)
    setVenues(venueListWithId);
  };
  const handleVenueChange = (value) => {
    const roles = role.filter((el) => value.includes(el.venue));
    let idList = [];
    roles.map((el) => idList.push(el.roleOfferId));
    setRoleOfferId(idList);
    setVenue(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const selectAllEntity = (e) => {
    e.target.checked === true ? handleEntityChange(entities) : setEntity([]);
    setEntitySelectOpened(false);
  };

  const selectAllFa = (e) => {
    e.target.checked === true
      ? handleFAChange(functionalAreas.map((fa) => fa.name))
      : setFunctionalArea([]);
    setFaSelectOpened(false);
  };

  const selectAllRoles = (e) => {
    e.target.checked === true
      ? handleJobTitleChange(jobTitles.map((job) => job.name))
      : setJobTitle([]);
    setRoleSelectOpened(false);
  };

  const selectAllVenues = (e) => {
    e.target.checked === true
      ? handleVenueChange(venues.map((venue) => venue.name))
      : setVenue([]);
    setVenueSelectOpened(false);
  };

  const selectAllStatus = (e) => {
    e.target.checked === true
      ? handleStatusChange(statusList.map((status) => status))
      : setStatus([]);
    setStatusSelectOpened(false);
  };

  const selectAllLocations = (e) => {
    e.target.checked === true
      ? handleLocationChange(locationList.map((location) => location))
      : setLocation([]);
    setLocationSelectOpened(false);
  };

  const resetAll = () => {
    setEntity([]);
    setFunctionalArea([]);
    setJobTitle([]);
    setVenue([]);
    setStatus([]);
    setLocation([]);
    setOverallAssignments([]);
    setVolunteerDemographics({});
  };

  return (
    <div>
      <Space
        direction="vertical"
        className="filters assignin-to-component card"
        style={{ width: "100%" }}
      >
        <form
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <Select
            mode="multiple"
            defaultValue="Entity"
            placeholder="Entity"
            showSearch
            optionFilterProp="children"
            loading={dataLoading}
            onChange={handleEntityChange}
            value={entity}
            open={entitySelectOpened}
            onFocus={() => setEntitySelectOpened(true)}
            onBlur={() => setEntitySelectOpened(false)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Checkbox
                  style={{
                    margin: "4px 8px",
                  }}
                  onFocus={() => setEntitySelectOpened(true)}
                  onChange={selectAllEntity}
                  checked={entities.length === entity.length}
                >
                  All
                </Checkbox>
              </>
            )}
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
            mode="multiple"
            disabled={isFADisabled}
            placeholder="Functional Area"
            defaultValue="Functional Area"
            showSearch
            optionFilterProp="children"
            onChange={handleFAChange}
            value={functionalArea}
            open={faSelectOpened}
            onFocus={() => setFaSelectOpened(true)}
            onBlur={() => setFaSelectOpened(false)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Checkbox
                  style={{
                    margin: "4px 8px",
                  }}
                  onChange={selectAllFa}
                  onFocus={() => setFaSelectOpened(true)}
                  checked={functionalAreas.length === functionalArea.length}
                >
                  All
                </Checkbox>
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
            mode="multiple"
            disabled={isJobTitleDisabled}
            placeholder="Role"
            defaultValue="Role"
            showSearch
            optionFilterProp="children"
            onChange={handleJobTitleChange}
            value={jobTitle}
            open={roleSelectOpened}
            onFocus={() => setRoleSelectOpened(true)}
            onBlur={() => setRoleSelectOpened(false)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Checkbox
                  style={{
                    margin: "4px 8px",
                  }}
                  onChange={selectAllRoles}
                  onFocus={() => setRoleSelectOpened(true)}
                  checked={jobTitles.length === jobTitle.length}
                >
                  All
                </Checkbox>
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
            mode="multiple"
            disabled={isVenueDisabled}
            placeholder="Venue"
            defaultValue="Venue"
            showSearch
            optionFilterProp="children"
            onChange={handleVenueChange}
            value={venue}
            open={venueSelectOpened}
            onFocus={() => setVenueSelectOpened(true)}
            onBlur={() => setVenueSelectOpened(false)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Checkbox
                  style={{
                    margin: "4px 8px",
                  }}
                  onChange={selectAllVenues}
                  onFocus={() => setVenueSelectOpened(true)}
                  checked={venues.length === venue.length}
                >
                  All
                </Checkbox>
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

          {showUserData && (
            <>
              <Select
                mode="multiple"
                placeholder="Status"
                defaultValue="Status"
                showSearch
                optionFilterProp="children"
                value={status}
                onChange={handleStatusChange}
                open={statusSelectOpened}
                onFocus={() => setStatusSelectOpened(true)}
                onBlur={() => setStatusSelectOpened(false)}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Checkbox
                      style={{
                        margin: "4px 8px",
                      }}
                      onChange={selectAllStatus}
                      onFocus={() => setStatusSelectOpened(true)}
                      checked={statusList.length === status.length}
                    >
                      All
                    </Checkbox>
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
                mode="multiple"
                placeholder="Locals/Internationals"
                defaultValue="Locals/Internationals"
                showSearch
                optionFilterProp="children"
                value={location}
                onChange={handleLocationChange}
                open={locationSelectOpened}
                onFocus={() => setLocationSelectOpened(true)}
                onBlur={() => setLocationSelectOpened(false)}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Checkbox
                      style={{
                        margin: "4px 8px",
                      }}
                      onChange={selectAllLocations}
                      onFocus={() => setLocationSelectOpened(true)}
                      checked={locationList.length === location.length}
                    >
                      All
                    </Checkbox>
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
          )}

          <Row gutter={8}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitDisabled}
              >
                Submit
              </Button>
            </Col>

            <Col>
              <Button type="primary" onClick={resetAll}>
                Reset
              </Button>
            </Col>
          </Row>
        </form>
      </Space>
    </div>
  );
};

export default Filters;
