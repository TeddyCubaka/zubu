import { create } from "zustand";

interface Lessor {
	fullName: string;
	contacts: string;
}
interface RentalInformation {
	isAvailable: boolean;
	availabilityDate: string;
	typeOfRental: string;
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
	coverPicture: string;
	address: string;
	area: string;
	lessor: Lessor;
	changeAvailability: (state: boolean) => void;
	setAvailabilyDate: (date: string) => void;
	setType: (type: string) => void;
	setPrice: (price: string) => void;
	setGuaratee: (guarantee: string) => void;
	setCurrency: (currency: string) => void;
	setCoverPicture: (url: string) => void;
	setAddress: (address: string) => void;
	setArea: (area: string) => void;
	setLessor: (lessor: Lessor) => void;
}

export const rentalInformation = create<RentalInformation>((set) => ({
	isAvailable: false,
	availabilityDate: Date(),
	typeOfRental: "",
	price: "",
	guaranteeValue: "",
	monetaryCurrency: "",
	coverPicture: "",
	address: "",
	area: "",
	lessor: {
		fullName: "",
		contacts: "",
	},
	changeAvailability: (state) => set(() => ({ isAvailable: state })),
	setAvailabilyDate: (date) => set(() => ({ availabilityDate: "" + date })),
	setType: (type) => set(() => ({ typeOfRental: "" + type })),
	setPrice: (price: string) => set(() => ({ price: "" + price })),
	setGuaratee: (guarantee) => set(() => ({ guaranteeValue: "" + guarantee })),
	setCurrency: (currency) => set(() => ({ monetaryCurrency: "" + currency })),
	setCoverPicture: (url) => set(() => ({ coverPicture: "" + url })),
	setAddress: (address) => set(() => ({ address: "" + address })),
	setArea: (area) => set(() => ({ area: "" + area })),
	setLessor: (lessor) => set(() => ({ lessor: lessor })),
}));
