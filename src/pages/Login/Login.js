import React, { useState } from "react";
import {Typography, Form, Input, Button, message, Spin} from 'antd';
import {Link, useNavigate } from "react-router-dom";
import useStore from "../../services/store";

const {Title, Text} = Typography;

const Login = () => {
    const navigate = useNavigate();
    const setToken = useStore(({ setToken }) => setToken);
    const [loading, setLoading] = useState(false);

    const onSubmit = (values) => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_VAP_AUTH_BASE}/token`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
            }
            return response.json();
        })
        .then((data) => {
            console.log('Login Data', data.value);
            localStorage.setItem('token', JSON.stringify(data.value.token));
            localStorage.setItem('email', JSON.stringify(data.value.email))
            localStorage.setItem('role', JSON.stringify(data.value.roles))
            navigate('/');
            setLoading(false);
        })
        .catch((err) => message.error(err.message));
    }

    return (
        <>
        <Title level={2}>Login</Title>
        
        <Form
      name="apply"
      scrollToFirstError
      initialValues={{
        prefix: '50',
      }}
      onFinish = {onSubmit}
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
                message: 'Please input your email!',
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
          autoComplete="on"
        />
        </Form.Item>

        <Form.Item >
            {
                loading ?
                <Spin/>
                :
                <Button className="blue-button" htmlType="submit">
                    Login
                </Button>   
            }            
        </Form.Item>
    </Form>
    <Link to='/forgot-password'><Text>Forgot password</Text></Link>
    </>
    )
}
 
export default Login;