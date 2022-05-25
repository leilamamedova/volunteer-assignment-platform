import { useEffect } from "react";
import { Row, Col } from "antd";
import FilterWrapper from "../../components/FilterWrapper/FilterWrapper";
import AssigningTo from "../../components/AssigningTo/AssigningTo";
import AssignSearchResult from "../../components/AssignSearchResult/AssignSearchResult";
import VolunteerProfile from "../../components/VolunteerProfile/VolunteerProfile";
import "./SearchAndAssign.scss";
import LoadFilterTemplate from "../../components/LoadFilterTemplate/LoadFilterTemplate";
import BulkImport from "../../components/BulkImport/BulkImport";
import useStore from "../../services/store";
import { FilterUserFetch } from "../../services/fetch";

const SearchAndAssign = () => {
  const url = `${process.env.REACT_APP_API_BASE}/import-users-data`;

  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);

  useEffect(() => {
    FilterUserFetch(filterFields, setUsersData, setPagination, setDataLoading, 1, 10)
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
              <BulkImport title={"Users"} url={url} />
            </Col>
            <Col>
              <BulkImport action={"Export"} title={"Users"} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={15} wrap={true} justify="space-between">
        <Col className="sa-left" xs={24} md={12} lg={14}>
          <FilterWrapper seeResultBtn={true} />
        </Col>

        <Col className="sa-right" xs={24} md={12} lg={10}>
          <AssigningTo />
        </Col>
      </Row>

      <AssignSearchResult />
      <VolunteerProfile />
    </div>
  );
};

export default SearchAndAssign;
