import { Row, Space } from 'antd';
import React from 'react';
import BulkImport from '../../components/BulkImport/BulkImport';
import FunctionAndRequirementsTable from '../../components/FunctionAndRequirementsTable/FunctionAndRequirementsTable';

const FunctionAndRequirements = () => {
    const url = `${process.env.REACT_APP_VAP_API_BASE}/RoleOffers/import`;

    return (
        <div>
            <Row justify='end'>
                <Space direction='horizontal' align='middle'>
                    <BulkImport title={'Roles'} url={url}/>
                    <BulkImport title={'Requirements'}/>
                </Space>
            </Row>
            <FunctionAndRequirementsTable/>            
        </div>
    );
};

export default FunctionAndRequirements;