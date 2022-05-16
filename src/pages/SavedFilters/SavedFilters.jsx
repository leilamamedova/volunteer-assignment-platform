import { useEffect, useState } from "react";
import { Button, Table, Space } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import useStore from "../../services/store";
import NewFilterTemplateModal from "../../components/NewFilterTemplateModal/NewFilterTemplateModal";
import FilterTemplateModal from "../../components/FilterTemplateModal/FilterTemplateModal";
import FilterListModal from "../../components/FilterListModal/FilterListModal";
import { SavedFiltersGet } from "../../services/fetch";

function SavedFilters() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isFilterListModalVisible, setIsFilterListModalVisible] =
    useState(false);
  const [id, setId] = useState("");
  const favoriteFilters = useStore((state) => state.favoriteFilters);
  const addFavoriteFilter = useStore((state) => state.addFavoriteFilter);
  const setFilterFields = useStore((state) => state.setFilterFields);
  const filterFields = useStore((state) => state.filterFields);

  useEffect(() => {
    addFavoriteFilter(favoriteFilters)
    SavedFiltersGet(addFavoriteFilter)
  },[favoriteFilters])

  const handleDelete = (id) => {    
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Templates/delete/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .catch((err) => console.log(err));  
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
          />
          <Button
            type="primary"
            icon={<DeleteFilled />}
            shape="circle"
            danger
            onClick={() => handleDelete(field.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" className="mb-20" onClick={handleModal}>
        Create
      </Button>
      <Table  columns={columns} dataSource={favoriteFilters} />
      <NewFilterTemplateModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <FilterTemplateModal
        isModalVisible={isEditModalVisible}
        setIsModalVisible={setIsEditModalVisible}
        templateId={id}
      />
      <FilterListModal
        isModalVisible={isFilterListModalVisible}
        setIsModalVisible={setIsFilterListModalVisible}
        filterList={filterFields}
      />
    </div>
  );
}

export default SavedFilters;
