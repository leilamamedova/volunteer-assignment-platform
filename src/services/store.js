import create from "zustand";

const useStore = create((set) => ({
  functionalRequirements: [],
  setFunctionalRequirements: (req) =>
    set(
      (state) =>
        (state.functionalRequirements = [...state.functionalRequirements, req])
    ),
  usersData: [],
  setUsersData: (data) => set((state) => ({ usersData: data })),
  pagination: 0,
  setPagination: (num) => set((state) => ({ pagination: num })),
  usersDataFields: [],
  setUsersDataFields: (field) => set((state) => ({ usersDataFields: field })),
  //Filters
  filterFields: [
    {
      default: false,
      requirement_name: "Requirement",
      operator: "Operator",
      value: [],
    },
  ],
  resetFilterFields: () =>
    set(
      (state) =>
        (state.filterFields = [
          {
            default: false,
            requirement_name: "Requirement",
            operator: "Operator",
            value: [],
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
    set((state) => ({ favoriteFilters: templateFilter })),
  selectedFavoriteFilters: 0,
  setSelectedFavoriteFilters: (id) => set((state) => ({ selectedFavoriteFilters: id })),
  selectedUsers: [],
  setSelectedUsers: (data) => set((state) => (state.selectedUsers = [...data])),
  roleOffers: [],
  setRoleOffers: (data) => set((state) => (state.roleOffers = [...data])),
  dataLoading: false,
  setDataLoading: (status) => set((state) => ({ dataLoading: status })),
  activeRoleOfferId: 0,
  setActiveRoleOfferId: (data) =>
    set((state) => (state.activeRoleOfferId = data)),
  reportColumns: [],
  setReportColumns: (data) => set((state) => (state.reportColumns = data)),
}));

export default useStore;
