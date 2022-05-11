import React from 'react';
import { Modal } from 'antd';
import './FunctionAndRequirementsModal.scss';

const FunctionAndRequirementsModal = ({isReqModalVisible, setIsReqEditModalVisible, functionalRequirements}) => {
    const handleOk = () => {
        setIsReqEditModalVisible(false);
    };

    const handleCancel = () => {
        setIsReqEditModalVisible(false);
    };    

    return (
        <>
            <Modal centered closable={false} className='function-and-requirements-modal' visible={isReqModalVisible} onOk={handleOk} onCancel={handleCancel}>
               {functionalRequirements.map((item,index) => (
                   <p key={index}>{item.requirement} {item.comparison} {item.value}</p>
               ))}
            </Modal>
        </>
    );
};

export default FunctionAndRequirementsModal;