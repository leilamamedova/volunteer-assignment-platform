import { useState, useEffect } from "react";
import { Table, Space, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "./ColumnSearch/index";

const { Link } = Typography;

function ReportsTable() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Reports/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchData())
      .catch((err) => console.log(err));
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
      title: "Delete",
      dataIndex: "id",
      key: "delete",
      render: (el) => <Link onClick={() => handleDelete(el)}>Delete</Link>,
    },
  ];
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Reports`)
      .then((response) => response.json())
      .then((data) => setData(data.value))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <Table columns={columns} dataSource={data} />;
}

export default ReportsTable;
