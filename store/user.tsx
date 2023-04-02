import { create } from "zustand";
import {
	User,
	UserUpdateDatas,
	UserStatus,
} from "../components/interface/user";

interface UserStore {
	user: User;
	seter: UserUpdateDatas;
	status: UserStatus;
}

export const userStore = create<UserStore>((set) => ({
	user: {
		mail: "",
		phone_number: "",
		password: "",
		username: "",
		gender: "Autre",
		profile_picture_url: "",
		created_at: "",
		proprety: [],
		pending_visit: [],
		sending_visit: [],
		proprety_saved: [],
		notifications: [
			{
				type: "",
				url: "",
				writting_date: "",
				object: "",
				content: "",
			},
		],
	},
	seter: {
		_setMail: (mail) =>
			set((store) => ({ user: { ...store.user, mail: mail } })),
		_setPhoneNumber: (phone) =>
			set((store) => ({ user: { ...store.user, phone_number: phone } })),
		_setPassword: (password) =>
			set((store) => ({ user: { ...store.user, password: password } })),
		_setUsername: (username) =>
			set((store) => ({ user: { ...store.user, username: username } })),
		_setGender: (gender) =>
			set((store) => ({ user: { ...store.user, gender: gender } })),
		_setProfilePictureUrl: (url) =>
			set((store) => ({ user: { ...store.user, profile_picture_url: url } })),
		_setCreatedAt: (date) =>
			set((store) => ({ user: { ...store.user, created_at: date } })),
		_setproprety: (propretyId) =>
			set((store) => ({
				user: { ...store.user, proprety: [...store.user.proprety, propretyId] },
			})),
		_setpendingVisit: (visitId) =>
			set((store) => ({
				user: {
					...store.user,
					pending_visit: [...store.user.pending_visit, visitId],
				},
			})),
		_setsendingVisit: (visitId) =>
			set((store) => ({
				user: {
					...store.user,
					sending_visit: [...store.user.sending_visit, visitId],
				},
			})),
		_setpropretySaved: (propretyId) =>
			set((store) => ({
				user: {
					...store.user,
					proprety_saved: [...store.user.proprety_saved, propretyId],
				},
			})),
	},
	status: {
		signup: "S'inscrire",
		signupData: {},
		getSignup: (status) =>
			set((store) => ({ status: { ...store.status, signup: status } })),
		getSignupData: (data) =>
			set((store) => ({ status: { ...store.status, signupData: data } })),
	},
}));
