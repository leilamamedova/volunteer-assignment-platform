import { useState } from "react";
import { Button, Table, Space } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import useStore from "../../services/store";
import NewFilterTemplateModal from "../../components/NewFilterTemplateModal/NewFilterTemplateModal";
import FilterTemplateModal from "../../components/FilterTemplateModal/FilterTemplateModal";

function SavedFilters() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const favoriteFilters = useStore((state) => state.favoriteFilters);
  const removeFavoriteFilter = useStore((state) => state.removeFavoriteFilter);
  const setFilterFields = useStore((state) => state.setFilterFields);
  const [id, setId] = useState("");
  const handleDelete = (id) => {
    removeFavoriteFilter(id);
  };

  const handleModal = () => {
    setIsModalVisible(true);
  };

  const handleEditModal = (id) => {
    const el = favoriteFilters.find((el) => el.key === id);
    setFilterFields(el.filters);
    setId(id);
    setIsEditModalVisible(true);
  };
  // Table Data -- Column
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
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
      <Table columns={columns} dataSource={favoriteFilters} />
      <NewFilterTemplateModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <FilterTemplateModal
        isModalVisible={isEditModalVisible}
        setIsModalVisible={setIsEditModalVisible}
        templateId={id}
      />
    </div>
  );
}

export default SavedFilters;
