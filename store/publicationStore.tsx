import { create } from "zustand";

interface Lessor {
	fullName: string;
	contacts: string;
}
interface RentalPrice {
	price: string;
	guarantee_value: string;
	monetary_currency: string;
}
interface PublicationStore {
	count: number;
	lessor: Lessor;
	address: string;
	rentalPrice: RentalPrice;
	propretyType: string;
	monetary_currency: string;
	databaseResponseStatus: string;
	setCount: () => void;
	setLessor: (object: Lessor) => void;
	unSetCount: () => void;
	resetCount: () => void;
	setAddress: (str: string) => void;
	setRentalPrice: (object: RentalPrice) => void;
	setPropretyType: (type: string) => void;
	setmonetary_currency: (currence: string) => void;
	setDatabaseResponseStatus: (string: string) => void;
}

export const publicationStore = create<PublicationStore>((set) => ({
	count: 0,
	address: "",
	propretyType: "",
	monetary_currency: "",
	databaseResponseStatus: "",
	lessor: { fullName: "", contacts: "" },
	rentalPrice: { price: "", guarantee_value: "", monetary_currency: "" },
	setCount: () => set((state) => ({ count: state.count + 1 })),
	setLessor: (object) => set(() => ({ lessor: object })),
	resetCount: () => set(() => ({ count: 0 })),
	unSetCount: () => set((state) => ({ count: state.count - 1 })),
	setAddress: (str) => set((state) => ({ address: str })),
	setRentalPrice: (object) => set(() => ({ rentalPrice: object })),
	setPropretyType: (type) => set(() => ({ propretyType: type })),
	setmonetary_currency: (currence) =>
		set(() => ({ monetary_currency: currence })),
	setDatabaseResponseStatus: (string) =>
		set((state) => ({ databaseResponseStatus: string })),
}));
