import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, useLocation, Link  } from "react-router-dom";
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
  const [activeMenu, setActiveMenu] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()
  const layoutRef = useRef();
 
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setActiveMenu(['1'])        
        break;
      case '/function-and-requirements':
        setActiveMenu(['2', 'a'])        
        break
      case '/savedfilters':
        setActiveMenu(['2', 'b'])        
        break;
      case '/search-and-assign':
        setActiveMenu(['2', 'c'])        
        break;
      case '/reports':
        setActiveMenu(['3'])        
        break;    
      default:
        break;
    }    
  }, [location.pathname]);

  const sideMenu = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>
    },
    {
      key: "2",
      icon: <ControlOutlined />,
      label: "Management",
      children: [
        {
          key: "a",
          label: <Link to='/function-and-requirements'>{'Function & Requirements'}</Link>
        },
        {
          key: "b",
          label: <Link to="/savedfilters">Saved Filters</Link>
        },
        {
          key: "c",
          label: <Link to='/search-and-assign'>{'Search & Assign'}</Link>
        },
        // {
        //   key: "c",
        //   label: `Assignment Management`,
        //   onClick: () => navigate("/assignment-management"),
        // },
        // {
        //   key: "e",
        //   label: `Users`,
        //   onClick: () => navigate("/users"),
        // },
      ],
    },
    {
      key: "3",
      icon: <FileTextOutlined />,
      label: <Link to="/reports">Report</Link>
    },
  ];

  const toggle = () => {
    if (collapsed) {
      layoutRef.current.style.marginLeft = "180px";
    } else {
      layoutRef.current.style.marginLeft = "80px";
    }
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" >VAP</div>
        {
          location.pathname === '/savedfilters' ?
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={activeMenu}
            items={sideMenu}
            defaultOpenKeys={['2']}
          /> 
          : location.pathname === '/search-and-assign' ?
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={activeMenu}
            items={sideMenu}
            defaultOpenKeys={['2']}
          />
          : location.pathname === '/function-and-requirements' ?
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={activeMenu}
            items={sideMenu}
            defaultOpenKeys={['2']}
          />
          :
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={activeMenu}
            items={sideMenu}
            defaultOpenKeys={['2']}
          />
        }
      </Sider>
      <Layout className="admin-layout" ref={layoutRef}>
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
