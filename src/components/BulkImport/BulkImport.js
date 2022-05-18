import React from 'react';
import { Button, Col, message, Row, Upload } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './BulkImport.scss';
import { RoleOffersFetch, UsersFetch } from '../../services/fetch';
import useStore from '../../services/store';

const BulkImport = ({title, url}) => {
  const setUsersData = useStore(({setUsersData}) => setUsersData);
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setTableLoading = useStore(({ setTableLoading }) => setTableLoading);

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
        switch (title) {
          case 'Users':
            UsersFetch(setUsersData, setTableLoading);         
            break;
          case 'Roles':
            RoleOffersFetch(setRoleOffers, setTableLoading);           
            break; 
          case 'Requirements':
            console.log('Requirements');          
            break;        
          default:
            break;
        }    
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