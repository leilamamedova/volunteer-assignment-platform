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

  //Fetch the active modal data.
  const showVolunteerModal = (id) => {
    setUserID(id);
    setIsVolunteerModalVisible(true);
  };

  // Set data to table
  useEffect(() => {
    usersData.length>0 && Object.keys(usersData[0]).map((item) => {
      setDataKeys((prev) => [...prev,
        { 
          title: item.replaceAll('_', " "),
          dataIndex: item,
          ...getColumnSearchProps(item)
        }
      ])
    })    
  }, [usersData])

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
