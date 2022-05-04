import React from 'react';
import { Modal, Upload, message, Button, Col, Row, Select, Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import useStore from '../../../../services/store';
import './FunctionAndRequirementsModal.scss';

const { Option } = Select;

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
};

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
                <Row className='import-requirements'>
                    <Col span={8}>
                        <h3>Import requirements</h3>
                    </Col>

                    <Col span={8} offset={8}>
                        <Upload {...props}  maxCount={1}>
                            <Button icon={<DownloadOutlined />}>Click to Import</Button>
                        </Upload>
                    </Col>
                </Row>

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