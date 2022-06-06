import { useEffect, useState } from "react";
import { Table, Typography, Space, Row, Col, Button } from "antd";
import VolunteerProfile from "../VolunteerProfile/VolunteerProfile";
import { EyeOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "./ColumnSearch/ColumnSearch";
import useStore from "../../services/store";
import ColumnFilter from "../ColumnFilter/ColumnFilter";
import AssignButton from "../StatusChangeActions/AssignButton";
import WaitlistButton from "../StatusChangeActions/WaitlistButton";
import FreeButton from "../StatusChangeActions/FreeButton";
import "./UsersTable.scss";
import { FilterUserFetch, UsersFetch } from "../../services/fetch";

const { Link } = Typography;

const UsersTable = (props) => {
  const [isVolunteerModalVisible, setIsVolunteerModalVisible] = useState(false);
  const [dataKeys, setDataKeys] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tableColumns, setTableColumns] = useState(columns);
  const [userID, setUserID] = useState(0);

  const usersData = useStore(({ usersData }) => usersData);
  const usersDataFields = useStore(({ usersDataFields }) => usersDataFields);
  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const pagination = useStore(({ pagination }) => pagination);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const filterFields = useStore(({ filterFields }) => filterFields);

  const route = props.isAnyStatus ? "ChangeToAnyStatus" : "AssignOrWaitlist";

  useEffect(() => {
    console.log(filterFields);
    if (filterFields.length == 0) {
      UsersFetch(setUsersData, setDataLoading, setPagination, 1, 10);
    } else {
      FilterUserFetch(
        filterFields,
        setUsersData,
        setPagination,
        setDataLoading,
        1,
        10
      );
    }
  }, []);

  //Fetch the active modal data.
  const showVolunteerModal = (id) => {
    setUserID(id);
    setIsVolunteerModalVisible(true);
  };
  // Set data to table
  useEffect(() => {
    if (usersDataFields.length > 0) {
      const keys = usersDataFields.map((item) => {
        return {
          title: item.replaceAll("_", " "),
          dataIndex: item,
          ...getColumnSearchProps(item),
          width: 200,
          ellipsis: true,
        };
      });
      setDataKeys(keys);
    }
  }, [usersDataFields]);

  useEffect(() => {
    if (dataKeys.length > 0) {
      dataKeys.splice(0, 0, {
        title: "Details",
        key: "id",
        width: 200,
        fixed: "left",
        render: (_, field) => (
          <Link
            key={field.candidate_id}
            onClick={() => showVolunteerModal(field.candidate_id)}
          >
            <EyeOutlined />
          </Link>
        ),
      });
      dataKeys.splice(1, 0, {
        title: "#",
        key: "index",
        width: 200,
        render: (_, field, index) => <p key={index}>{index + 1}</p>,
      });
      if (props.isStatusColumn) {
        dataKeys.splice(
          2,
          0,
          dataKeys.splice(
            dataKeys.findIndex((el) => el.title === "status"),
            1
          )[0]
        );
      }
      setColumns(dataKeys);
      setTableColumns(dataKeys);
    }
  }, [dataKeys]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedUsers(selectedRowKeys);
    },
  };

  const handleColumns = (value) => {
    const result = [];
    if (value.length === 0) {
      setTableColumns(columns);
    } else {
      for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < value.length; j++) {
          if (columns[i].title === value[j]) {
            result.push(columns[i]);
          }
        }
      }
      setTableColumns(result);
    }
  };

  const handlePagination = (pageNumber, pageSize) => {
    if (filterFields.length == 0) {
      UsersFetch(
        setUsersData,
        setDataLoading,
        setPagination,
        pageNumber,
        pageSize
      );
    } else {
      FilterUserFetch(
        filterFields,
        setUsersData,
        setPagination,
        setDataLoading,
        pageNumber,
        pageSize
      );
    }
  };

  return (
    <>
      <div className="assign-search-result">
        <Row justify="space-between" gutter={16}>
          <Col>
            <Space align="stretch">
              <ColumnFilter columns={columns} handleColumns={handleColumns} />
            </Space>
          </Col>
          <Col>
            <Space>
              {props.isAssignAction ? (
                <AssignButton
                  route={route}
                  data={selectedUsers}
                  users={selectedUsers}
                />
              ) : (
                ""
              )}
              {props.isWaitlistAction ? (
                <WaitlistButton
                  route={route}
                  data={selectedUsers}
                  users={selectedUsers}
                />
              ) : (
                ""
              )}
              {props.isFreeAction ? (
                <FreeButton data={selectedUsers} users={selectedUsers} />
              ) : (
                ""
              )}
            </Space>
          </Col>
        </Row>

        <Table
          className="custom-table-cell--width"
          rowSelection={{
            ...rowSelection,
          }}
          scroll={{ x: 240 }}
          columns={tableColumns}
          dataSource={usersData}
          loading={dataLoading}
          pagination={{
            onChange: (pageNumber, pageSize) =>
              handlePagination(pageNumber, pageSize),
            total: pagination,
          }}
        />
      </div>
      <VolunteerProfile
        isModalVisible={isVolunteerModalVisible}
        setIsVolunteerModalVisible={setIsVolunteerModalVisible}
        userID={userID}
      />
    </>
  );
};

export default UsersTable;
