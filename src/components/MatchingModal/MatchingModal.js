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
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
];

const selectOptions = [
    {
        value: 'Age',
        data: 'Age'
    },
    {
        value: 'Gender',
        data: 'Gender'
    },
]

const MatchingModal = () => {
    const [selectedFunctional, setSelectedFunctional] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState([])

    const handleFunctional = (value) => {
        setSelectedFunctional(prev => [...prev, {
            key: Math.floor(Math.random() * 1000),
            requirement: value,
            value: 32,
          },
        ])
    }

    const handleTemplate = (value) => {
        setSelectedTemplate(prev => [...prev, {
            key: Math.floor(Math.random() * 1000),
            requirement: value,
            value: 40,
          },
        ])
    }

    return (
        <Row className='matching-modal'>
            <Col span={14}>
                <div className='matching-modal-requirements'>
                    <h5>Functional Requirements</h5>
                    <Select 
                        showSearch 
                        optionFilterProp="children"
                        defaultValue="Select requirement" 
                        onChange={handleFunctional}
                    >
                        {selectOptions.map((option, index) => (
                            <Option key={index} value={option.value}>{option.data}</Option>
                        ))}
                    </Select>
                    
                    <Table 
                        pagination={false} 
                        showHeader={false} 
                        dataSource={selectedFunctional} 
                        columns={columns}  
                        scroll={{ x: false, y: 120 }}
                    />                
                </div>

                <div className='matching-modal-requirements'>
                    <h5>Template Requirements</h5>
                    <Select 
                        showSearch 
                        optionFilterProp="children"
                        defaultValue="Select requirement" 
                        onChange={handleTemplate}
                    >
                        {selectOptions.map((option, index) => (
                            <Option key={index} value={option.value}>{option.data}</Option>
                        ))}
                    </Select>
                  
                    <Table 
                        pagination={false} 
                        showHeader={false} 
                        dataSource={selectedTemplate} 
                        columns={columns}  
                        scroll={{ x: false, y: 120 }}
                    />
                </div>
            </Col>

            <Col span={10}>
                <h5>Сoincidences:</h5>
                <div className='matching-modal-coincidences'>
                    <p className='match'>Age: 35</p>
                    <p className='not-match'>Age: 35</p>
                    <p className='match'>Age: 35</p>
                    <p className='not-match'>Age: 35</p>
                    <p className='match'>Age: 35</p>
                    <p className='not-match'>Age: 35</p>
                    <p className='match'>Age: 35</p>
                    <p className='not-match'>Age: 35</p>
                </div>               
            </Col>
        </Row>
    );
};

export default MatchingModal;