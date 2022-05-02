import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./FunctionAndRequirementsTable.scss";

const columns = [
  {
    title: "Venue",
    dataIndex: "venue",
  },
  {
    title: "Functional Area",
    dataIndex: "functional_area",
  },
  {
    title: "Job Title",
    dataIndex: "job_title",
  },
  {
    title: "Functional Requirements",
    dataIndex: "functional_requirements",
    render: tags => (
      <>
        {tags.map(tag => {
          return (
            <Tag key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Headcount",
    dataIndex: "headcount",
  },
  {
    title: 'Action',
    key: "action",
    render: () => (
        <Space className="action-icons">
            <Button icon={<EditOutlined />} />
        </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    venue: "Lorem Ipsum",
    functional_area: 'Lorem Ipsum',
    job_title: "Lorem Ipsum",
    functional_requirements: ['Lorem', 'Ipsum'],
    headcount: 100
  },
  {
    key: "2",
    venue: "Lorem Ipsum",
    functional_area: 'Lorem Ipsum',
    job_title: "Lorem Ipsum",
    functional_requirements: ['Lorem', 'Ipsum'],
    headcount: 100
  },
  {
    key: "3",
    venue: "Lorem Ipsum",
    functional_area: 'Lorem Ipsum',
    job_title: "Lorem Ipsum",
    functional_requirements: ['Lorem', 'Ipsum'],
    headcount: 100
  },
];

const FARequirementsTable = () => {
  return (
    <div className="function-and-requirements-table">
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default FARequirementsTable;
