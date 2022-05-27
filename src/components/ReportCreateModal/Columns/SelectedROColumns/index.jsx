import { useEffect, useState } from "react";
import { List, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import useStore from "../../../../services/store";
import "./index.scss";

function SelectedROColumns() {
  const [data, setData] = useState([]);
  const reportROColumns = useStore(({ reportROColumns }) => reportROColumns);
  const setReportROColumns = useStore(
    ({ setReportROColumns }) => setReportROColumns
  );

  useEffect(() => {
    setData(reportROColumns);
  }, [reportROColumns]);

  const handleDelete = (index) => {
    data.splice(index, 1);
    const list = [...data];
    setReportROColumns(list);
  };
  return (
    <List
      className="column-list"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <p>{item}</p>
          <Button
            shape="circle"
            icon={<DeleteFilled style={{ color: "red" }} />}
            onClick={() => {
              handleDelete(index);
            }}
          />
        </List.Item>
      )}
    />
  );
}

export default SelectedROColumns;
