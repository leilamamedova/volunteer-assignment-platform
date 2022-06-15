import React, { useState } from "react";
import {Typography, Form, Input, Button, message, Spin} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const {Title} = Typography;

const ResetPassword = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [helpText, setHelpText] = useState('');
    const navigate = useNavigate();

    const onSubmit = (values) => {
        if(values.newPassword === values.confirmPassword) {
            setStatus('');
            setHelpText('');
            setLoading(true);
            fetch(`${process.env.REACT_APP_VAP_AUTH_BASE}/resetPassword`, {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email, newPassword: values.newPassword, token: token}),
            })
            .then((response) => {
                if (!response.ok) {
                setLoading(false);
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
                }
                return response.json();
            })
            .then((data) => {
                navigate('/login');
                setLoading(false);
            })
            .catch((err) => message.error(err.message));
        }else{
            setStatus('error');
            setHelpText('Passwords do not match!');
        }
    }

    return (
        <>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} type='link'/>
        <Title level={2}>Change Password</Title>
        
        <Form
      name="apply"
      scrollToFirstError
      initialValues={{
        prefix: '50',
      }}
      onFinish = {onSubmit}
    >

        <Form.Item
            name="newPassword"
            validateStatus={status}
            help={helpText}
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
          autoComplete="on"
        />
        </Form.Item>

        <Form.Item
            name="confirmPassword"
            validateStatus={status}
            help={helpText}
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
          autoComplete="on"
        />
        </Form.Item>

        <Form.Item >
            {
                loading ?
                <Spin/>
                :
                <Button className="blue-button" htmlType="submit">
                    Change
                </Button>   
            }           
        </Form.Item>
    </Form>
    </>
    )
}
 
export default ResetPassword;