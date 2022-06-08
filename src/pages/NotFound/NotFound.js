import React from "react";
import { Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const {Title, Text} = Typography;

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-page">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} type='link'/>
            <Title>404</Title>   
            <Text>Not Found</Text>  
        </div>       
    )
}
 
export default NotFound;