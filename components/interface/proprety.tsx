export interface LessorType {
	fullName: string;
	contacts: string;
}

export interface BasicalDetailsType {
	name: string;
	content: string;
}
export type AnnouncementPeriodType = [string | null, string | null];

export interface RentalInformationType {
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
	lessor: LessorType;
	announcementPeriod: AnnouncementPeriodType;
}

export interface PropretyGalleryImageType {
	_id: string;
	url: string;
	width: number;
	height: number;
	size: number;
	uploadDate: string;
	publicId: string;
}

export interface TenantChargeType {
	charge: string;
	price: number;
	currency: string;
}

export interface RoomDetailsType {
	name: string;
	size: number;
	unit: string;
}

export interface PropretyType {
	_id: string;
	owner: string;
	uploadDate: string;
	updateDate: string[];
	questions: string[];
	visits: string[];
	rentalInformation: RentalInformationType;
	description: {
		gallery: PropretyGalleryImageType[];
		tenantCharges: TenantChargeType[];
		interior: {
			rooms: RoomDetailsType[];
		};
		external: {
			rooms: RoomDetailsType[];
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

export interface DisplayPropretiesComponentProps {
	propreties: PropretyType[];
}

export interface SearchPropretiesType {
	wishedAddress: string;
	_setWishedAddress: (address: string) => void;
}
