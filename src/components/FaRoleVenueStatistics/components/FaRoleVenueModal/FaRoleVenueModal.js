import React from 'react';
import { Modal } from 'antd';

const FaRoleVenueModal = ({isModalVisible, setIsModalVisible, }) => {
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal centered closable={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Lorem Ipsum</p>
            </Modal>
        </>
    );
};

export default FaRoleVenueModal;