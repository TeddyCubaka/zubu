import { create } from "zustand";

interface PublicationStore {
	address: string;
	propretyType: string;
	name: string;
	contact: string;
	setAddress: (str: string) => void;
	setPropretyType: (type: string) => void;
	setName: (owner: string) => void;
	setContact: (phone: string) => void;
	getDatas?: () => string;
	allInfo?: string;
	count: number;
	setCount: () => void;
	unSetCount: () => void;
	monetary_currency: string;
	setMonetary_currency: (currence: string) => void;
}

export const publicationStore = create<PublicationStore>((set) => ({
	address: "",
	propretyType: "",
	name: "",
	contact: "",
	monetary_currency: "",
	count: 0,
	setCount: () => set((state) => ({ count: state.count + 1 })),
	unSetCount: () => set((state) => ({ count: state.count - 1 })),
	setAddress: (str) =>
		set((state) => ({
			address: state.address + str,
		})),
	setPropretyType: (type) => set(() => ({ propretyType: type })),
	setName: (owner) => set(() => ({ name: owner })),
	setContact: (phone) => set(() => ({ contact: phone })),
	setMonetary_currency: (currence) =>
		set(() => ({ monetary_currency: currence })),
}));
