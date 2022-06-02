import { Card } from 'antd';
import React from 'react';

const Cards = ({title, value1=0, value2=0}) => {
    return (
        <Card size="small">
            <p>{title}</p>
            <p>{value1} OUT OF {value2}</p>
        </Card>
    );
};

export default Cards;