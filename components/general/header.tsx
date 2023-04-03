import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo.png";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
	const [username, _setUsername] = useState<string | null>("");
	useEffect(() => {
		if (window !== undefined) {
			const user = window.localStorage.getItem("username");
			user !== null ? _setUsername(user[0].toUpperCase()) : "";
		}
	}, []);
	return (
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
				<Link href="/user/auth" className="color_w text_dec_none m_x-20">
					{username !== null ? (
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
					) : (
						<FaUserCircle size="50" />
					)}
				</Link>
			</div>
		</div>
	);
}
