import { create } from "zustand";

interface Lessor {
	fullName: string;
	contacts: string;
}
export interface RentalInformation {
	_id: string;
	isAvailable: boolean;
	availabilityDate: string;
	typeOfRental: string;
	price: string;
	guaranteeValue: string;
	monetary_currency: string;
	coverPicture: string;
	address: string;
	area: string;
	lessor: Lessor;
	files: string | Blob;
	getId: (string: string) => void;
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
	setFiles: (file: File) => void;
	clearFiles: () => void;
}

export interface LoaderStatus {
	uploadingCoverPicture: string;
	updatingStatus: string;
	setUpdatingStatus: (string: string) => void;
	setUploadingCoverPicture: (string: string) => void;
}

export interface PropretyDescriptionModel {
	name: string;
	details: string;
}

export interface PropretyDescription {
	interior: {
		rooms: PropretyDescriptionModel[];
	};
	exterior: {
		pieces: PropretyDescriptionModel[];
	};
	tenantCharge: {
		charges: PropretyDescriptionModel[];
	};
	addInteriorRoom: (rooms: PropretyDescriptionModel) => void;
	addExternalPiece: (piece: PropretyDescriptionModel) => void;
	addTenantCharge: (charge: PropretyDescriptionModel) => void;
	removeInteriorRoom: (index: number) => void;
}

export const rentalInformation = create<RentalInformation>((set) => ({
	_id: "",
	isAvailable: false,
	availabilityDate: "",
	typeOfRental: "",
	price: "",
	guaranteeValue: "",
	monetary_currency: "USD",
	coverPicture: "",
	address: "",
	area: "",
	lessor: {
		fullName: "",
		contacts: "",
	},
	files: "",
	getId: (string) => set(() => ({ _id: string })),
	changeAvailability: (state) => set(() => ({ isAvailable: state })),
	setAvailabilyDate: (date) => set(() => ({ availabilityDate: "" + date })),
	setType: (type) => set(() => ({ typeOfRental: "" + type })),
	setPrice: (price: string) => set(() => ({ price: "" + price })),
	setGuaratee: (guarantee) => set(() => ({ guaranteeValue: "" + guarantee })),
	setCurrency: (currency) => set(() => ({ monetary_currency: "" + currency })),
	setCoverPicture: (url) => set(() => ({ coverPicture: url })),
	setAddress: (address) => set(() => ({ address: "" + address })),
	setArea: (area) => set(() => ({ area: "" + area })),
	setLessor: (lessor) => set(() => ({ lessor: lessor })),
	setFiles: (file) => set(() => ({ files: file })),
	clearFiles: () => set(() => ({ files: "" })),
}));

export const loaderStatus = create<LoaderStatus>((set) => ({
	uploadingCoverPicture: "",
	updatingStatus: "Mettre à jour les information",
	setUploadingCoverPicture: (string) =>
		set(() => ({ uploadingCoverPicture: string })),
	setUpdatingStatus: (string) => set(() => ({ updatingStatus: string })),
}));

export const propretyDescription = create<PropretyDescription>((set) => ({
	interior: { rooms: [] },
	exterior: { pieces: [] },
	tenantCharge: { charges: [] },
	addInteriorRoom: (room) =>
		set((state) => ({ interior: { rooms: [...state.interior.rooms, room] } })),
	addExternalPiece: (piece) =>
		set((state) => ({
			exterior: { pieces: [...state.exterior.pieces, piece] },
		})),
	addTenantCharge: (charge) =>
		set((state) => ({
			tenantCharge: { charges: [...state.tenantCharge.charges, charge] },
		})),
	removeInteriorRoom: (index) =>
		set((state) => ({
			interior: {
				rooms: state.interior.rooms.filter(
					(room, currentIndex) => currentIndex !== index
				),
			},
		})),
}));
