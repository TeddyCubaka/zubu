export interface Proprety {
	owner: string;
	uploadDate: string;
	updateDate: string[];
	questions: string[];
	visits: string[];
	rentalInformation: {
		isAvailable: boolean;
		availability_date: string;
		RentalType: string;
		geolocalisation: string;
		price: string;
		guarantee_value: string;
		monetaryCurrency: string;
		coverPicture: string;
		address: string;
		area: string;
		lessor: {
			fullName: string;
			contacts: string;
		};
	};
	description: {
		gallery: [
			{
				_id: string;
				url: string;
				width: number;
				height: number;
				size: number;
				uploadDate: string;
			}
		];
		TenantCharge: {
			electricity: number;
			water: number;
			dustbin: number;
			homeCare: number;
			housePainting: number;
			other: [
				{
					object: string;
					price: number;
				}
			];
			total: number;
		};
		interior: {
			bedrooms: string;
			livingRoom: string;
			lounge: string;
			diningRoom: string;
			kitchen: string;
			attick: string;
			floor: string;
			toilet: string;
			bathroom: string;
			homeDetails: string;
			rooms: [
				{
					name: string;
					details: string;
				}
			];
		};
		external: {
			toilets: string;
			bathrooms: string;
			garage: string;
			garden: string;
			terrace: string;
			balcony: string;
			swimming_pool: string;
			homeDetails: string;
			other: [
				{
					object: string;
					details: string;
				}
			];
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
	contacts: {
		contactMethod: string;
		phone: string[];
		mail: string;
		facebook: string;
		twiter: string;
		linkendin: string;
	};
	rentHistorical: [
		{
			modificationDate: string;
			whatDhange: [{ change: string }];
		}
	];
	statistics: {
		referencing_note: number;
		average_views_per_week: number;
		average_grade: number;
		average_views_per_month: number;
		person_who_noted: number;
		average_visits_per_week: number;
		viewsPerWeek: [
			{
				start_time: string;
				end_time: string;
				number_of_view: number;
			}
		];
		viewsPerMonth: [
			{
				start_time: string;
				end_time: string;
				number_of_view: number;
			}
		];
	};
}
