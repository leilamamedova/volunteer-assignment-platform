import { Card } from 'antd';
import React from 'react';

const Cards = ({title, value}) => {
    return (
        <Card size="small">
            <p>{title}</p>
            <p>{value}</p>
        </Card>
    );
};

export default Cards;