import { Modal } from "antd";
import { useState } from "react";

function EditReportModal({ reportTemplate, isEditModal, setIsEditModal }) {
  const [volunteerColumns, setVolunteerColumns] = useState(
    reportTemplate.volunteer_columns
  );
  const [roleOfferColumns, setRoleOfferColumns] = useState(
    reportTemplate.role_offer_columns
  );
  const [volunteerFilters, setVolunteerFilters] = useState(
    reportTemplate.volunteer_filters
  );
  const [roleOfferFilters, setroleOfferFilters] = useState(
    reportTemplate.role_offer_filters
  );

  console.log(reportTemplate);
  const handleOk = () => {
    setIsEditModal(false);
  };
  const handleCancel = () => {
    setIsEditModal(false);
  };
  return (
    <Modal visible={isEditModal} onOk={handleOk} onCancel={handleCancel}>
      <h1>Volunteer Columns</h1>
      {volunteerColumns.map((el) => (
        <p key={el.id}>{el}</p>
      ))}
      <h1>Role Offer Columns</h1>
      {roleOfferColumns.map((el) => (
        <p key={el.id}>{el}</p>
      ))}
    </Modal>
  );
}

export default EditReportModal;
