import React from "react";
import { Space, Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";
import { DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import './Account.scss';

const menu = (
    <Menu className="account-dropdown">
      <Menu.Item key="1">
        <SettingOutlined />
        <Link to="/change-password">Change Password</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <LogoutOutlined />
        <Link to="/login">Sign out</Link>
      </Menu.Item>
    </Menu>
);

const Account = () => {
    return (
        <Space direction="horizontal" align="baseline" className="account-info">
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Admin <DownOutlined />
                </a>
            </Dropdown>
        </Space>
    )
}
export default Account;