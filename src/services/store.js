import create from "zustand";

const useStore = create((set) => ({
  functionalRequirements: [],
  setFunctionalRequirements: (req) =>
    set((state) => ({ functionalRequirements: req })),
  //Filter Functional Requirements
  filterRequirements: [],
  setFilterRequirements: (req) =>
    set((state) => (state.filterRequirements = [...req])),
  removeFilterRequirement: (reqID) =>
    set((state) => {
      state.filterRequirements = state.filterRequirements.filter(
        (el) => el.id === reqID
      );
    }),
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
  setFilterFields: (filter) => set((state) => ({ filterFields: filter })),
}));

export default useStore;
