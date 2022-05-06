import React from "react";
import {Typography, Form, Input, Button} from 'antd';
import {Link } from "react-router-dom";

const {Title} = Typography;

const ChangePassword = () => {

    return (
        <>
        <Title level={2}>Change Password</Title>
        
        <Form
      name="apply"
      scrollToFirstError
      initialValues={{
        prefix: '50',
      }}
    >

        <Form.Item
            name="old_password"
            rules={[
            {
                required: true,
                message: 'Please input your previous password!',
            },
            ]}
        >
        <Input
          type="password"
          placeholder="Old password"
        />
        </Form.Item>

        <Form.Item
            name="new_password"
            rules={[
            {
                required: true,
                message: 'Please input your new password!',
            },
            ]}
        >
        <Input
          type="password"
          placeholder="New password"
        />
        </Form.Item>

        <Form.Item
            name="confirm_password"
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ]}
        >
        <Input
          type="password"
          placeholder="Confirm password"
        />
        </Form.Item>

        <Form.Item >
            <Link to='/login'>
                <Button className="blue-button" htmlType="submit">
                    Change
                </Button>            
            </Link>
            
        </Form.Item>
    </Form>
    </>
    )
}
 
export default ChangePassword;