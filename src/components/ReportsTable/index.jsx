import { useState, useEffect } from "react";
import { Table, Space, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "./ColumnSearch/index";
import EditReportModal from "./EditReportModal/index";
import useStore from "../../services/store";
import { ReportTemplateFetch } from "../../services/fetch";

const { Link } = Typography;

function ReportsTable() {
  const setReportTemplates = useStore((state) => state.setReportTemplates);
  const reportTemplates = useStore((state) => state.reportTemplates);
  const setReportTemplate = useStore((state) => state.setReportTemplate);

  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [editModal, setEditModal] = useState(false);

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Reports/${id}`, {
      method: "DELETE",
    })
      .then(() => ReportTemplateFetch(setReportTemplates))
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    reportTemplates.forEach((el) =>
      el.id === id ? setReportTemplate(el) : ""
    );
    setId(id);
    handleModal();
  };
  const handleModal = () => {
    setEditModal(true);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "User Columns",
      dataIndex: "volunteer_columns",
      key: "volunteer_columns",
      ...getColumnSearchProps("role_offer_columns"),
      render: (el) => el.map((col) => <span>{col}, </span>),
    },
    {
      title: "Role Offer Columns",
      dataIndex: "role_offer_columns",
      key: "role_offer_columns",
      ...getColumnSearchProps("role_offer_columns"),
      render: (el) => el.map((col) => <span>{col}, </span>),
    },
    {
      title: "Document",
      dataIndex: "downloadLink",
      key: "document",
      render: (el) => (
        <a className="download-document" href={el} download>
          <Space>
            Download
            <DownloadOutlined />
          </Space>
        </a>
      ),
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "edit",
      render: (el) => <Link onClick={() => handleEdit(el)}>Edit</Link>,
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "delete",
      render: (el) => <Link onClick={() => handleDelete(el)}>Delete</Link>,
    },
  ];

  useEffect(() => {
    ReportTemplateFetch(setReportTemplates);
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={reportTemplates} />
      <EditReportModal
        templateId={id}
        isEditModal={editModal}
        setIsEditModal={setEditModal}
      />
    </>
  );
}

export default ReportsTable;
