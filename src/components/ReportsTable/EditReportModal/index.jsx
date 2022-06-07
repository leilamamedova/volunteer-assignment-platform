import { Modal, Button, Select, message } from "antd";
import { useEffect, useState } from "react";
import useStore from "../../../services/store";
import SelectedColumns from "../../ReportCreateModal/Columns/SelectedColumns";
import SelectedROColumns from "../../ReportCreateModal/Columns/SelectedROColumns";
import FilterWrapper from "../../FilterWrapper/FilterWrapper";
import ROFilterWrapper from "../../ROFilterWrapper";
import { ReportTemplateFetch } from "../../../services/fetch";
const { Option } = Select;

const ROLE_OFFER_FIELDS = [
  "Entity",
  "Functional_Area",
  "Job_Title",
  "Location",
];

function EditReportModal({ templateId, isEditModal, setIsEditModal }) {
  const reportTemplate = useStore((state) => state.reportTemplate);
  const setReportColumns = useStore((state) => state.setReportColumns);
  const setReportROColumns = useStore((state) => state.setReportROColumns);
  const setFilterFields = useStore((state) => state.setFilterFields);
  const setROFilterFields = useStore((state) => state.setROFilterFields);
  const reportColumns = useStore((state) => state.reportColumns);
  const reportROColumns = useStore((state) => state.reportROColumns);
  const filterFields = useStore((state) => state.filterFields);
  const ROfilterFields = useStore((state) => state.ROfilterFields);
  const [userFields, setUserFields] = useState([]);
  const [values, setValues] = useState([]);
  const [valuesRO, setValuesRO] = useState([]);
  const selectedVolunteerColumns = useStore(
    ({ reportColumns }) => reportColumns
  );
  const setSelectedVolunteerColumns = useStore(
    ({ setReportColumns }) => setReportColumns
  );
  const setReportTemplates = useStore(
    ({ setReportTemplates }) => setReportTemplates
  );

  const usersDataFields = useStore(({ usersDataFields }) => usersDataFields);
  useEffect(() => {
    console.log(reportTemplate);
    setReportColumns(reportTemplate.volunteer_columns);
    setReportROColumns(reportTemplate.role_offer_columns);
    if (reportTemplate.volunteer_filters) {
      setFilterFields(reportTemplate.volunteer_filters);
    }
    if (reportTemplate.role_offer_filters) {
      setROFilterFields(reportTemplate.role_offer_filters);
    }
  }, [reportTemplate]);
  useEffect(() => {
    console.log(ROfilterFields);
  }, [ROfilterFields]);
  useEffect(() => {
    setUserFields(usersDataFields);
  }, []);
  useEffect(() => {
    setValues(selectedVolunteerColumns);
  }, [selectedVolunteerColumns]);
  useEffect(() => {
    setValuesRO(reportROColumns);
  }, [reportROColumns]);
  const handleChange = (columns) => {
    setSelectedVolunteerColumns(columns);
  };
  const handleChangeRO = (columns) => {
    setReportROColumns(columns);
  };

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
      role_offer_filters: ROfilterFields || [],
    };
    fetch("https://vap-microservices.herokuapp.com/api/Reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        console.log(res);
        ReportTemplateFetch(setReportTemplates);
      })
      .catch((err) => message.error(err));
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
      <Select
        style={{ width: "300px" }}
        mode="multiple"
        allowClear
        showSearch
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={handleChange}
        value={values}
      >
        {userFields.map((el, index) => (
          <Option key={index} value={el}>
            {el}
          </Option>
        ))}
      </Select>
      <SelectedColumns />
      <h1>Role Offer Columns</h1>
      <Select
        style={{ width: "300px" }}
        mode="multiple"
        allowClear
        showSearch
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={handleChangeRO}
        value={valuesRO}
      >
        {ROLE_OFFER_FIELDS.map((el, index) => (
          <Option key={index} value={el}>
            {el}
          </Option>
        ))}
      </Select>
      <SelectedROColumns />
      <h1>Volunteer Filters</h1>
      <FilterWrapper />
      <h1 className="mt-20">Role Offer Filters</h1>
      <ROFilterWrapper />
    </Modal>
  );
}

export default EditReportModal;
