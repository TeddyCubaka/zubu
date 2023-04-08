import { create } from "zustand";

interface HeaderType {
	isUserMenuShowing: boolean;
	changeUserMenuShowing: (state: boolean) => void;
}

export const headerStore = create<HeaderType>((set) => ({
	isUserMenuShowing: false,
	changeUserMenuShowing: (state) => set(() => ({ isUserMenuShowing: state })),
}));
