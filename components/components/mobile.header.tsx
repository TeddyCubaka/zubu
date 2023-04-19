import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { headerStore, userMenuLinks } from "../../store/header";
import { shallow } from "zustand/shallow";
import { UserMenuLink, CurrentPageInformation } from "../general/header";
import { CurrentPageInformationProps } from "../interface/header";

function UserAvatar() {
	const [username, _setUsername] = useState<string | null>("");
	const [isUserMenuShowing, changeUserMenuShowing] = headerStore(
		(store) => [store.isUserMenuShowing, store.changeUserMenuShowing],
		shallow
	);
	useEffect(() => {
		if (window !== undefined) {
			const name = window.localStorage.getItem("username");
			name !== null ? _setUsername(name) : null;
		}
	}, []);
	return (
		<div className="flex_x-center bg_color_blue" style={{ height: "150px" }}>
			<Link href="#userProfil" className="text_dec_none m_x-10">
				{username ? (
					<div
						className="flex_center-xy"
						style={{
							borderRadius: "40px",
							backgroundColor: "white",
							color: "#123853",
							fontSize: "20px",
							fontWeight: 600,
							width: 35,
							height: 35,
						}}
						onClick={() => {}}>
						{username[0].toUpperCase()}
					</div>
				) : (
					<FaUserCircle size={35} color="white" />
				)}
			</Link>
			<div
				style={{ justifyContent: "flex-end" }}
				className="color_w w_max flex m_x-20">
				{username ? (
					<h4>{username}</h4>
				) : (
					<Link
						className="color_w txt_big text_dec_none flex_x-center"
						href="/user/auth">
						Connecter vous <IoLogIn size={18} color="white" />
					</Link>
				)}
			</div>
		</div>
	);
}

const SliderBarSection = () => {
	return (
		<div className="column m_x-10">
			<h3 className="m_y-20">Menu</h3>
			<div className="column gap-20 color_b">
				{userMenuLinks.map((link) => (
					<UserMenuLink
						key={link.href + link.content + link.Icon}
						href={link.href}
						doOnClick={link.doOnClick}
						content={link.content}
						Icon={link.Icon}
						color="color_b "
					/>
				))}
			</div>
		</div>
	);
};

export default function MobileHeader(props?: CurrentPageInformationProps) {
	const [isMenuShawn, showMenu] = useState<boolean>(false);
	return (
		<div className="mobile_header">
			<div className="space_between flex_x-center w_auto pd-10">
				<Link href="/">
					<Image src={logo} width="40" height="40" alt="logo du site" />
				</Link>
				<h4>Zubu</h4>
				<div onClick={() => (isMenuShawn ? showMenu(false) : showMenu(true))}>
					<RxHamburgerMenu size={25} />
				</div>
				<div className={isMenuShawn ? "slideBarMobile row_gap-7" : "hide"}>
					<UserAvatar />
					<SliderBarSection />
					<span
						onClick={() =>
							isMenuShawn ? showMenu(false) : showMenu(true)
						}></span>
				</div>
			</div>
			<CurrentPageInformation title={props?.title || ""} />
		</div>
	);
}
