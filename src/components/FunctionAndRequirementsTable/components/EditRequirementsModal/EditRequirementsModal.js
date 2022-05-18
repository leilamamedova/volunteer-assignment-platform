import React from 'react';
import { Modal } from 'antd';
import FilterWrapper from '../../../FilterWrapper/FilterWrapper.jsx';
import './EditRequirementsModal.scss';
import useStore from '../../../../services/store.js';

const EditRequirementsModal = ({isEditModalVisible, setIsEditModalVisible, selectedRow}) => {
    const filterFields = useStore(({filterFields})=>filterFields);
    const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);

    const handleOk = () => {
        setIsEditModalVisible(false);
        functionalRequirements.map((el) => {
            if (el.id === selectedRow ) {
              console.log('EditRequirements', el);
        }})
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };    

    return (
        <>
            <Modal centered closable={false} className='function-and-requirements-modal' visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <FilterWrapper noReset={true} seeResultBtn={false}/>
            </Modal>
        </>
    );
};

export default EditRequirementsModal;