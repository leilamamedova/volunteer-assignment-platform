import { Card } from 'antd';
import React from 'react';

const Cards = ({title,value, value1=0, value2=0}) => {
    return (
        <Card size="small">
            {
               typeof value === 'undefined'
                ? 
                <>
                    <p>{title}</p>
                    <p>{value1} OUT OF {value2}</p>
                </>
                :
                <>
                    <p>{title}</p>
                    <p>{value}</p>
                </>
            }
        </Card>
    );
};

export default Cards;