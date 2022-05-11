import { Card } from 'antd';
import React from 'react';
import './FulfillmentCard.scss';

const FulfillmentCard = ({title, value, percent}) => {
    return (
        <Card size="small">
            <p>{title} Fulfillment</p>
            <p>{value} out of 100</p>
            <p className='perfect bold'>{percent}%</p>
        </Card>
    );
};

export default FulfillmentCard;