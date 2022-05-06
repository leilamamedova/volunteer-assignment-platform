import { Row, Space } from 'antd';
import React from 'react';
import BulkImport from '../../components/BulkImport/BulkImport';
import FunctionAndRequirementsTable from '../../components/FunctionAndRequirementsTable/FunctionAndRequirementsTable';

const FunctionAndRequirements = () => {
    return (
        <div>
            <Row justify='end'>
                <Space direction='horizontal'>
                    <BulkImport title={'Roles'}/>
                    <BulkImport title={'Requirements'}/>
                </Space>
            </Row>
            <FunctionAndRequirementsTable/>            
        </div>
    );
};

export default FunctionAndRequirements;