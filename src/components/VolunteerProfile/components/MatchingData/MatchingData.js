import React, { useEffect, useState } from 'react';
import { Col, Row, Select, Table } from 'antd';
import './MatchingData.scss';
import useStore from '../../../../services/store';

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
                setData(functionalData);                  
                break; 
            case 'template':
                const templateData = favoriteFilters.find(fav => fav.id === selectedFavoriteFilters).filters.map((el) => Object.assign(el, { key: el.id }))
                setData(templateData);                  
                break;
            case 'both':
                const funcData = selectedRoleOffer.functionalRequirement.requirements.map((el) => Object.assign(el, { key: el.id }));
                const tempData = favoriteFilters.find(fav => fav.id === selectedFavoriteFilters).filters.map((el) => Object.assign(el, { key: el.id }))
                const bothData = funcData.concat(tempData);
                setData(bothData);                  
                break;         
            default:
                break;
        }   
    }   

    useEffect(() => {
        setCoincidences([]);

        const requirementsKeys = data.map(el => el.requirement_name);
        const coincidencesValue = requirementsKeys.map(item => {
            return usersData.find(data => data.candidate_id === userID)[item]
        })

        requirementsKeys.map((keys, index) => {            
            setCoincidences(prev => [...prev,
                {
                    requirement_name: keys,
                    value: coincidencesValue[index],
                    key: index
                }
            ])
        })
    }, [data])

    return (
        <div className='matching-modal'>
            <div className='matching-modal-select'>
                <Select 
                    defaultValue="Select requirement" 
                    onChange={handleChange}
                >
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