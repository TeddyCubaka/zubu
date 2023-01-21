import { create } from "zustand";

interface Lessor {
	name: string;
	contacts: string;
}
interface RentalPrice {
	price: string;
	guarantee_value: string;
	monetary_currency: string;
}
interface PublicationStore {
	address: string;
	propretyType: string;
	lessor: Lessor;
	rentalPrice: RentalPrice;
	setRentalPrice: (object: RentalPrice) => void;
	setLessor: (object: Lessor) => void;
	setAddress: (str: string) => void;
	setPropretyType: (type: string) => void;
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
	monetary_currency: "",
	count: 0,
	lessor: { name: "", contacts: "" },
	rentalPrice: { price: "", guarantee_value: "", monetary_currency: "" },
	setRentalPrice: (object) => set(() => ({ rentalPrice: object })),
	setLessor: (object) => set(() => ({ lessor: object })),
	setCount: () => set((state) => ({ count: state.count + 1 })),
	unSetCount: () => set((state) => ({ count: state.count - 1 })),
	setAddress: (str) =>
		set((state) => ({
			address: state.address + str,
		})),
	setPropretyType: (type) => set(() => ({ propretyType: type })),
	setMonetary_currency: (currence) =>
		set(() => ({ monetary_currency: currence })),
}));
