import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo.png";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
	return (
		<div className="header">
			<div>
				<Image src={logo} width="80" height="80" alt="logo du site" />
				<div>
					<Link href="#" className="color_w text_dec_none m_x-20 ">
						Publier un bien
					</Link>
					<Link href="#" className="color_w text_dec_none m_x-20">
						Louer un bien
					</Link>
					<Link href="#" className="color_w text_dec_none m_x-20">
						Votre Sauvegarde
					</Link>
				</div>
			</div>
			<div>
				<Link href="#" className="color_w text_dec_none m_x-20">
					Notification
				</Link>
				<Link href="#" className="color_w text_dec_none m_x-20">
					Visites
				</Link>
				<Link href="#" className="color_w text_dec_none m_x-20">
					<FaUserCircle size="50" />
				</Link>
			</div>
		</div>
	);
}
