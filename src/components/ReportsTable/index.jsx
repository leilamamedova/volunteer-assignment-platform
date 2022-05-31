import { useState, useEffect } from "react";
import { Table, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "./ColumnSearch/index";

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
];

function ReportsTable() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_VAP_API_BASE}/Reports`)
      .then((response) => response.json())
      .then((data) => setData(data.value))
      .catch((err) => console.log(err));
  }, []);

  return <Table columns={columns} dataSource={data} />;
}

export default ReportsTable;
