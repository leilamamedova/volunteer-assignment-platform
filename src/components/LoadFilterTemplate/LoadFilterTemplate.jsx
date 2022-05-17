import React from "react";
import { Select } from "antd";
import useStore from "../../services/store";

const { Option } = Select;
function LoadFilterTemplate() {
  const favoriteFilters = useStore((state) => state.favoriteFilters);
  const filterFields = useStore((state) => state.filterFields);
  const setFilterFields = useStore((state) => state.setFilterFields);
  const handleSelect = (e) => {
    console.log(e);
    const el = favoriteFilters.find((el) => el.key === e);
    setFilterFields([...filterFields, ...el.filters]);
  };
  return (
    <Select
      onChange={handleSelect}
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
    >
      {favoriteFilters &&
        favoriteFilters.map((el) => (
          <Option key={el.key} value={el.key}>
            {el.name}
          </Option>
        ))}
    </Select>
  );
}

export default LoadFilterTemplate;
