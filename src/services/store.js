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
  NewUsersDataFields: {},
  setNewUsersDataFields: (data) =>
    set((state) => (state.NewUsersDataFields = data)),
  //Filters
  filterFields: [],
  resetFilterFields: () => set((state) => (state.filterFields = [])),
  setFilterFields: (filters) =>
    set((state) => (state.filterFields = [...filters])),
  addFilterField: (filter) =>
    set((state) => (state.filterFields = [...state.filterFields, filter])),
  removeFilterField: (id) =>
    set((state) => {
      state.filterFields = [...state.filterFields.filter((el) => el.id === id)];
    }),
  ROfilterFields: [
    {
      default: false,
      requirement_name: "Requirement",
      operator: "Operator",
      value: [],
    },
  ],
  resetROFilterFields: () => set((state) => (state.ROfilterFields = [])),
  setROFilterFields: (filters) =>
    set((state) => (state.ROfilterFields = [...filters])),
  addROFilterField: (filter) =>
    set((state) => (state.ROfilterFields = [...state.ROfilterFields, filter])),
  removeROFilterField: (id) =>
    set((state) => {
      state.ROfilterFields = [
        ...state.ROfilterFields.filter((el) => el.id === id),
      ];
    }),
  favoriteFilters: [],
  addFavoriteFilter: (templateFilter) =>
    set((state) => ({ favoriteFilters: templateFilter })),
  selectedFavoriteFilters: 0,
  setSelectedFavoriteFilters: (id) =>
    set((state) => ({ selectedFavoriteFilters: id })),
  selectedUsers: [],
  setSelectedUsers: (data) => set((state) => (state.selectedUsers = [...data])),
  roleOffers: [],
  setRoleOffers: (data) => set((state) => (state.roleOffers = [...data])),
  selectedRoleOffer: {},
  setSelectedRoleOffer: (offer) =>
    set((state) => ({ selectedRoleOffer: offer })),
  dataLoading: false,
  setDataLoading: (status) => set((state) => ({ dataLoading: status })),
  activeRoleOfferId: 0,
  setActiveRoleOfferId: (data) =>
    set((state) => (state.activeRoleOfferId = data)),
  templateReportName: "",
  setTemplateReportName: (data) =>
    set((state) => (state.templateReportName = data)),
  reportTemplate: {},
  setReportTemplate: (data) => set((state) => (state.reportTemplate = data)),
  reportColumns: [],
  setReportColumns: (data) => set((state) => (state.reportColumns = data)),
  reportROColumns: [],
  setReportROColumns: (data) => set((state) => (state.reportROColumns = data)),
  history: [],
  setHistory: (data) => set((state) => ({ history: data })),
  dashboardData: [],
  setDashboardData: (data) => set((state) => ({ dashboardData: data })),
  overallAssignments: [],
  setOverallAssignments: (data) =>
    set((state) => ({ overallAssignments: data })),
  volunteerDemographics: {},
  setVolunteerDemographics: (data) =>
    set((state) => ({ volunteerDemographics: data })),
}));

export default useStore;
