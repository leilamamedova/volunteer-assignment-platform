import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import {
  ControlOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Account from "../../components/Account/Account";
import "./AdminLayout.scss";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (performance.getEntriesByType("navigation")) {
      navigate("/");
    }
  }, []);

  const sideMenu = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      icon: <ControlOutlined />,
      label: "Management",
      children: [
        {
          key: "a",
          label: `Function & Requirements`,
          onClick: () => navigate("/function-and-requirements"),
        },
        {
          key: "b",
          label: `Search & Assign`,
          onClick: () => navigate("/search-and-assign"),
        },
        {
          key: "c",
          label: `Assignment Management`,
          onClick: () => navigate("/assignment-management"),
        },
        {
          key: "e",
          label: `Users`,
          onClick: () => navigate("/users"),
        },
      ],
    },
    {
      key: "3",
      icon: <FileTextOutlined />,
      label: "Report",
    },
  ];

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width="230">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={sideMenu}
        />
      </Sider>
      <Layout className="admin-layout">
        <Header className="admin-layout-background">
          <Row align="middle" justify="center">
            <Col md={12} className="header-collapse">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </Col>

            <Col md={12} className="header-account">
              <Account />
            </Col>
          </Row>
        </Header>
        <Content
          className="admin-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
