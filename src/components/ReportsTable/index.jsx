import { Table, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "./ColumnSearch/index";

const dataSource = [
  {
    key: 1,
    id: 111333,
    name: "Temp1",
    columns: ["ID", "Age", "Location", "Language"],
    status: "pending",
    downloadLink: "google.com",
  },
  {
    key: 2,
    id: 131323,
    name: "Temp2",
    columns: ["ID", "Age", "Location", "Language"],
    status: "ready",
    downloadLink: "google.com",
  },
  {
    key: 3,
    id: 111343,
    name: "Temp3",
    columns: ["ID", "Age", "Location", "Language"],
    status: "pending",
    downloadLink: "google.com",
  },
  {
    key: 4,
    id: 431333,
    name: "Temp4",
    columns: ["ID", "Age", "Location", "Language"],
    status: "pending",
    downloadLink: "google.com",
  },
  {
    key: 5,
    id: 393033,
    name: "Temp5",
    columns: ["ID", "Age", "Location", "Language"],
    status: "pending",
    downloadLink: "google.com",
  },
  {
    key: 6,
    id: 895673,
    name: "Temp6",
    columns: ["ID", "Age", "Location", "Language"],
    status: "pending",
    downloadLink: "google.com",
  },
  {
    key: 7,
    id: 200938,
    name: "Temp7",
    columns: ["ID", "Age", "Location", "Language"],
    status: "pending",
    downloadLink: "google.com",
  },
];

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
    title: "Columns",
    dataIndex: "columns",
    key: "columns",
    ...getColumnSearchProps("columns"),
    render: (el) => el.map((col) => <span>{col} </span>),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ...getColumnSearchProps("status"),
    render: (el) => <p className={el + " reportStatus"}>{el}</p>,
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
  return <Table columns={columns} dataSource={dataSource} />;
}

export default ReportsTable;
