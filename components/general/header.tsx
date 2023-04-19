import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo.png";
import MobileHeader from "../components/mobile.header";
import {
	FaUserCircle,
	FaCaretDown,
	FaCaretUp,
	FaUser,
	FaChevronLeft,
} from "react-icons/fa";
import { IoLogOut, IoHeart, IoHome, IoAddCircle } from "react-icons/io5";
import { MdChangeCircle } from "react-icons/md";
import { headerStore } from "../../store/header";
import { shallow } from "zustand/shallow";
import {
	CurrentPageInformationProps,
	UserMenuLinkType,
} from "../interface/header";
import { useRouter } from "next/router";

export const UserMenuLink = ({
	href,
	content,
	Icon,
	doOnClick,
	color,
}: UserMenuLinkType) => {
	const [changeUserMenuShowing] = headerStore(
		(store) => [store.changeUserMenuShowing],
		shallow
	);
	return (
		<Link
			className={
				(href === "#" ? "color_gray" : color ? color : "color_w") +
				"  text_dec_none flex_x-center txt_meddium txt_meddium_on_hovering"
			}
			href={href}
			onClick={() => {
				changeUserMenuShowing(false);
				doOnClick ? doOnClick() : "";
			}}>
			<Icon size={18} className="m_right-10" /> {content}
		</Link>
	);
};

function UserMenu() {
	return (
		<div
			style={{
				top: "90px",
				right: "10px",
				borderRadius: "0 0 5px 5px",
				zIndex: "5",
			}}
			className="absolute space_between-y gap-10 pd-20 bg_color_blue color_w">
			<UserMenuLink
				href="#"
				content="Propriétés enreigistrées"
				Icon={IoHeart}
			/>
			<UserMenuLink
				href="/user/propreties"
				content="Vos propriétés"
				Icon={IoHome}
			/>
			<UserMenuLink
				href="/proprety/publication"
				content="Publier une propriété"
				Icon={IoAddCircle}
			/>
			<UserMenuLink href="#" content="Votre profil" Icon={FaUser} />
			<UserMenuLink
				href="/user/auth"
				content="Changer de compte"
				Icon={MdChangeCircle}
			/>
			<UserMenuLink
				href="/"
				doOnClick={() => {
					window.localStorage.removeItem("token");
					window.localStorage.removeItem("userId");
					window.localStorage.removeItem("user");
					window.localStorage.removeItem("username");
				}}
				content="Se deconnecter"
				Icon={IoLogOut}
			/>
		</div>
	);
}

export function CurrentPageInformation(props: CurrentPageInformationProps) {
	const router = useRouter();
	const [width, _setWidth] = useState<number>(0);
	useEffect(() => {
		_setWidth(window?.innerWidth);
		window?.addEventListener("resize", () => {
			console.log(_setWidth(window.innerWidth));
		});
	}, []);
	return (
		<div
			className={
				router.pathname == "/"
					? "hide"
					: "shadow_b flex w_auto pd-10 gap-20 bg_color_w color_b"
			}>
			<button
				className="border-none bg-none txt_normal flex_x-center color-b"
				onClick={() => router.back()}>
				<FaChevronLeft size={20} />
				{width > 850 ? "Retour" : ""}
			</button>
			<h4>{props.title}</h4>
		</div>
	);
}

export default function Header(props?: CurrentPageInformationProps) {
	const [username, _setUsername] = useState<string | null>("");
	const [isUserMenuShowing, changeUserMenuShowing] = headerStore(
		(store) => [store.isUserMenuShowing, store.changeUserMenuShowing],
		shallow
	);
	useEffect(() => {
		if (window !== undefined) {
			const user = window.localStorage.getItem("username");
			user !== null ? _setUsername(user[0].toUpperCase()) : "";
		}
	}, []);
	return (
		<>
			<MobileHeader title={props?.title || ""} />
			<div className="header">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
					className="w_auto pd_x-20">
					<div>
						<Link href="/">
							<Image src={logo} width="80" height="80" alt="logo du site" />
						</Link>
						<div>
							<Link href="/proprety" className="color_w text_dec_none m_x-20">
								Louer un bien
							</Link>
							<Link
								href="/proprety/publication"
								className="color_w text_dec_none m_x-20 ">
								Publier un bien
							</Link>
							<Link href="#" className="color_w text_dec_none m_x-20">
								Votre Sauvegarde
							</Link>
						</div>
					</div>
					<div>
						<div
							className="color_w text_dec_none m_x-20 flex_y_center-xy"
							onClick={() =>
								isUserMenuShowing
									? changeUserMenuShowing(false)
									: changeUserMenuShowing(true)
							}>
							{username ? (
								<>
									<div
										className="flex_center-xy"
										style={{
											borderRadius: "40px",
											backgroundColor: "white",
											color: "#123853",
											fontSize: "25px",
											fontWeight: 600,
											width: 40,
											height: 40,
										}}>
										{username}
									</div>
								</>
							) : (
								<FaUserCircle size={35} color="white" />
							)}
							{isUserMenuShowing ? (
								<FaCaretUp size={18} />
							) : (
								<FaCaretDown size={18} />
							)}
						</div>
					</div>
				</div>
				<CurrentPageInformation title={props?.title || ""} />
			</div>
			{isUserMenuShowing ? <UserMenu /> : ""}
		</>
	);
}
