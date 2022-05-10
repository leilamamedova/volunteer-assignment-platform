import React, { useState } from 'react';
import { Col, Row, Select, Table } from 'antd';
import './MatchingModal.scss';

const { Option } = Select;

const columns = [
    {
      title: 'Requirement',
      dataIndex: 'requirement',
      key: 'requirement',
    },
    {
        title: 'Comparison',
        dataIndex: 'comparison',
        key: 'comparison',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
];

const data = [
    {
        key: '1',
        requirement: 'Age',
        comparison: '>',
        value: 19,
    },
    {
        key: '2',
        requirement: 'Gender',
        comparison: 'Contains',
        value: 'Female',
    }
]

const selectOptions = ['Functional Requirements', 'Template Requirements', 'Both']

const MatchingModal = () => {
    const [selectedFunctional, setSelectedFunctional] = useState([])

    const handleFunctional = (value) => {
        setSelectedFunctional(prev => [...prev, {
            key: Math.floor(Math.random() * 1000),
            requirement: value,
            value: 32,
          },
        ])
    }

    return (
        <div className='matching-modal'>
            <div className='matching-modal-select'>
                <Select 
                    defaultValue="Select requirement" 
                    onChange={handleFunctional}
                >
                    {selectOptions.map((option, index) => (
                        <Option key={index} value={option}>{option}</Option>
                    ))}
                </Select>                
            </div>
             <Row align='top'>
                <Col span={10}>
                    <h5>Requirements:</h5>
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        showHeader={false}
                        pagination={false}
                    />
                </Col>

                <Col span={10} offset={4}>
                    <h5>Сoincidences:</h5>
                    <div className='matching-modal-coincidences'>
                        <p className='match'>Age: 35</p>
                        <p className='not-match'>Gender: Male</p>
                    </div>               
                </Col>
            </Row>
        </div>
    );
};

export default MatchingModal;