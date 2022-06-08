import React from "react";
import { Space, Menu, Dropdown, Button } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import './Account.scss';
import useStore from "../../services/store";

const Account = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate('/login');
  }

  const items = [
    { label: <Link to="/change-password">Change Password</Link>, icon:<SettingOutlined />,  key: 'item-1' }, // remember to pass the key prop
    { label: <Button type="link">Sign out</Button>, icon: <LogoutOutlined />, key: 'item-2', onClick: signOut }, // which is required
  ]

  return (
      <Space direction="horizontal" align="baseline" className="account-info">
          <Dropdown overlay={<Menu className="account-dropdown" items={items}/>} trigger={['click']} placement="bottomRight">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Admin <DownOutlined />
              </a>
          </Dropdown>
      </Space>
  )
}
export default Account;