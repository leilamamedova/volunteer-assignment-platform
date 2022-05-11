import create from "zustand";

const useStore = create((set) => ({
  functionalRequirements: [],
  setFunctionalRequirements: (req) =>
    set((state) => ({ functionalRequirements: req })),
  //Filters
  filterFields: [
    {
      id: 1,
      default: true,
      field: "default",
      comparison: "default",
      value: "",
      logical: "and",
    },
  ],
  resetFilterFields: () =>
    set(
      (state) =>
        (state.filterFields = [
          {
            id: Math.random(),
            default: true,
            field: "default",
            comparison: "default",
            value: "",
            logical: "and",
          },
        ])
    ),
  setFilterFields: (filters) =>
    set((state) => (state.filterFields = [...filters])),
  addFilterField: (filter) =>
    set((state) => (state.filterFields = [...state.filterFields, filter])),
  removeFilterField: (id) =>
    set((state) => {
      state.filterFields = [...state.filterFields.filter((el) => el.id === id)];
    }),
  favoriteFilters: [],
  addFavoriteFilter: (templateFilter) =>
    set(
      (state) =>
        (state.favoriteFilters = [...state.favoriteFilters, templateFilter])
    ),
  removeFavoriteFilter: (template_id) =>
    set(
      (state) =>
        (state.favoriteFilters = [
          ...state.favoriteFilters.filter((el) => el.key !== template_id),
        ])
    ),
}));

export default useStore;
