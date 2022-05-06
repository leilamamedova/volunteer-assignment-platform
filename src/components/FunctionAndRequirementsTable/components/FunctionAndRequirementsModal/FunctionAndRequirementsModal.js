import React from 'react';
import { Modal, Col, Row, Select, Tag } from 'antd';
import useStore from '../../../../services/store';
import './FunctionAndRequirementsModal.scss';

const { Option } = Select;

const FunctionAndRequirementsModal = ({isModalVisible, setIsModalVisible, selectedRow}) => {
    const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);
    const setFunctionalRequirements = useStore(({setFunctionalRequirements})=>setFunctionalRequirements);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSelect = value => {
        setFunctionalRequirements([...functionalRequirements, {id: selectedRow, requirement: value}])     
    }
    
    const deleteTag = (tag) => {
        const filterTags = functionalRequirements.filter(item => item.requirement !== tag)
        setFunctionalRequirements(filterTags);
    }

    console.log('functionalRequirements', functionalRequirements);

    return (
        <>
            <Modal centered closable={false} className='function-and-requirements-modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row className='add-requirements'>
                    <Col span={8}>
                        <h3>Add requirements</h3>
                    </Col>

                    <Col span={8} offset={8}>
                        <Select defaultValue="default" onSelect={handleSelect}>
                            <Option value="default" disabled>Choose requirements</Option>
                            <Option value="lorem">Lorem</Option>
                            <Option value="ipsum">Ipsum</Option>
                        </Select>                        
                    </Col>
                    {
                        functionalRequirements.map((tag, index)=> (
                            tag.id === selectedRow ?   
                            <Tag key={index} closable onClose={() => deleteTag(tag.requirement)}>{tag.requirement}</Tag>
                            :
                            null
                        ))
                    }
                </Row>
            </Modal>
        </>
    );
};

export default FunctionAndRequirementsModal;