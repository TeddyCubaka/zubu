import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/big_logo.svg";
import MobileHeader from "./mobile.header";
import { FaUserCircle, FaChevronLeft } from "react-icons/fa";
import { headerStore, userMenuLinks } from "../../store/header";
import {
	CurrentPageInformationProps,
	UserMenuLinkType,
} from "../interface/header";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";

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
		<Link href={href}>
			<span
				className={
					(href === "#" ? "text-gray-400" : color ? color : "text-white") +
					"  no-underline flex items-center hover:font-medium"
				}
				onClick={() => {
					changeUserMenuShowing(false);
					doOnClick ? doOnClick() : "";
				}}>
				<Icon size={18} className="mr-2.5" /> {content}
			</span>
		</Link>
	);
};

function UserMenu() {
	const [username, _setUsername] = useState<string>("");
	const [changeUserMenuShowing] = headerStore(
		(store) => [store.changeUserMenuShowing],
		shallow
	);
	useEffect(() => {
		if (window !== undefined) {
			const user = window.localStorage.getItem("zubu_username");
			user !== null ? _setUsername(user) : "";
		}
	}, []);
	return (
		<>
			<span
				className="block absolute bg-transparent w-screen h-screen top-0 right-0 z-[70]"
				onClick={() => {
					changeUserMenuShowing(false);
				}}></span>
			<div className="fixed flex flex-col top-[70px] right-2.5 rounded-[0_0_5px_5px] gap-2.5 p-5 bg-[#123853] text-white z-[80]">
				<Link
					href="/user"
					className="border-0 border-b border-b-white flex items-center gap-2.5 pb-2">
					{username ? (
						<>
							<FaUserCircle size={18} />{" "}
							<span
								className="w-full"
								onClick={() => {
									changeUserMenuShowing(false);
								}}>
								{username}
							</span>
						</>
					) : (
						"connecter vous"
					)}
				</Link>
				{userMenuLinks.map((link) => (
					<UserMenuLink
						key={link.href + link.content + link.Icon}
						href={link.href}
						doOnClick={link.doOnClick}
						content={link.content}
						Icon={link.Icon}
					/>
				))}
			</div>
		</>
	);
}

export function CurrentPageInformation(props: CurrentPageInformationProps) {
	const router = useRouter();
	return (
		<div
			className={
				router.pathname == "/"
					? "hidden"
					: "shadow-[-1px_1px_2px_1px_#00000080] flex w-auto p-2.5 gap-5 border-white bg-white text-black"
			}>
			<button
				className="border-none bg-none flex items-center justify-center text-black"
				onClick={() => router.back()}>
				<FaChevronLeft size={16} />{" "}
				<span className="max-md:hidden">Retour</span>
			</button>
			<h5 className="font-normal">{props.title}</h5>
		</div>
	);
}

export default function Header(props?: CurrentPageInformationProps) {
	const [username, _setUsername] = useState<string | null>("");
	const [isUserMenuShowing, changeUserMenuShowing] = headerStore((store) => [
		store.isUserMenuShowing,
		store.changeUserMenuShowing,
	]);
	useEffect(() => {
		if (window !== undefined) {
			const user = window.localStorage.getItem("zubu_username");
			user !== null ? _setUsername(user[0].toUpperCase()) : "";
		}
	}, []);
	return (
		<>
			<MobileHeader title={props?.title || ""} />
			<div className="text-white bg-[#123853] flex flex-col sticky top-0 z-30 max-md:hidden">
				<div className="w-auto px-5 py-2 flex justify-between items-center">
					<div className="flex items-center gap-5 font-normal">
						<Link href="/">
							<Image src={logo} width="100" height="100" alt="logo du site" />
						</Link>
						<div>
							<Link href="/proprety" className="text-white no-underline mx-5">
								Louer un bien
							</Link>
							<Link
								href="/proprety/publication"
								className="text-white no-underline mx-5 ">
								Publier un bien
							</Link>
							<Link
								href="/user/propreties/saves"
								className="text-white no-underline mx-5">
								Vos favoris
							</Link>
						</div>
					</div>
					<div className="flex items-center">
						<div
							className="text-white no-underline mx-5 flex flex-col justify-center items-center"
							onClick={() =>
								isUserMenuShowing
									? changeUserMenuShowing(false)
									: changeUserMenuShowing(true)
							}>
							{username ? (
								<>
									<div className="flex justify-center items-center rounded-3xl bg-white text-[#123853] text-[25px] font-semibold w-[40px] h-[40px]">
										{username}
									</div>
								</>
							) : (
								<FaUserCircle size={35} color="white" />
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
