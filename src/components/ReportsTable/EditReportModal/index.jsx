import { Modal, Button } from "antd";
import { useEffect, useState } from "react";
import useStore from "../../../services/store";
import SelectedColumns from "../../ReportCreateModal/Columns/SelectedColumns";
import SelectedROColumns from "../../ReportCreateModal/Columns/SelectedROColumns";
import FilterWrapper from "../../FilterWrapper/FilterWrapper";
import ROFilterWrapper from "../../ROFilterWrapper";

function EditReportModal({ templateId, isEditModal, setIsEditModal }) {
  const reportTemplate = useStore((state) => state.reportTemplate);
  const setReportColumns = useStore((state) => state.setReportColumns);
  const setReportROColumns = useStore((state) => state.setReportROColumns);
  const setFilterFields = useStore((state) => state.setFilterFields);
  const setROFilterFields = useStore((state) => state.setROFilterFields);
  const reportColumns = useStore((state) => state.reportColumns);
  const reportROColumns = useStore((state) => state.reportROColumns);
  const filterFields = useStore((state) => state.filterFields);
  const ROFilterFields = useStore((state) => state.ROFilterFields);

  useEffect(() => {
    setTimeout(() => {
      setReportColumns(reportTemplate.volunteer_columns);
      setReportROColumns(reportTemplate.role_offer_columns);
      setFilterFields([...reportTemplate.volunteer_filters]);
      setROFilterFields(reportTemplate.role_offer_filters);
    }, 1000);
  });
  const handleOk = () => {
    setIsEditModal(false);
  };
  const handleCancel = () => {
    setIsEditModal(false);
  };

  const handleUpdate = () => {
    const postData = {
      id: templateId,
      name: reportTemplate.name,
      volunteer_columns: reportColumns || [],
      role_offer_columns: reportROColumns || [],
      volunteer_filters: filterFields || [],
      role_offer_filters: ROFilterFields || [],
    };
    fetch("https://vap-microservices.herokuapp.com/api/Reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      className="min-w-50vw"
      visible={isEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <h1>Volunteer Columns</h1>
      <SelectedColumns />
      <h1>Role Offer Columns</h1>
      <SelectedROColumns />
      <h1>Volunteer Filters</h1>
      <FilterWrapper />
      <h1 className="mt-20">Role Offer Filters</h1>
      <ROFilterWrapper />
    </Modal>
  );
}

export default EditReportModal;
