import React, { useState } from "react";
import {Typography, Form, Input, Button, message, Spin} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const {Title} = Typography;

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (values) => {
            setLoading(true);
            fetch(`${process.env.REACT_APP_VAP_AUTH_BASE}/resetPasswordEmail`, {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((response) => {
                if (!response.ok) {
                setLoading(false);
                message.error("Something went wrong...");
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
                }
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setShowText(true);
            })
            .catch((err) => message.error(err.message));
    }

    return (
        <>
        {showText ?
        <>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} type='link'/>
            <Title level={2}>Check Email</Title>
            <p>Please check your email to reset password</p>
        </>
        :
        <>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} type='link'/>
            <Title level={2}>Reset Password</Title>
            
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
                    <Input placeholder="Email"/>
                </Form.Item>

                <Form.Item >
                    {
                        loading ?
                        <Spin/>
                        :
                        <Button className="blue-button" htmlType="submit">
                            Reset
                        </Button>   
                    }            
                </Form.Item>
            </Form>
        </>       
    }        
    </>
    )
}
 
export default ForgotPassword;