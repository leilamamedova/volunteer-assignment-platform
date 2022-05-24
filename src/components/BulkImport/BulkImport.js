import React from 'react';
import { Button, message, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './BulkImport.scss';

const BulkImport = ({title, url}) => {
  const props = {
    name: 'file',
    action: url,
    headers: {
      authorization: 'authorization-text',
    },
    accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info);    
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);  
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
      <div className='bulk-import'>            
          <Upload {...props}  maxCount={1}>
              <Button icon={<DownloadOutlined />}>Import {title}</Button>
          </Upload>
      </div>
  );
};

export default BulkImport;