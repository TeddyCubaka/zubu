import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/big_logo.svg";
import { FaUserCircle } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { userMenuLinks } from "../../store/header";
import { UserMenuLink, CurrentPageInformation } from "../general/header";
import { CurrentPageInformationProps } from "../interface/header";
import { useRouter } from "next/router";

function UserAvatar() {
	const [username, _setUsername] = useState<string | null>("");
	useEffect(() => {
		if (window !== undefined) {
			const name = window.localStorage.getItem("zubu_username");
			name !== null ? _setUsername(name) : null;
		}
	}, []);
	return (
		<div className="flex items-center bg-[#123853]" style={{ height: "150px" }}>
			<Link href="#" className="no-underline m_x-10">
				{username ? (
					<div
						className="flex justify-center items-center"
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
				className="text-white w-full flex mx-5">
				{username ? (
					<h4>{username}</h4>
				) : (
					<Link
						className="text-white txt_big no-underline flex items-center"
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
		<div className="flex flex-col mx-2.5">
			<h3 className="my-5 font-bold">Menu</h3>
			<div className="flex column gap-5 text-black">
				{userMenuLinks.map((link) => (
					<UserMenuLink
						key={link.href + link.content + link.Icon}
						href={link.href}
						doOnClick={link.doOnClick}
						content={link.content}
						Icon={link.Icon}
						color="text-black"
					/>
				))}
			</div>
		</div>
	);
};

export default function MobileHeader(props?: CurrentPageInformationProps) {
	const [isMenuShawn, showMenu] = useState<boolean>(false);
	const router = useRouter();
	return (
		<div className="md:hidden bg-[#123853] text-white sticky top-0 z-20 flex flex-col ">
			<div className="flex justify-between items-center w-auto p-2.5">
				<Link href="/">
					<Image src={logo} width="80" height="80" alt="logo du site" />
				</Link>
				<h4 onClick={() => router.reload()}>Zubu</h4>
				<div onClick={() => (isMenuShawn ? showMenu(false) : showMenu(true))}>
					<RxHamburgerMenu size={25} />
				</div>
				<div className={isMenuShawn ? "slideBarMobile row_gap-7" : "hidden"}>
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
