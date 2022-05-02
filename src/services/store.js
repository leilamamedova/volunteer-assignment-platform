import create from 'zustand';

const useStore = create(set => ({
    functionalRequirements: [],
    setFunctionalRequirements: (req) => set((state) => ({ functionalRequirements: req })),
}))

export default useStore;     