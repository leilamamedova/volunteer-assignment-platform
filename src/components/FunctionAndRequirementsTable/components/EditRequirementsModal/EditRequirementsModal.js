import React from 'react';
import { Col, InputNumber, Modal, Row } from 'antd';
import FilterWrapper from '../../../FilterWrapper/FilterWrapper.jsx';
import './EditRequirementsModal.scss';
import useStore from '../../../../services/store.js';

const EditRequirementsModal = ({isEditModalVisible, setIsEditModalVisible, selectedRow, headcount}) => {
    const filterFields = useStore(({filterFields})=>filterFields);
    const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);

    const handleOk = () => {
        setIsEditModalVisible(false);
        // functionalRequirements.map((el) => {
        //     if (el.id === selectedRow ) {
        //       console.log('EditRequirements', el);
        // }})
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };    

    const handleHeadcount = (value) => {
        console.log(value);
    }

    return (
        <>
            <Modal centered closable={false} className='function-and-requirements-modal' visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row gutter={16}>
                    <Col>
                        <h3>Headcount</h3>
                    </Col>
                    <Col>
                        {
                            headcount && <InputNumber defaultValue={headcount} onChange={handleHeadcount}/>
                        }                        
                    </Col>
                </Row>
               <FilterWrapper noReset={true} seeResultBtn={false}/>
            </Modal>
        </>
    );
};

export default EditRequirementsModal;