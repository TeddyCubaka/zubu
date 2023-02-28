export interface Lessor {
	fullName: string;
	contacts: string;
}

export interface BasicalDetailsType {
	name: string;
	content: string;
}

export interface RentalInformation {
	isAvailable: boolean;
	availabilityDate: string;
	RentalType: string;
	geolocalisation: string;
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
	coverPicture: string;
	address: string;
	bedRooms: string;
	lessor: Lessor;
}

export interface PropretyGalleryImage {
	url: string;
	width: number;
	height: number;
	size: number;
	uploadDate: string;
}

export interface TenantCharge {
	charge: string;
	price: number;
	currency: string;
}

export interface RoomDetails {
	name: string;
	size: number;
	unit: string;
}

export interface Proprety {
	_id: string;
	owner: string;
	uploadDate: string;
	updateDate: string[];
	questions: string[];
	visits: string[];
	rentalInformation: RentalInformation;
	description: {
		gallery: PropretyGalleryImage[];
		tenantCharges: TenantCharge[];
		interior: {
			rooms: RoomDetails[];
		};
		external: {
			rooms: RoomDetails[];
		};
		furniture: string[];
		geographicLocation: {
			nearestSchoolDistance: [
				{
					name: string;
					geolocalisation: string;
					grade: string;
					distance: string;
				}
			];
			nearestTransportationStopDistance: [
				{
					name: string;
					geolocalisation: string;
					distance: string;
				}
			];
		};
	};
	contacts: BasicalDetailsType[];
	rentHistorical: [
		{
			modificationDate: string;
			whathange: [{ change: string }];
		}
	];
	statistics: {
		referencingNote: number;
		averagePiewsPerWeek: Number;
		averagePrade: number;
		averageViewsPerMonth: number;
		personWhoNoted: number;
		averageVisitsPerWeek: number;
		viewsPerWeek: [
			{
				startTime: string;
				endTime: string;
				numberOfView: number;
			}
		];
		viewsPerMonth: [
			{
				startTime: string;
				endTime: string;
				numberOfView: number;
			}
		];
	};
}

// interior: {
// 	bedRooms: string;
// 	livingRoom: string;
// 	lounge: string;
// 	diningRoom: string;
// 	kitchen: string;
// 	attick: string;
// 	floor: string;
// 	toilet: string;
// 	bathroom: string;
// 	homeDetails: string;
// 	rooms: [
// 		{
// 			name: string;
// 			details: string;
// 		}
// 	];
// };

// external: {
// 	toilets: string;
// 	bathrooms: string;
// 	garage: string;
// 	garden: string;
// 	terrace: string;
// 	balcony: string;
// 	swimming_pool: string;
// 	homeDetails: string;
// 	other: [
// 		{
// 			object: string;
// 			details: string;
// 		}
// 	];
// };
