import React from 'react';
import { Modal } from 'antd';
import FilterWrapper from '../../../FilterWrapper/FilterWrapper.jsx';
import './FunctionAndRequirementsModal.scss';

const FunctionAndRequirementsModal = ({isModalVisible, setIsModalVisible, selectedRow}) => {
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };    

    return (
        <>
            <Modal centered closable={false} className='function-and-requirements-modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <FilterWrapper/>
            </Modal>
        </>
    );
};

export default FunctionAndRequirementsModal;