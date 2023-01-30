import { create } from "zustand";
import {
	Proprety,
	Lessor,
	TenantCharge,
	RoomDetails,
} from "../components/interface/proprety";

export interface UpdateRentalInformation {
	files: string | Blob;
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

export interface PropretyDescriptionModel {
	name: "";
	details: "";
}

export interface UpdateDescription {
	addInteriorRoom: (rooms: RoomDetails) => void;
	addExternalPiece: (piece: RoomDetails) => void;
	addTenantCharge: (charge: TenantCharge) => void;
	removeInteriorRoom: (index: number) => void;
}

interface PropretyStore {
	proprety: Proprety;
	setProprety: (proprety: Proprety) => void;
	updateRenatlInformation: UpdateRentalInformation;
	updateDescription: UpdateDescription;
}

export const propretyStore = create<PropretyStore>((set) => ({
	proprety: {
		_id: "",
		owner: "",
		uploadDate: "",
		updateDate: [],
		questions: [],
		visits: [],
		rentalInformation: {
			isAvailable: false,
			availabilityDate: "",
			RentalType: "",
			geolocalisation: "",
			price: "",
			guaranteeValue: "",
			monetaryCurrency: "",
			coverPicture: "",
			address: "",
			area: "",
			lessor: { fullName: "", contacts: "" },
		},
		description: {
			gallery: [],
			tenantCharges: [],
			interior: {
				rooms: [],
			},
			external: {
				rooms: [],
			},
			furniture: [],
			geographicLocation: {
				nearestSchoolDistance: [
					{
						name: "",
						geolocalisation: "",
						grade: "",
						distance: "",
					},
				],
				nearestTransportationStopDistance: [
					{
						name: "",
						geolocalisation: "",
						distance: "",
					},
				],
			},
		},
		contacts: [],
		rentHistorical: [
			{
				modificationDate: "",
				whathange: [{ change: "" }],
			},
		],
		statistics: {
			referencingNote: 0,
			averagePiewsPerWeek: 0,
			averagePrade: 0,
			averageViewsPerMonth: 0,
			personWhoNoted: 0,
			averageVisitsPerWeek: 0,
			viewsPerWeek: [
				{
					startTime: "",
					endTime: "",
					numberOfView: 0,
				},
			],
			viewsPerMonth: [
				{
					startTime: "",
					endTime: "",
					numberOfView: 0,
				},
			],
		},
	},
	setProprety: (proprety) =>
		set((state) => ({ ...state.proprety, proprety: proprety })),
	updateRenatlInformation: {
		files: "",
		changeAvailability: (state) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						isAvailable: state,
					},
				},
			})),
		setAvailabilyDate: (date) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						availabilityDate: date,
					},
				},
			})),
		setType: (type) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						RentalType: type,
					},
				},
			})),
		setPrice: (price) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						price: price,
					},
				},
			})),
		setGuaratee: (guarantee) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						guaranteeValue: guarantee,
					},
				},
			})),
		setCurrency: (currency) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						monetaryCurrency: currency,
					},
				},
			})),
		setCoverPicture: (url) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						coverPicture: url,
					},
				},
			})),
		setAddress: (address) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						address: address,
					},
				},
			})),
		setArea: (area) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						area: area,
					},
				},
			})),
		setLessor: (lessor) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						lessor: lessor,
					},
				},
			})),
		setFiles: (file) =>
			set((store) => ({
				updateRenatlInformation: {
					...store.updateRenatlInformation,
					files: file,
				},
			})),
		clearFiles: () =>
			set((store) => ({
				updateRenatlInformation: {
					...store.updateRenatlInformation,
					files: "",
				},
			})),
	},
	updateDescription: {
		addInteriorRoom: () => {},
		addExternalPiece: () => {},
		addTenantCharge: () => {},
		removeInteriorRoom: () => {},
	},
}));

export interface LoaderStatus {
	uploadingCoverPicture: string;
	updatingStatus: string;
	setUpdatingStatus: (string: string) => void;
	setUploadingCoverPicture: (string: string) => void;
}

export const loaderStatus = create<LoaderStatus>((set) => ({
	uploadingCoverPicture: "",
	updatingStatus: "Mettre à jour les information",
	setUploadingCoverPicture: (string) =>
		set(() => ({ uploadingCoverPicture: string })),
	setUpdatingStatus: (string) => set(() => ({ updatingStatus: string })),
}));
