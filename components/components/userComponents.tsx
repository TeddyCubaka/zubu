import Link from "next/link";
import { useEffect, useState } from "react";
import { userStore } from "../../store/user";
import { PropretyType } from "../interface/proprety";
import { AskToServerDataType } from "../interface/requests";
import { askToServerData } from "../usefulFuction/requests";
import PropretyCard from "./propretyViewCard";
import {
	MdMailOutline,
	MdLocalPhone,
	MdHome,
	MdMale,
	MdFemale,
} from "react-icons/md";
import { IoAlert } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import { IconType } from "react-icons";

interface TextWithIconType {
	Icon: IconType;
	content: string;
}

const TextWithIcon = ({ Icon, content }: TextWithIconType) => {
	return (
		<span className="flex_x-center">
			<Icon className="m_right-10" /> {content}{" "}
		</span>
	);
};

export function UserInformation() {
	const [currentUser, _setCurrentUser] = userStore(
		(store) => [store.currentUser, store._setCurrentUser],
		shallow
	);
	useEffect(() => {
		if (window !== undefined) {
			const currentUserHasString: string | null = localStorage.getItem("user");
			_setCurrentUser(
				JSON.parse(currentUserHasString !== null ? currentUserHasString : "")
			);
		}
	}, [_setCurrentUser]);
	return (
		<div
			style={{ height: "200px", width: "100%" }}
			className="border-b flex m_y-20">
			<div
				style={{ height: "180px", width: "180px" }}
				className="flex_center-xy  m-10 border-b_thin">
				{currentUser.profile_picture_url &&
				currentUser.profile_picture_url.length > 0 ? (
					<Image
						alt={"Photo de profil zubu de " + currentUser.username}
						src={currentUser.profile_picture_url}
						height={300}
						width={300}
					/>
				) : (
					<FaUserTie size={"150px"} />
				)}
			</div>
			<div className="m_y-10 w_max space_between-y">
				<div className="flex_x-center">
					<h2 className="w_max">{currentUser.username}</h2>
					<div
						style={{ borderRadius: "80px" }}
						className="pd-5 color_blue border-blue">
						{currentUser.gender === "Homme" ? <MdMale size={25} /> : ""}
						{currentUser.gender === "Femme" ? <MdFemale size={25} /> : ""}
						{currentUser.gender === "Autre" ? <IoAlert size={25} /> : ""}
					</div>
				</div>
				<TextWithIcon Icon={MdMailOutline} content={currentUser.mail} />
				<TextWithIcon Icon={MdLocalPhone} content={currentUser.phone_number} />
				<TextWithIcon
					Icon={MdHome}
					content={currentUser.proprety.length + " propriété(s)"}
				/>
				<TextWithIcon Icon={MdMailOutline} content={currentUser.created_at} />
			</div>
		</div>
	);
}

export function GetUserPropreties() {
	const user = userStore();
	const [userExitInStorage, _setUserExitInStorage] = useState<boolean>(false);
	const [propreties, _setPropreties] = useState<PropretyType[]>([]);
	useEffect(() => {
		if (window !== undefined) {
			let path: string = "";
			const currentUserHasString: string | null = localStorage.getItem("user");
			if (currentUserHasString) {
				_setUserExitInStorage(true);
				let currentUser = JSON.parse(currentUserHasString);
				path = currentUser.proprety.join("plös");
			}
			const params: AskToServerDataType = {
				path: "/proprety/select/" + path,
				doIfError: () => {},
				getData: _setPropreties,
				getStatus: () => {},
			};
			console.log("user :", user.currentUserPropreties);
			askToServerData(params);
		}
	}, [user.currentUserPropreties]);
	return (
		<div>
			{userExitInStorage ? (
				<div>
					{propreties.length > 0 ? (
						<div className="pd-20 flex_x_center-wrap all_propreties">
							{" "}
							{propreties.map((proprety) => (
								<PropretyCard
									key={proprety._id}
									path={"/proprety/update/" + proprety._id}
									rentalInformation={proprety.rentalInformation}
									_id={proprety._id}
								/>
							))}{" "}
						</div>
					) : (
						""
					)}
				</div>
			) : (
				<div>
					Vous n&apos;êtes pas connecter,{" "}
					<Link href="/user/auth">connectez-vous</Link>{" "}
				</div>
			)}
		</div>
	);
}
