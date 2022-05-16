import create from "zustand";

const useStore = create((set) => ({
  functionalRequirements: [],
  setFunctionalRequirements: (req) =>
    set((state) => ({ functionalRequirements: req })),
  usersData: [],
  setUsersData: (data) => set((state) => ({ usersData: data })),
  usersDataFields: [],
  setUsersDataFields: (field) => set((state) => ({ usersDataFields: field })),
  //Filters
  filterFields: [
    {
      id: 1,
      default: true,
      requirement: "default",
      operator: "default",
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
            requirement: "default",
            operator: "default",
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
  favoriteFilters: null,
  addFavoriteFilter: (templateFilter) =>
    set(
      (state) => ({ favoriteFilters: templateFilter })
    ),
  removeFavoriteFilter: (template_id) =>
    set(
      (state) =>
        (state.favoriteFilters = [
          ...state.favoriteFilters.filter((el) => el.key !== template_id),
        ])
    ),
  selectedUsers: [],
  setSelectedUsers: (data) => set((state) => (state.selectedUsers = [...data])),
  roleOffers: [],
  setRoleOffers: (data) => set((state) => (state.roleOffers = [...data])),
}));

export default useStore;
