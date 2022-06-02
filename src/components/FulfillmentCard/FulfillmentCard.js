import { Card } from 'antd';
import React from 'react';
import './FulfillmentCard.scss';

const FulfillmentCard = ({title, value1=0, value2=0, percent=0}) => {
    return (
        <Card size="small">
            <p>{title} Demand</p>
            <p>{value1} out of {value2}</p>
            <p className='perfect bold'>{percent}%</p>
        </Card>
    );
};

export default FulfillmentCard;