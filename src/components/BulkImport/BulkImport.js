import React from "react";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FilterUserFetch, RoleOffersFetch } from "../../services/fetch";
import useStore from "../../services/store";
import "./BulkImport.scss";
import { useState } from "react";

const BulkImport = ({ title, url }) => {
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const userEmail = useStore(({ userEmail }) => userEmail);
  const [showUploadList, setShowUploadList] = useState(true);

  const props = {
    name: "file",
    action: url + `/?email=${userEmail}`,
    headers: {
      authorization: "authorization-text",
    },
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      setShowUploadList(true);
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        setShowUploadList(false);
        message.success(`${info.file.name} file uploaded successfully`);
        if (title === "Roles" || "Role Requirements" || "Role Details") {
          RoleOffersFetch(setRoleOffers, setDataLoading);
        } else if (title === "Users") {
          FilterUserFetch(
            filterFields,
            setUsersData,
            setPagination,
            setDataLoading,
            1,
            100
          );
        }
      } else if (info.file.status === "error") {
        setShowUploadList(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="bulk-import">
      <Upload {...props} maxCount={1} showUploadList={showUploadList}>
        <Button icon={<UploadOutlined />}>Import {title}</Button>
      </Upload>
    </div>
  );
};

export default BulkImport;
