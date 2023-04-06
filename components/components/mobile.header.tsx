import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

function UserAvatar() {
	const [username, _setUsername] = useState<string | null>("");
	useEffect(() => {
		if (window !== undefined) {
			const user = window.localStorage.getItem("username");
			user !== null ? _setUsername(user[0].toUpperCase()) : "";
		}
	}, []);
	return (
		<Link href="/user/auth" className="color_w text_dec_none m_x-20">
			{username !== null ? (
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
					}}>
					{username}
				</div>
			) : (
				<FaUserCircle size="50" />
			)}
		</Link>
	);
}

export default function MobileHeader() {
	const [menuIsShow, showMenu] = useState<boolean>(false);
	return (
		<div className="mobile_header">
			<Link href="/">
				<Image src={logo} width="40" height="40" alt="logo du site" />
			</Link>
			<UserAvatar />
			<div>
				<div onClick={() => (menuIsShow ? showMenu(false) : showMenu(true))}>
					<RxHamburgerMenu size={25} />
				</div>
				<div
					className={
						menuIsShow ? "mobile_header_menu row_gap-7 pd_y-20" : "hide"
					}>
					<h3 className="txt_center">Navigation</h3>
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
					<div
						onClick={() =>
							menuIsShow ? showMenu(false) : showMenu(true)
						}></div>
				</div>
			</div>
		</div>
	);
}

{
	/* <div>
    </div> */
}
{
	/* <Link href="#" className="color_w text_dec_none m_x-20">
    Notification
</Link>
<Link href="#" className="color_w text_dec_none m_x-20">
    Visites
</Link> */
}
