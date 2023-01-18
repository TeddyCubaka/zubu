import { create } from "zustand";

interface Number {
	count: number;
}

interface Test {
	count: number;
	update: () => void;
}

export const testStore = create<Test>((set) => ({
	count: 0,
	update: () => set((state: Number) => ({ count: state.count + 1 })),
}));
