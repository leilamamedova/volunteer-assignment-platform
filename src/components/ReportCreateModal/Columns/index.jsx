import { useState, useEffect } from "react";
import { Row, Col, Select, Typography, Space } from "antd";
import useStore from "../../../services/store";
import SelectedColumns from "./SelectedColumns";
import SelectedROColumns from "./SelectedROColumns/index";

const { Option } = Select;
const { Title } = Typography;
const ROLE_OFFER_FIELDS = [
  "Entity",
  "Functional_Area",
  "Job_Title",
  "Location",
];
function Columns() {
  const [userFields, setUserFields] = useState([]);
  const [values, setValues] = useState([]);
  const [valuesRO, setValuesRO] = useState([]);
  const selectedVolunteerColumns = useStore(
    ({ reportColumns }) => reportColumns
  );
  const setSelectedVolunteerColumns = useStore(
    ({ setReportColumns }) => setReportColumns
  );
  const reportROColumns = useStore(({ reportROColumns }) => reportROColumns);
  const setReportROColumns = useStore(
    ({ setReportROColumns }) => setReportROColumns
  );
  const NewUsersDataFields = useStore(
    ({ NewUsersDataFields }) => NewUsersDataFields
  );

  useEffect(() => {
    const arr = Object.entries(NewUsersDataFields);
    setUserFields(arr);

    return () => {
      setReportROColumns([]);
      setSelectedVolunteerColumns([]);
    };
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
  return (
    <Space className="w-100 flex-wrap" size={"large"}>
      <Row className="w-100 flex-column">
        <Title className="fs-2xl">Volunteers' Columns</Title>
        <Col span={24} className="text-center">
          <Select
            style={{ width: "300px" }}
            mode="multiple"
            allowClear
            showSearch
            placeholder="Search to Select"
            // optionFilterProp="children"
            // filterOption={(input, option) => option.children.includes(input)}
            // filterSort={(optionA, optionB) =>
            //   optionA.children
            //     .toLowerCase()
            //     .localeCompare(optionB.children.toLowerCase())
            // }
            onChange={handleChange}
            value={values}
          >
            {userFields.map((el, index) => (
              <Option key={index} value={el[0]}>
                {el[0]}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24} className="text-center">
          <SelectedColumns />
        </Col>
      </Row>
      <Row className="w-100 flex-column">
        <Title className="fs-2xl">Role Offers' Columns</Title>
        <Col span={24} className="text-center">
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
        </Col>
        <Col span={24} className="text-center">
          <SelectedROColumns />
        </Col>
      </Row>
    </Space>
  );
}

export default Columns;
