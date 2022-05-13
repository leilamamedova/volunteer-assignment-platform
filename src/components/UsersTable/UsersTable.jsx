import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import VolunteerProfile from "../VolunteerProfile/VolunteerProfile";
import { getColumnSearchProps } from "./ColumnSearch/ColumnSearch";
import useStore from "../../services/store";
import './UsersTable.scss';

const { Link } = Typography;

const AssignSearchResult = () => {
  const [isVolunteerModalVisible, setIsVolunteerModalVisible] = useState(false);
  const [dataKeys, setDataKeys] = useState([]);
  const [columns, setColumns] = useState([]);
  const [userID, setUserID] = useState([]);
  const usersData = useStore(({usersData}) => usersData);
  const usersDataFields = useStore(({usersDataFields}) => usersDataFields);

  //Fetch the active modal data.
  const showVolunteerModal = (id) => {
    setUserID(id);
    setIsVolunteerModalVisible(true);
  };

  // Set data to table
  useEffect(() => {
    usersDataFields.length>0 && usersDataFields.map((item) => {
      setDataKeys((prev) => [...prev,
        { 
          title: item.replaceAll('_', " "),
          dataIndex: item,
          ...getColumnSearchProps(item)
        }
      ])
    })    
  }, [usersDataFields])

  useEffect(()=> {
      dataKeys.length>0 && (dataKeys.find(el => el.dataIndex === 'first_name')['render'] = 
        (data, record) => <Link onClick={() => showVolunteerModal(record.id)}>{data}</Link>    
      )
      setColumns(dataKeys);
  },[dataKeys])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <>
      <div className="assign-search-result">
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          scroll={{ x: 240 }}
          columns={columns}
          dataSource={usersData}
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

export default AssignSearchResult;
