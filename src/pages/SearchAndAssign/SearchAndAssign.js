import { useEffect } from "react";
import { Row, Col, Button } from "antd";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import AssigningTo from "../../components/AssigningTo/AssigningTo";
import AssignSearchResult from "../../components/AssignSearchResult/AssignSearchResult";
import LoadFilterTemplate from "../../components/LoadFilterTemplate/LoadFilterTemplate";
import BulkImport from "../../components/BulkImport/BulkImport";
import useStore from "../../services/store";
import { UsersFieldsFetch } from "../../services/fetch";
import { DownloadOutlined } from "@ant-design/icons";
import "./SearchAndAssign.scss";

const SearchAndAssign = () => {
  const importUrl = `${process.env.REACT_APP_API_BASE}/import-users-data`;
  const exportUrl = `${process.env.REACT_APP_API_BASE}/export-volunteers`;
  
  const setUsersDataFields = useStore(({ setUsersDataFields }) => setUsersDataFields);

  useEffect(() => {
    UsersFieldsFetch(setUsersDataFields);   
  }, [])

  return (
    <div className="search-and-assign">
      <Row justify="space-between">
        <Col>
          <LoadFilterTemplate />
        </Col>

        <Col>
          <Row gutter={16}>
            <Col>
              <BulkImport title={"Users"} url={importUrl} />
            </Col>
            <Col>
              <a href={exportUrl} download>
                <Button icon={<DownloadOutlined />}>Export Users</Button>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={15} wrap={true} justify="space-between">
        <Col className="sa-left" xs={24} md={12} lg={14}>
          <FilterWrapper seeResultBtn={true} noReset={true} />
        </Col>

        <Col className="sa-right" xs={24} md={12} lg={10}>
          <AssigningTo />
        </Col>
      </Row>

      <AssignSearchResult />    
    </div>
  );
};

export default SearchAndAssign;
