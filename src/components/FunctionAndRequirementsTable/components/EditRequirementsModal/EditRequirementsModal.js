import React, { useEffect, useState } from 'react';
import { Col, InputNumber, Modal, Row } from 'antd';
import FilterWrapper from '../../../FilterWrapper/FilterWrapper.jsx';
import './EditRequirementsModal.scss';
import useStore from '../../../../services/store.js';
import LoadFilterTemplate from '../../../LoadFilterTemplate/LoadFilterTemplate.jsx';

const EditRequirementsModal = (
    {
        isEditModalVisible, 
        setIsEditModalVisible, 
        selectedRow, 
        headcount,
        levelOfConfidence,
        waitlistFulfillment   
    }) => {
    const filterFields = useStore(({filterFields})=>filterFields);
    const functionalRequirements = useStore(({functionalRequirements})=>functionalRequirements);
    const [count, setCount] = useState();
    const [confidence, setConfidence] = useState();
    const [waitlist, setWaitlist] = useState();

    useEffect(() => {
        setCount(headcount)
        setConfidence(levelOfConfidence)
        setWaitlist(waitlistFulfillment)
    }, [headcount, levelOfConfidence, waitlistFulfillment])

    const handleOk = () => {
        setIsEditModalVisible(false);
        functionalRequirements.map((el) => {
            if (el.key === selectedRow ) {
              el['requirements'] = filterFields;
              el['level_of_confidence'] = confidence;
              el['waitlist_count'] = waitlist;
              el['total_demand'] = count;
              el['role_offer_id'] = el.key;
              
              fetch(`${process.env.REACT_APP_VAP_API_BASE}/FunctionalRequirements/update`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(el),
              })
                .then((response) => response.json())
                .then((data) => console.log('Update Requirements', data))
                .catch((err) => console.log(err));    
        }})
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };    

    return (
        <>
            <Modal centered closable={false} className='function-and-requirements-modal' visible={isEditModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Row gutter={50}>
                    <Col>
                        <h3>Total Demand</h3>
                        <InputNumber value={count} min={0} onChange={setCount}/> 
                    </Col>
                    <Col>
                        <h3>Level Of Confidence</h3>
                        <InputNumber value={confidence} min={0} onChange={setConfidence}/>
                    </Col>  
                    <Col>
                        <h3>Waitlist Demand</h3>
                        <InputNumber value={waitlist} min={0} onChange={setWaitlist}/> 
                    </Col> 
                </Row>
                <Row>
                    <LoadFilterTemplate/>                
                </Row>
                    <FilterWrapper noReset={true} seeResultBtn={false}/>
            </Modal>
        </>
    );
};

export default EditRequirementsModal;