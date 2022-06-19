import React, { useEffect } from "react";
import { Select } from "antd";
import useStore from "../../services/store";
import { SavedFiltersGet } from "../../services/fetch";

const { Option } = Select;
function LoadFilterTemplate() {
  const favoriteFilters = useStore((state) => state.favoriteFilters);
  const filterFields = useStore((state) => state.filterFields);
  const setFilterFields = useStore((state) => state.setFilterFields);
  const dataLoading = useStore(({ dataLoading }) => dataLoading);
  const setDataLoading = useStore(({ setDataLoading }) => setDataLoading);
  const addFavoriteFilter = useStore((state) => state.addFavoriteFilter);
  const setSelectedFavoriteFilters = useStore(
    (state) => state.setSelectedFavoriteFilters
  );
  const selectedFavoriteFilters = useStore(
    (state) => state.selectedFavoriteFilters
  );

  const handleSelect = (e) => {
    setSelectedFavoriteFilters(e);
    const el = favoriteFilters.find((el) => el.key === e);
    const typedFilters = el?.filters.map((el) => {
      Object.assign({ type: "SavedTemplate" }, el);
      el.id = null;
      return el;
    });
    console.log(typedFilters);
    setFilterFields([...filterFields, ...typedFilters]);
  };

  useEffect(() => {
    SavedFiltersGet(addFavoriteFilter, setDataLoading);
  }, []);

  return (
    <Select
      defaultValue={selectedFavoriteFilters}
      value={selectedFavoriteFilters}
      onChange={handleSelect}
      showSearch
      style={{ width: 200 }}
      placeholder="Search to Select"
      optionFilterProp="children"
      // loading={dataLoading}
    >
      <Option key="default" value={0}>
        Search to Select
      </Option>
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
