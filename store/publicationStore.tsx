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
}

export const publicationStore = create<PublicationStore>((set) => ({
	address: "",
	propretyType: "",
	name: "",
	contact: "",
	allInfo: "",
	setAddress: (str) =>
		set((state) => ({
			address: state.address + str,
			allInfo: state.allInfo + "/" + str,
		})),
	setPropretyType: (type) =>
		set((state) => ({
			propretyType: type,
			allInfo: state.allInfo + "/" + type,
		})),
	setName: (owner) =>
		set((state) => ({ name: owner, allInfo: state.allInfo + "/" + owner })),
	setContact: (phone) =>
		set((state) => ({ contact: phone, allInfo: state.allInfo + "/" + phone })),
}));
