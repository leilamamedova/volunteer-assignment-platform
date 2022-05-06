import React from "react";
import {Typography, Form, Input, Button} from 'antd';
import {Link } from "react-router-dom";

const {Title, Text} = Typography;

const Login = () => {

    return (
        <>
        <Title level={2}>Login</Title>
        
        <Form
      name="apply"
      scrollToFirstError
      initialValues={{
        prefix: '50',
      }}
    >

        <Form.Item
            name="email"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid!',
            },
            {
                required: true,
                message: 'Please input your login!',
            },
            ]}
        >
            <Input placeholder="Login"/>
        </Form.Item>

        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
        >
        <Input
          type="password"
          placeholder="Password"
        />
        </Form.Item>

        <Form.Item >
            <Link to='/'>
                <Button className="blue-button" htmlType="submit">
                    Login
                </Button>            
            </Link>
            
        </Form.Item>
    </Form>
    <Link to='/change-password'><Text>Change password</Text></Link>
    </>
    )
}
 
export default Login;