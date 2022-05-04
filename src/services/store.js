import create from "zustand";

const useStore = create((set) => ({
  functionalRequirements: [],
  setFunctionalRequirements: (req) =>
    set((state) => ({ functionalRequirements: req })),
  //Filter Functional Requirements
  filterRequirements: [],
  setFilterRequirements: (req) =>
    set(
      (state) =>
        (state.filterRequirements = [...state.filterRequirements, ...req])
    ),
}));

export default useStore;
