import React from 'react';
import { Button, Col, message, Row, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './BulkImport.scss';

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
};

const BulkImport = ({title}) => {
    return (
        <div className='bulk-import'>            
            <Upload {...props}  maxCount={1} showUploadList={false}>
                <Button icon={<DownloadOutlined />}>Import {title}</Button>
            </Upload>
        </div>
    );
};

export default BulkImport;