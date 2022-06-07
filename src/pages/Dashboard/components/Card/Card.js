import { Card } from 'antd';
import React from 'react';

const Cards = ({title, value=0, value1=0, value2=0}) => {
    return (
        <Card size="small">
            {
               title === 'Total Assigned' || title === 'Total Waitlisted'
                ? 
                <>
                    <p>{title}</p>
                    <p>{value}</p>
                </>
                :
                <>
                    <p>{title}</p>
                    <p>{value1} OUT OF {value2}</p>
                </>
            }
        </Card>
    );
};

export default Cards;