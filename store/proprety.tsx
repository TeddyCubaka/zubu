import { create } from "zustand";
import {
	Proprety,
	Lessor,
	TenantCharge,
	RoomDetails,
	PropretyGalleryImage,
} from "../components/interface/proprety";

export interface UpdateRentalInformation {
	files: File | undefined;
	changeAvailability: (state: boolean) => void;
	setAvailabilyDate: (date: string) => void;
	setType: (type: string) => void;
	setPrice: (price: string) => void;
	setGuaratee: (guarantee: string) => void;
	setCurrency: (currency: string) => void;
	setCoverPicture: (url: string) => void;
	setAddress: (address: string) => void;
	setbedRooms: (bedRooms: string) => void;
	setLessor: (lessor: Lessor) => void;
	setFiles: (file: File) => void;
	clearFiles: () => void;
	setLessorName: (name: string) => void;
	setLessorContact: (number: string) => void;
}

export interface PropretyDescriptionModel {
	name: "";
	details: "";
}

export interface UpdateDescription {
	files: File[];
	updatingGalleryStatus: string;
	setFiles: (files: File[]) => void;
	addInteriorRoom: (rooms: RoomDetails) => void;
	addExternalRoom: (piece: RoomDetails) => void;
	addTenantCharge: (charge: TenantCharge) => void;
	addImagesToGallery: (image: PropretyGalleryImage) => void;
	removeInteriorRoom: (index: number) => void;
	removeExternalRoom: (index: number) => void;
	removeTenantCharge: (index: number) => void;
	cleanFiles: () => void;
	deleteFile: (url: number) => void;
	deleteImageFromGallery: (url: string) => void;
	setUpdatingGalleryStatus: (status: string) => void;
}

export interface PropretyStore {
	propretyChanged: boolean;
	_setPropretyChanged: (state: boolean) => void;
	proprety: Proprety;
	setProprety: (proprety: Proprety) => void;
	updateRenatlInformation: UpdateRentalInformation;
	updateDescription: UpdateDescription;
}

export const propretyStore = create<PropretyStore>((set) => ({
	propretyChanged: false,
	_setPropretyChanged: (state) => set(() => ({ propretyChanged: state })),
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
			bedRooms: "",
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
		files: undefined,
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
		setbedRooms: (bedRooms) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						bedRooms: bedRooms,
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
					files: undefined,
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
		setLessorName: (name) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						lessor: {
							...store.proprety.rentalInformation.lessor,
							name: name,
						},
					},
				},
			})),
		setLessorContact: (contacts) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					rentalInformation: {
						...store.proprety.rentalInformation,
						lessor: {
							...store.proprety.rentalInformation.lessor,
							contacts: contacts,
						},
					},
				},
			})),
	},
	updateDescription: {
		files: [],
		updatingGalleryStatus: "Sauvegarder",
		setUpdatingGalleryStatus: (string) =>
			set((store) => ({
				updateDescription: {
					...store.updateDescription,
					updatingGalleryStatus: string,
				},
			})),
		addInteriorRoom: (room) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						interior: {
							rooms: [...store.proprety.description.interior.rooms, room],
						},
					},
				},
			})),
		removeInteriorRoom: (index) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						interior: {
							rooms: store.proprety.description.interior.rooms.filter(
								(room, currentIndex) => currentIndex !== index
							),
						},
					},
				},
			})),
		addExternalRoom: (room) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						external: {
							rooms: [...store.proprety.description.external.rooms, room],
						},
					},
				},
			})),
		removeExternalRoom: (index) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						external: {
							rooms: store.proprety.description.external.rooms.filter(
								(room, currentIndex) => currentIndex !== index
							),
						},
					},
				},
			})),
		addTenantCharge: (charge) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						tenantCharges: [
							...store.proprety.description.tenantCharges,
							charge,
						],
					},
				},
			})),
		removeTenantCharge: (index) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						tenantCharges: store.proprety.description.tenantCharges.filter(
							(charge, currentIndex) => currentIndex !== index
						),
					},
				},
			})),
		setFiles: (files) =>
			set((store) => ({
				updateDescription: {
					...store.updateDescription,
					files: files,
				},
			})),
		addImagesToGallery: (image) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						gallery: [...store.proprety.description.gallery, image],
					},
				},
			})),
		deleteImageFromGallery: (urlToDelete) =>
			set((store) => ({
				proprety: {
					...store.proprety,
					description: {
						...store.proprety.description,
						gallery: store.proprety.description.gallery.filter(
							(image) => image.url !== urlToDelete
						),
					},
				},
			})),
		cleanFiles: () =>
			set((store) => ({
				updateDescription: {
					...store.updateDescription,
					files: [],
				},
			})),
		deleteFile: (index) =>
			set((store) => ({
				updateDescription: {
					...store.updateDescription,
					files: store.updateDescription.files.filter(
						(file, place) => place !== index
					),
				},
			})),
	},
}));

export interface LoaderStatus {
	uploadingCoverPicture: string;
	updatingStatus: string;
	setUpdatingStatus: (string: string) => void;
	setUploadingCoverPicture: (string: string) => void;
}

export const loaderStatus = create<LoaderStatus>((set) => ({
	uploadingCoverPicture: "Image d'origine",
	updatingStatus: "Mettre à jour les information",
	setUploadingCoverPicture: (string) =>
		set(() => ({ uploadingCoverPicture: string })),
	setUpdatingStatus: (string) => set(() => ({ updatingStatus: string })),
}));
