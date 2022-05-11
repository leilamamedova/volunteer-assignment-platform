import React from 'react';
import { Modal } from 'antd';
import FilterWrapper from '../../../FilterWrapper/FilterWrapper.jsx';
import './EditRequirementsModal.scss';

const EditRequirementsModal = ({isEditModalVisible, setIsEditModalVisible}) => {
    const handleOk = () => {
        setIsEditModalVisible(false);
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };    

    return (
        <>
            <Modal centered closable={false} className='function-and-requirements-modal' visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <FilterWrapper/>
            </Modal>
        </>
    );
};

export default EditRequirementsModal;