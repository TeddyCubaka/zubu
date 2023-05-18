import { create } from "zustand";
import { FaHouseUser } from "react-icons/fa";
import { IoLogOut, IoHeart, IoAddCircle, IoKey } from "react-icons/io5";
import { MdChangeCircle } from "react-icons/md";
import { UserMenuLinkType } from "../components/interface/header";

interface HeaderType {
	isUserMenuShowing: boolean;
	changeUserMenuShowing: (state: boolean) => void;
}

export const headerStore = create<HeaderType>((set) => ({
	isUserMenuShowing: false,
	changeUserMenuShowing: (state) => set(() => ({ isUserMenuShowing: state })),
}));

export const userMenuLinks: UserMenuLinkType[] = [
	{
		href: "/proprety",
		content: "Louer un bien",
		Icon: IoKey,
	},
	{
		href: "/user/propreties/saves",
		content: "Propriétés enreigistrées",
		Icon: IoHeart,
	},
	{
		href: "/user/propreties",
		content: "Vos propriétés",
		Icon: FaHouseUser,
	},
	{
		href: "/proprety/publication",
		content: "Publier un bien",
		Icon: IoAddCircle,
	},
	{
		href: "/user/auth",
		content: "Changer de compte",
		Icon: MdChangeCircle,
	},
	{
		href: "/",
		content: "Se deconnecter",
		Icon: IoLogOut,
		doOnClick: () => {
			localStorage.removeItem("zubu_token");
			localStorage.removeItem("zubu_user");
			localStorage.removeItem("zubu_username");
			localStorage.removeItem("userPropreties");
			localStorage.removeItem("zubu_user_id");
		},
	},
];
 
