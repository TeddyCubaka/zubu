import Link from "next/link";
import { useEffect, useState } from "react";
import { userStore } from "../../store/user";
import {
	DisplayPropretiesComponentProps,
	PropretyType,
} from "../interface/proprety";
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
		<span className="flex items-center">
			<Icon className="mr-2.5" /> {content}{" "}
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
			const currentUserHasString: string | null =
				localStorage.getItem("zubu_user_id");
			console.log(currentUserHasString);

			// _setCurrentUser(
			// 	JSON.parse(currentUserHasString !== null ? currentUserHasString : "")
			// );
		}
	}, [_setCurrentUser]);
	return (
		<div
			style={{ height: "200px", width: "100%" }}
			className="border-b flex m_y-20">
			<div
				style={{ height: "180px", width: "180px" }}
				className="flex justify-center items-center  m-10 border-b_thin">
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
				<div className="flex items-center">
					<h2 className="w_max">{currentUser.username}</h2>
					<div
						style={{ borderRadius: "80px" }}
						className="pd-5 color_blue border-[#123853]">
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

function DisplayPropreties({ propreties }: DisplayPropretiesComponentProps) {
	return (
		<div className="">
			{!propreties[0] ? (
				<>
					<div>
						Vous n&apos;avez aucune propriété pour le moment. Voulez Vous en
						créer une ?{" "}
						<Link
							href="/proprety/publication"
							className="font-medium text-[#25a5c4] underline">
							Remplissez ce formulaire
						</Link>{" "}
					</div>
				</>
			) : (
				<>
					{propreties.map((proprety) => (
						<PropretyCard
							key={proprety._id}
							path={"/proprety/update/" + proprety._id}
							rentalInformation={proprety.rentalInformation}
							_id={proprety._id}
						/>
					))}
				</>
			)}
		</div>
	);
}

export function GetUserPropreties() {
	const user = userStore();
	const [userExitInStorage, _setUserExitInStorage] = useState<boolean>(false);
	const [propreties, _setPropreties] = useState<PropretyType[]>([]);
	const [fetchingPropreties, _setFetchingPropreties] = useState<boolean>(false);
	useEffect(() => {
		_setFetchingPropreties(true);
		if (window !== undefined) {
			let path: string = "";
			const currentUserHasString: string | null =
				localStorage.getItem("zubu_user");
			if (currentUserHasString) {
				_setUserExitInStorage(true);
				let currentUser = JSON.parse(currentUserHasString);
				path = currentUser.proprety.join("plös");
			}
			const params: AskToServerDataType = {
				path: "/proprety/select/" + path,
				doIfError: (e) => {
					_setFetchingPropreties(false);
				},
				getData: (e) => {
					_setPropreties(e);
					_setFetchingPropreties(false);
				},
				getStatus: () => {},
			};
			askToServerData(params);
		}
	}, [user.currentUserPropreties]);
	return (
		<div className="p-5 flex justify-center flex-wrap gap-5 ">
			{userExitInStorage ? (
				<>
					{fetchingPropreties ? (
						<div className="uploading_blue"></div>
					) : (
						<DisplayPropreties propreties={propreties} />
					)}
				</>
			) : (
				<div>
					Vous n&apos;êtes pas connecter,{" "}
					<Link
						href="/user/auth"
						className="font-medium text-[#25a5c4] underline">
						connectez-vous
					</Link>{" "}
				</div>
			)}
		</div>
	);
}
