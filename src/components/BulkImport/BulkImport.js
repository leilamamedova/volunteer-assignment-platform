import React from "react";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FilterUserFetch, RoleOffersFetch } from "../../services/fetch";
import useStore from "../../services/store";
import "./BulkImport.scss";

const BulkImport = ({ title, url }) => {
  const setRoleOffers = useStore(({ setRoleOffers }) => setRoleOffers);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const setUsersData = useStore(({ setUsersData }) => setUsersData);
  const setPagination = useStore(({ setPagination }) => setPagination);
  const filterFields = useStore(({ filterFields }) => filterFields);
  const userEmail = useStore(({ userEmail }) => userEmail);

  const props = {
    name: "file",
    action: url + `/?email=${userEmail}`,
    headers: {
      authorization: "authorization-text",
    },
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        if (title === "Roles" || "Requirements" || "Requirement Details") {
          RoleOffersFetch(setRoleOffers, setDataLoading);
        } else if (title === "Users") {
          FilterUserFetch(
            filterFields,
            setUsersData,
            setPagination,
            setDataLoading,
            1,
            10
          );
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="bulk-import">
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />}>Import {title}</Button>
      </Upload>
    </div>
  );
};

export default BulkImport;
