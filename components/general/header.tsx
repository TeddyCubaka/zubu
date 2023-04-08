import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo.png";
import MobileHeader from "../components/mobile.header";
import { FaUserCircle, FaCaretDown, FaCaretUp, FaUser } from "react-icons/fa";
import { IoLogOut, IoHeart, IoHome, IoAddCircle } from "react-icons/io5";
import { MdChangeCircle } from "react-icons/md";
import { IconType } from "react-icons";
import { headerStore } from "../../store/header";
import { shallow } from "zustand/shallow";

export interface UserMenuLinkType {
	href: string;
	content: string;
	Icon: IconType;
	doOnClick?: () => void;
	color?: string;
}

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
				(color ? color : "color_w") +
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
			style={{ top: "90px", right: "10px", borderRadius: "0 0 5px 5px" }}
			className="absolute space_between-y gap-10 pd-20 bg_color_blue color_w shadow_w">
			<UserMenuLink
				href="#"
				content="Propriétés enreigistrées"
				Icon={IoHeart}
			/>
			<UserMenuLink href="#" content="Vos propriétés" Icon={IoHome} />
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

export default function Header() {
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
			<MobileHeader />
			<div className="header">
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
					{/* <Link href="#" className="color_w text_dec_none m_x-20">
					Notification
				</Link>
				<Link href="#" className="color_w text_dec_none m_x-20">
					Visites
				</Link> */}
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
										fontSize: "35px",
										fontWeight: 600,
										width: 50,
										height: 50,
									}}>
									{username}
								</div>
								{isUserMenuShowing ? (
									<FaCaretUp size={18} />
								) : (
									<FaCaretDown size={18} />
								)}
							</>
						) : (
							<FaUserCircle size={35} color="white" />
						)}
					</div>
				</div>
			</div>
			{isUserMenuShowing ? <UserMenu /> : ""}
		</>
	);
}
