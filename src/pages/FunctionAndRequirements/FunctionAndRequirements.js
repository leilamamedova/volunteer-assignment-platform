import { Row, Space } from 'antd';
import React, { useEffect } from 'react';
import BulkImport from '../../components/BulkImport/BulkImport';
import FunctionAndRequirementsTable from '../../components/FunctionAndRequirementsTable/FunctionAndRequirementsTable';
import { RoleOffersFetch } from '../../services/fetch';
import useStore from '../../services/store';

const FunctionAndRequirements = () => {
    const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
    const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
    const systemRole = useStore(({ systemRole }) => systemRole);  

    const roleOffersUrl = `${process.env.REACT_APP_VAP_API_BASE}/RoleOffers/import`;
    const functionalRequirementsUrl = `${process.env.REACT_APP_VAP_API_BASE}/FunctionalRequirements/import`;
    const statisticsUrl = `${process.env.REACT_APP_VAP_API_BASE}/RoleOffers/importDetails`;

    useEffect(() => {
        RoleOffersFetch(setRoleOffers, setDataLoading);
    }, [])

    return (
        <div>
            {systemRole.some(el => el === 'Admin') ?
            <Row justify='end'>
                <Space direction='horizontal' align='middle'>
                    <BulkImport title={'Roles'} url={roleOffersUrl}/>
                    <BulkImport title={'Requirements'} url={functionalRequirementsUrl}/>
                    <BulkImport title={'Statistics'} url={statisticsUrl}/>
                </Space>
            </Row>
            :
            null            
            }
            <FunctionAndRequirementsTable/>            
        </div>
    );
};

export default FunctionAndRequirements;