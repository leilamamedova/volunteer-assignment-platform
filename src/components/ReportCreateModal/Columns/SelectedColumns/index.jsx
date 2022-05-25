import { useEffect, useState } from "react";
import { List, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import useStore from "../../../../services/store";
import "./index.scss";

function SelectedColumns() {
  const [data, setData] = useState([]);
  const selectedColumns = useStore(({ reportColumns }) => reportColumns);
  const setSelectedColumns = useStore(
    ({ setReportColumns }) => setReportColumns
  );

  useEffect(() => {
    setData(selectedColumns);
  }, [selectedColumns]);

  const handleDelete = (index) => {
    data.splice(index, 1);
    const list = [...data];
    setSelectedColumns(list);
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

export default SelectedColumns;
