import React from "react";
import { Typography, Space, Avatar, Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";
import { DownOutlined, BellFilled } from '@ant-design/icons';
import './Account.scss';

const { Title } = Typography;

const menu = (
    <Menu className="account-dropdown">
      <Menu.Item key="0">
        <Space direction="horizontal" className="account-info">
          <Avatar size="large" icon={<DownOutlined />} src=''/>
          <Space direction="vertical" align="start">
              <Title level={5}>Admin</Title>              
          </Space>
        </Space>        
      </Menu.Item>

      <Menu.Item key="1">
        <DownOutlined/>
        <Link to="">Personal settings</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <DownOutlined/>
        <Link to="">Company information</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <BellFilled/>
        <Link to="">Notifications</Link>
      </Menu.Item>

      <Menu.Item key="4">
        <DownOutlined/>
        Sign out
      </Menu.Item>
    </Menu>
);

const Account = () => {
    return (
        <Space direction="horizontal" align="baseline" className="account-info">
            <Avatar size="large" src=''/>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Admin <DownOutlined />
                </a>
            </Dropdown>
        </Space>
    )
}
export default Account;