import React, { useEffect, useState } from 'react';
import { Col, Row, Select, Table } from 'antd';
import useStore from '../../../../services/store';
import './MatchingData.scss';

const { Option } = Select;

const columns = [
    {
      title: 'Requirement',
      dataIndex: 'requirement_name',
      key: 'requirement_name',
    },
    {
        title: 'Operator',
        dataIndex: 'operator',
        key: 'operator',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
];

const coincidencesColumns = [
    {
      title: 'Requirement',
      dataIndex: 'requirement_name',
      key: 'requirement_name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
];

const MatchingData = ({userID}) => {
    const [isFunctionalRequirements, setIsFunctionalRequirements] = useState(true);
    const [isTemplate, setIsTemplate]  = useState(true);
    const [isBoth, setIsBoth] = useState(true);
    const [data, setData] = useState([]);
    const [coincidences, setCoincidences] = useState([]);

    const selectedFavoriteFilters = useStore(({ selectedFavoriteFilters }) => selectedFavoriteFilters);
    const activeRoleOfferId = useStore(({ activeRoleOfferId }) => activeRoleOfferId);
    const selectedRoleOffer = useStore(({ selectedRoleOffer }) => selectedRoleOffer);
    const favoriteFilters = useStore(({ favoriteFilters }) => favoriteFilters);
    const usersData = useStore(({usersData}) => usersData);   

    useEffect(() => {
        activeRoleOfferId > 0 && setIsFunctionalRequirements(false);
        selectedFavoriteFilters > 0 && setIsTemplate(false);
        activeRoleOfferId > 0 && selectedFavoriteFilters > 0 && setIsBoth(false);
    }, [activeRoleOfferId, selectedFavoriteFilters])

    const handleChange = (value) => {
        switch (value) {
            case 'fq':
                const functionalData = selectedRoleOffer.functionalRequirement.requirements.map((el) => Object.assign(el, { key: el.id }));
                functionalData.map(data => Array.isArray(data.value) && (data["value"] = data.value.join(" or ")));
                setData(functionalData);                  
                break; 
            case 'template':
                const templateData = favoriteFilters.find(fav => fav.id === selectedFavoriteFilters).filters.map((el) => Object.assign(el, { key: el.id }))
                templateData.map(data => Array.isArray(data.value) && (data["value"] = data.value.join(" or ")));
                setData(templateData);                  
                break;
            case 'both':
                const funcData = selectedRoleOffer.functionalRequirement.requirements.map((el) => Object.assign(el, { key: el.id }));
                funcData.map(data => Array.isArray(data.value) && (data["value"] = data.value.join(" or ")));
                const tempData = favoriteFilters.find(fav => fav.id === selectedFavoriteFilters).filters.map((el) => Object.assign(el, { key: el.id }))
                tempData.map(data => Array.isArray(data.value) && (data["value"] = data.value.join(" or ")));
                const bothData = funcData.concat(tempData);
                setData(bothData);                  
                break;         
            default:
                break;
        }   
    }   

    useEffect(() => {
        setCoincidences([]);
        const currentUser = usersData.find(data => data.candidate_id === userID);
        const skills = [currentUser.skill_1, currentUser.skill_2, currentUser.skill_3, currentUser.skill_4, currentUser.skill_5, currentUser.skill_6].filter(el => el != null).join(', ');
        const language = [currentUser.additional_language_1, currentUser.additional_language_2, currentUser.additional_language_3, currentUser.additional_language_4].filter(el => el != null).join(', ');
        const fluency_level = [currentUser.additional_language_1_fluency_leve, currentUser.additional_language_2_fluency_leve, currentUser.additional_language_3_fluency_leve, currentUser.additional_language_4_fluency_leve].filter(el => el != null).join(', ');


        const requirementsKeys = data.map(el => el.requirement_name);
        const coincidencesValue = requirementsKeys.map(item => {
            return currentUser[item]
        })
        const coincidencesObject = requirementsKeys.map((keys, index) => {
            return {
                requirement_name: keys,
                value: coincidencesValue[index],
                key: index
            }
        })

        coincidencesObject.map(obj => obj.requirement_name === "skill" && (obj["value"] = skills));        
        coincidencesObject.map(obj => obj.requirement_name === "language" && (obj["value"] = language));        
        coincidencesObject.map(obj => obj.requirement_name === "language_fluency_level" && (obj["value"] = fluency_level));        
        setCoincidences(coincidencesObject);
    }, [data, usersData])

    return (
        <div className='matching-modal'>
            <div className='matching-modal-select'>
                <Select 
                    defaultValue="default" 
                    onChange={handleChange}
                >
                    <Option key='default' value='default'>Select requirement</Option>
                    <Option key='1' value='fq' disabled={isFunctionalRequirements}>Functional Requirements</Option>
                    <Option key='2' value='template' disabled={isTemplate}>Template Requirements</Option>
                    <Option key='3' value='both' disabled={isBoth}>Both</Option>
                </Select>                
            </div>
             <Row align='top' justify='space-around' gutter={50}>
                <Col span={12}>
                    <h3>Requirements:</h3>
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        showHeader={false}
                        pagination={false}
                        scroll={{y: 300}}
                    />
                </Col>

                <Col span={12}>
                    <h3>Сoincidences:</h3>
                    <Table 
                        columns={coincidencesColumns} 
                        dataSource={coincidences} 
                        showHeader={false}
                        pagination={false}
                        scroll={{y: 300}}
                    />              
                </Col>
            </Row>
        </div>
    );
};

export default MatchingData;