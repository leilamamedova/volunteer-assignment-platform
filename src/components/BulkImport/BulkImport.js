import React, { useEffect, useState } from 'react';
import { Button, message, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { FilterUserFetch, RoleOffersFetch } from '../../services/fetch';
import useStore from '../../services/store';
import './BulkImport.scss';

const BulkImport = ({title, url, action='Import'}) => {
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const filterFields = useStore(({ filterFields }) => filterFields);

  const [icon, setIcon] = useState();

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
          case 'Roles' || 'Requirements' || 'Statistics':
            RoleOffersFetch(setRoleOffers, setDataLoading);  
            break;
          case 'Users' || 'Requirements' || 'Statistics':
            FilterUserFetch(filterFields, setUsersData, setPagination, setDataLoading, 1, 10)
            break;
        
          default:
            break;
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    action === 'Export' ? setIcon(<UploadOutlined />) : setIcon(<DownloadOutlined />)
  }, [action])

  return (
      <div className='bulk-import'>            
          <Upload {...props}  maxCount={1}>
              <Button icon={icon}>{action} {title}</Button>
          </Upload>
      </div>
  );
};

export default BulkImport;