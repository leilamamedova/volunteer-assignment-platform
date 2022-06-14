import { useEffect, useState } from "react";
import { Button, Table, Space, message } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import useStore from "../../services/store";
import NewFilterTemplateModal from "../../components/NewFilterTemplateModal/NewFilterTemplateModal";
import FilterTemplateModal from "../../components/FilterTemplateModal/FilterTemplateModal";
import ListModal from "../../components/ListModal/ListModal";
import {
  SavedFiltersGet,
  UsersFieldsFetch,
  NewUsersFieldsFetch,
} from "../../services/fetch";
import { getColumnSearchProps } from "../../components/UsersTable/ColumnSearch/ColumnSearch";
import "./SavedFilters.scss";

function SavedFilters() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isFilterListModalVisible, setIsFilterListModalVisible] =
    useState(false);
  const [id, setId] = useState("");
  const [disableAction, setDisableAction] = useState(true);

  const favoriteFilters = useStore((state) => state.favoriteFilters);
  const addFavoriteFilter = useStore((state) => state.addFavoriteFilter);
  const setFilterFields = useStore((state) => state.setFilterFields);
  const filterFields = useStore((state) => state.filterFields);
  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setUsersDataFields = useStore(
    ({ setUsersDataFields }) => setUsersDataFields
  );
  const setNewUsersDataFields = useStore(
    ({ setNewUsersDataFields }) => setNewUsersDataFields
  );

  const systemRole = useStore(({ systemRole }) => systemRole);

  useEffect(() => {
    systemRole.some((el) => el === "Admin")
      ? setDisableAction(false)
      : setDisableAction(true);
  }, [systemRole]);

  useEffect(() => {
    addFavoriteFilter(favoriteFilters);
  }, [favoriteFilters]);

  useEffect(() => {
    SavedFiltersGet(addFavoriteFilter, setDataLoading);
    UsersFieldsFetch(setUsersDataFields);
    NewUsersFieldsFetch(setNewUsersDataFields);
  }, []);

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        message.success("Success!");
        SavedFiltersGet(addFavoriteFilter);
      })
      .catch((err) => message.error(err.message));
  };

  const handleModal = () => {
    setIsModalVisible(true);
  };

  //Collects the Template's filters and id
  //---------------------------------------
  const handleEditModal = (id) => {
    const el = favoriteFilters.find((el) => el.key === id);
    setFilterFields(el.filters);
    setId(id);
    setIsEditModalVisible(true);
  };
  const handleFilterListModal = (id) => {
    const el = favoriteFilters.find((el) => el.key === id);
    setFilterFields(el.filters);
    setIsFilterListModalVisible(true);
  };
  // Table Data -- Column
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Filters List",
      dataIndex: "filters",
      key: "filters",
      render: (_, field) => (
        <a onClick={() => handleFilterListModal(field.key)}>See Filters</a>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, field) => (
        <Space className="action-icons" align="baseline">
          <Button
            type="primary"
            icon={<EditFilled color="#000" />}
            shape="circle"
            ghost
            onClick={() => handleEditModal(field.key)}
            disabled={disableAction}
          />
          <Button
            type="primary"
            icon={<DeleteFilled />}
            shape="circle"
            danger
            onClick={() => handleDelete(field.key)}
            disabled={disableAction}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="mb-20"
        onClick={handleModal}
        disabled={disableAction}
      >
        Create
      </Button>
      <Table
        columns={columns}
        dataSource={favoriteFilters}
        loading={dataLoading}
        scroll={{ y: 500 }}
      />
      <NewFilterTemplateModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <FilterTemplateModal
        isModalVisible={isEditModalVisible}
        setIsModalVisible={setIsEditModalVisible}
        templateId={id}
      />
      <ListModal
        isModalVisible={isFilterListModalVisible}
        setIsModalVisible={setIsFilterListModalVisible}
        list={filterFields}
      />
    </div>
  );
}

export default SavedFilters;
