import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Account from '../../components/Account/Account';
import './AdminLayout.scss';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const sideMenu = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'Dashboard',
            onClick: () =>  navigate('/')
        },
        {
            key: '2',
            icon: <UserOutlined />,
            label: 'Search & Assign',
            onClick: () =>  navigate('/search-and-assign')
        },
        {
            key: '3',
            icon: <UserOutlined />,
            label: 'nav 3',
            children: [
                {
                    key: "3-1",
                    label: `option1`
                }
            ]
        },
    ]

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width='230'>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={sideMenu}
                />
            </Sider>
            <Layout className="admin-layout">
                <Header className="admin-layout-background">
                    <Row align="middle" justify="center">
                        <Col md={12} className='header-collapse'>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                            })}
                        </Col>

                        <Col md={12} className='header-account'>
                            <Account/>
                        </Col>                    
                    </Row>
                </Header>
                <Content
                    className="admin-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;