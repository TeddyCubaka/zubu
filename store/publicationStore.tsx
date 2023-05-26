import { create } from "zustand";

interface Lessor {
	fullName: string;
	contacts: string;
}
export interface RentalPrice {
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
}
interface PublicationStore {
	count: number;
	lessor: Lessor;
	address: string;
	rentalPrice: RentalPrice;
	RentalType: string;
	monetaryCurrency: string;
	databaseResponseStatus: string;
	sendingData: boolean;
	coverPicture: string;
	coverPictureAsFile: string | Blob;
	_setCoverPictureAsFile: (file: File) => void;
	_setCoverPicture: (url: string) => void;
	_setSendingData: (state: boolean) => void;
	_id: string;
	set_id: (_id: string) => void;
	setCount: () => void;
	setLessor: (object: Lessor) => void;
	unSetCount: () => void;
	resetCount: () => void;
	setAddress: (str: string) => void;
	setRentalPrice: (object: RentalPrice) => void;
	setPropretyType: (type: string) => void;
	setMonetaryCurrency: (currence: string) => void;
	setDatabaseResponseStatus: (string: string) => void;
}

export const publicationStore = create<PublicationStore>((set) => ({
	_id: "",
	count: 0,
	address: "",
	RentalType: "",
	coverPicture: "",
	sendingData: false,
	monetaryCurrency: "",
	coverPictureAsFile: "",
	databaseResponseStatus: "",
	lessor: { fullName: "", contacts: "" },
	set_id: (_id) => set(() => ({ _id: _id })),
	resetCount: () => set(() => ({ count: 0 })),
	setAddress: (str) => set(() => ({ address: str })),
	setLessor: (object) => set(() => ({ lessor: object })),
	setPropretyType: (type) => set(() => ({ RentalType: type })),
	setCount: () => set((state) => ({ count: state.count + 1 })),
	_setCoverPicture: (url) => set(() => ({ coverPicture: url })),
	unSetCount: () => set((store) => ({ count: store.count - 1 })),
	_setSendingData: (state) => set(() => ({ sendingData: state })),
	setRentalPrice: (object) => set(() => ({ rentalPrice: object })),
	rentalPrice: { price: "", guaranteeValue: "", monetaryCurrency: "USD" },
	_setCoverPictureAsFile: (file) => set(() => ({ coverPictureAsFile: file })),
	setMonetaryCurrency: (currence) =>
		set(() => ({ monetaryCurrency: currence })),
	setDatabaseResponseStatus: (string) =>
		set((state) => ({ databaseResponseStatus: string })),
}));
