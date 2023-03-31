export interface User {
	mail: string;
	phone_number: string;
	password: string;
	username: string;
	gender: string;
	profile_picture_url: string;
	created_at: string;
	proprety: string[];
	pending_visit: string[];
	sending_visit: string[];
	proprety_saved: string[];
	notifications: [
		{
			type: string;
			url: string;
			writting_date: string;
			object: string;
			content: string;
		}
	];
}

export interface UserUpdateDatas {
	_setMail: (string: string) => void;
	_setPhoneNumber: (string: string) => void;
	_setPassword: (string: string) => void;
	_setUsername: (string: string) => void;
	_setGender: (string: string) => void;
	_setProfilePictureUrl: (string: string) => void;
	_setCreatedAt: (string: string) => void;
	_setproprety: (array: string) => void;
	_setpendingVisit: (array: string) => void;
	_setsendingVisit: (array: string) => void;
	_setpropretySaved: (array: string) => void;
}
