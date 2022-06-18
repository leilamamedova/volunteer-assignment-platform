import { useEffect } from "react";
import { Row, Col, Button } from "antd";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import AssigningTo from "../../components/AssigningTo/AssigningTo";
import AssignSearchResult from "../../components/AssignSearchResult/AssignSearchResult";
import LoadFilterTemplate from "../../components/LoadFilterTemplate/LoadFilterTemplate";
import BulkImport from "../../components/BulkImport/BulkImport";
import useStore from "../../services/store";
import { UsersFieldsFetch, NewUsersFieldsFetch } from "../../services/fetch";
import { DownloadOutlined } from "@ant-design/icons";
import "./SearchAndAssign.scss";

const SearchAndAssign = () => {
  const importUrl = `${process.env.REACT_APP_API_BASE}/import-users-data`;
  const exportUrl = `${process.env.REACT_APP_API_BASE}/export-volunteers`;
  const setFilterTotal = useStore(({ setFilterTotal }) => setFilterTotal);

  const setUsersDataFields = useStore(
    ({ setUsersDataFields }) => setUsersDataFields
  );
  const setNewUsersDataFields = useStore(
    ({ setNewUsersDataFields }) => setNewUsersDataFields
  );
  const setActiveRoleOfferId = useStore(
    ({ setActiveRoleOfferId }) => setActiveRoleOfferId
  );
  const systemRole = useStore(({ systemRole }) => systemRole);

  useEffect(() => {
    UsersFieldsFetch(setUsersDataFields);
    NewUsersFieldsFetch(setNewUsersDataFields);

    return () => {
      setActiveRoleOfferId(0);
      setFilterTotal(0);
    };
  }, []);

  return (
    <div className="search-and-assign">
      <Row justify="space-between">
        <Col>
          <Row gutter={16}>
            {systemRole.some((el) => el === "Admin") ? (
              <Col>
                <BulkImport title={"Candidates"} url={importUrl} />
              </Col>
            ) : null}
            <Col>
              <a href={exportUrl} download>
                <Button icon={<DownloadOutlined />}>Export Candidates</Button>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={15} wrap={true} justify="space-between">
        <Col xs={24}>
          <AssigningTo />
        </Col>
        <Col xs={24}>
          <FilterWrapper seeResultBtn={true} blankStart={true} isReset={true} />
        </Col>
      </Row>

      <AssignSearchResult />
    </div>
  );
};

export default SearchAndAssign;
