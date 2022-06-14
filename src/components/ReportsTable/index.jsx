import { useState, useEffect } from "react";
import { Table, Typography, Button, message } from "antd";
import {
  DownloadOutlined,
  DeleteTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import { getColumnSearchProps } from "./ColumnSearch/index";
import EditReportModal from "./EditReportModal/index";
import useStore from "../../services/store";
import { ReportTemplateFetch } from "../../services/fetch";

const { Link } = Typography;

function ReportsTable() {
  const setReportTemplates = useStore((state) => state.setReportTemplates);
  const reportTemplates = useStore((state) => state.reportTemplates);
  const setReportTemplate = useStore((state) => state.setReportTemplate);

  const [id, setId] = useState();
  const [editModal, setEditModal] = useState(false);

  const handleDocumentDownload = (id) => {
    const template = reportTemplates.find((el) => el.id === id);

    if (template) {
      message.success("Attempting Download");
      fetch(`${process.env.REACT_APP_API_BASE}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_name: template.name,
          role_columns: template.role_offer_columns,
          vol_columns: template.volunteer_columns,
          role_filters: template.role_offer_filters,
          vol_filters: template.volunteer_filters,
        }),
      })
        .then((res) => {
          message.success("Document is ready to download !");
          return res.blob();
        })
        .then((blob) => {
          return window.URL.createObjectURL(blob);
        })
        .then((uril) => {
          let a = document.createElement("a");
          a.href = uril;
          a.download = `${template.name}.xlsx`;
          a.click();
        })
        .catch((err) => {
          message.error("Unknown Error Happened");
          console.log(err);
        });
    }
  };

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
      dataIndex: "id",
      key: "document",
      render: (el) => (
        <Button
          onClick={() => handleDocumentDownload(el)}
          icon={<DownloadOutlined />}
        >
          Download
        </Button>
      ),
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "edit",
      render: (el) => (
        <Link onClick={() => handleEdit(el)}>
          <EditTwoTone />
        </Link>
      ),
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "delete",
      render: (el) => (
        <Link onClick={() => handleDelete(el)}>
          <DeleteTwoTone />
        </Link>
      ),
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
        scroll={{y: 500}}
        pagination={{
          defaultPageSize: 100
        }}
      />
    </>
  );
}

export default ReportsTable;
