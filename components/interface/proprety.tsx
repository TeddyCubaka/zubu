export interface BasicalDetailsType {
	name: string;
	content: string;
}
export type AnnouncementPeriodType = [string | null, string | null];

export interface RentalInformationType {
	propretyType?: string;
	roomType?: string;
	RentalType: string;
	price: number;
	guarantee: number;
	monetaryCurrency: string;
	localisation: string;
	lessorName: string;
	lessorContacts: string[];
}

export interface PropretyGalleryImageType {
	_id?: string;
	url: string;
	width: number;
	height: number;
	size: number;
	uploadDate?: string;
	publicId: string;
	createAt?: Date;
	uploadAt?: Date;
	assetId: Date;
}

export interface TenantChargeType {
	charge: string;
	price: number;
}

export interface RoomType {
	room: string;
	number: number;
}

export interface AnnouncementType {
	announcementPeriod: string;
	isAvailable: boolean;
}

export interface PropretyType {
	_id: string;
	owner: string;
	uploadDate: string;
	updateDate: string[];
	questions: string[];
	visits: string[];
	address: string;
	rentalInformation: RentalInformationType;
	gallery: PropretyGalleryImageType[];
	rooms: RoomType[];
	tenantCharges: TenantChargeType[];
	contacts: BasicalDetailsType[];
	rentHistorical: [
		{
			modificationDate: string;
			whathange: [{ change: string }];
		}
	];
	annoucement: AnnouncementType;
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
