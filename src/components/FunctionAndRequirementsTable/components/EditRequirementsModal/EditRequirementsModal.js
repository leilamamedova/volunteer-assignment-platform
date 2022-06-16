import React, { useEffect, useState } from "react";
import { Col, InputNumber, Modal, Row, message, Button } from "antd";
import FilterWrapper from "../../../FilterWrapper/FilterWrapper.jsx";
import "./EditRequirementsModal.scss";
import useStore from "../../../../services/store.js";
import LoadFilterTemplate from "../../../LoadFilterTemplate/LoadFilterTemplate.jsx";
import { RoleOffersFetch } from "../../../../services/fetch.js";

const EditRequirementsModal = ({
  isEditModalVisible,
  setIsEditModalVisible,
  selectedRow,
  headcount,
  levelOfConfidence,
  waitlistFulfillment,
}) => {
  const filterFields = useStore(({ filterFields }) => filterFields);
  const functionalRequirements = useStore(
    ({ functionalRequirements }) => functionalRequirements
  );
  const favoriteFilters = useStore(({ favoriteFilters }) => favoriteFilters);
  const selectedFavoriteFilters = useStore(
    ({ selectedFavoriteFilters }) => selectedFavoriteFilters
  );
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);

  const [count, setCount] = useState();
  const [confidence, setConfidence] = useState();
  const [waitlist, setWaitlist] = useState();
  const [requirement, setRequirement] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    let isFound = false;

    for (let i = 0; i < filterFields.length; i++) {
      if (
        filterFields[i].requirement_name === "Requirement" ||
        filterFields[i].operator === "Operator" ||
        filterFields[i].value?.length === 0
      ) {
        isFound = true;
      }
    }

    if (isFound) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [filterFields]);

  useEffect(() => {
    setCount(headcount);
    setConfidence(levelOfConfidence);
    setWaitlist(waitlistFulfillment);
  }, [headcount, levelOfConfidence, waitlistFulfillment]);

  const handleOk = () => {
    setIsEditModalVisible(false);

    const selectedTemplate = favoriteFilters.find(
      (fav) => fav.id === selectedFavoriteFilters
    );
    typeof selectedTemplate !== "undefined" &&
      selectedTemplate.filters.map((temp) => (temp["id"] = null));

    functionalRequirements.map((el) => {
      if (el.key === selectedRow) {
        el["requirements"] = filterFields;
        el["level_of_confidence"] = confidence;
        el["waitlist_demand"] = waitlist;
        el["total_demand"] = count;
        el["role_offer_id"] = el.key;

        console.log("el", el);
        setRequirement(el);
      }
    });
  };

  useEffect(() => {
    Object.keys(requirement).length !== 0 &&
      fetch(
        `${process.env.REACT_APP_VAP_API_BASE}/FunctionalRequirements/update`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requirement),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((data) => {
          message.success("Success!");
        })
        .catch((err) => message.error(err.message))
        .finally(() => setRequirement({}));

    RoleOffersFetch(setRoleOffers, setDataLoading);
  }, [requirement]);

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <Modal
        centered
        closable={false}
        className="function-and-requirements-modal"
        visible={isEditModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button type="primary" onClick={handleOk} disabled={isDisabled}>
            Ok {isDisabled.toString()}
          </Button>,
        ]}
      >
        <Row gutter={50}>
          <Col>
            <h3>Total Demand</h3>
            <InputNumber value={count} min={0} onChange={setCount} />
          </Col>
          <Col>
            <h3>Level Of Confidence</h3>
            <InputNumber value={confidence} min={0} onChange={setConfidence} />
          </Col>
          <Col>
            <h3>Waitlist Demand</h3>
            <InputNumber value={waitlist} min={0} onChange={setWaitlist} />
          </Col>
        </Row>
        <Row>
          <LoadFilterTemplate />
        </Row>
        <FilterWrapper noReset={true} seeResultBtn={false} />
      </Modal>
    </>
  );
};

export default EditRequirementsModal;
