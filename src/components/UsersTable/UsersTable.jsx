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

const { Link } = Typography;

const UsersTable = (props) => {
  const [isVolunteerModalVisible, setIsVolunteerModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [dataKeys, setDataKeys] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tableColumns, setTableColumns] = useState(columns);
  const [userID, setUserID] = useState([]);
  const usersData = useStore(({ usersData }) => usersData);
  const usersDataFields = useStore(({ usersDataFields }) => usersDataFields);
  const tableLoading = useStore(({ tableLoading }) => tableLoading);

  const route = props.isAnyStatus ? "ChangeToAnyStatus" : "AssignOrWaitlist";

  //Fetch the active modal data.
  const showVolunteerModal = (id) => {
    setUserID(id);
    setIsVolunteerModalVisible(true);
  };
  const showStatusModal = (id, status) => {
    setIsStatusModalVisible(true);
  };
  // Set data to table
  useEffect(() => {
    usersDataFields.length > 0 &&
      usersDataFields.map((item) => {
        setDataKeys((prev) => [
          ...prev,
          {
            title: item.replaceAll("_", " "),
            dataIndex: item,
            ...getColumnSearchProps(item),
          },
        ]);
      });
  }, [usersDataFields]);

  useEffect(() => {
    dataKeys.splice(0, 0, {
      title: "#",
      key: "index",
      render: (_, field, index) => <p key={index}>{index + 1}</p>,
    });
    dataKeys.splice(1, 0, {
      title: "Details",
      key: "id",
      render: (_, field) => (
        <Link key={field.id} onClick={() => showVolunteerModal(field.id)}>
          <EyeOutlined />
        </Link>
      ),
    });
    if (props.isStatusColumn) {
      dataKeys.splice(2, 0, {
        title: "Status",
        key: "status",
        ...getColumnSearchProps("status"),
        render: (_, field) => (
          <Space
            key={Math.ceil(Math.random() * 100)}
            className="action-icons"
            align="baseline"
          >
            <p>{field.status}</p>
          </Space>
        ),
      });
    }
    setColumns(dataKeys);
    setTableColumns(dataKeys);
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
                <FreeButton
                  route={route}
                  data={selectedUsers}
                  users={selectedUsers}
                />
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
          loading={tableLoading}
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
