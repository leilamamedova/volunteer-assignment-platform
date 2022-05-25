import React, { useEffect, useState } from 'react';
import { Col, InputNumber, Modal, Row, message } from 'antd';
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
    const favoriteFilters = useStore(({favoriteFilters})=>favoriteFilters);
    const selectedFavoriteFilters = useStore(({selectedFavoriteFilters})=>selectedFavoriteFilters);

    const [count, setCount] = useState();
    const [confidence, setConfidence] = useState();
    const [waitlist, setWaitlist] = useState();
    const [requirement, setRequirement] = useState({});

    useEffect(() => {
        setCount(headcount)
        setConfidence(levelOfConfidence)
        setWaitlist(waitlistFulfillment)
    }, [headcount, levelOfConfidence, waitlistFulfillment])

    const handleOk = () => {
        setIsEditModalVisible(false);

        const selectedTemplate = favoriteFilters.find(fav => fav.id === selectedFavoriteFilters)
        typeof selectedTemplate !== 'undefined' && selectedTemplate.filters.map(temp => temp['id'] = null)

        functionalRequirements.map((el) => {
            if (el.key === selectedRow ) {
                el['requirements'] = filterFields;
                el['level_of_confidence'] = confidence;
                el['waitlist_count'] = waitlist;
                el['total_demand'] = count;
                el['role_offer_id'] = el.key;

                console.log('el', el);
                setRequirement(el);      
        }})
    };

    useEffect(() => {        
        Object.keys(requirement).length !== 0 &&  fetch(`${process.env.REACT_APP_VAP_API_BASE}/FunctionalRequirements/update`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requirement),
          })
            .then((response) => response.json())
            .then((data) => {
                if(data.statusCode === 200) {
                  message.success('Success!');
                }else {
                  message.error(data.value);
                }
            })
            .catch((err) => console.log(err)) 
            .finally(() =>  setRequirement({}))       
    }, [requirement])

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