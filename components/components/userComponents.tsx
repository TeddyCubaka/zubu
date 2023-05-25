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
import { User } from "../interface/user";

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

interface UserInformationsTypes {
	user: User;
}
export function UserInformation({ user }: UserInformationsTypes) {
	return (
		<div className="border-b h-[200px] w-full flex">
			<div className="flex justify-center items-center h-[180px] w-[180px] m-2.5 border-[0.6px] border-black ">
				{user.profile_picture_url?.length > 0 ? (
					<Image
						alt={"Photo de profil zubu de " + user.username}
						src={user.profile_picture_url}
						height={300}
						width={300}
					/>
				) : (
					<FaUserTie size={"150px"} />
				)}
			</div>
			<div className="my-2.5 mx-5 w-full flex flex-col justify-between">
				<div className="flex items-center">
					<h2 className="w-full">{user.username}</h2>
					<div className="pd-5 text-[#123853] rounded-full border border-[#123853]">
						{user.gender === "Homme" ? <MdMale size={25} /> : ""}
						{user.gender === "Femme" ? <MdFemale size={25} /> : ""}
						{user.gender === "Autre" ? <IoAlert size={25} /> : ""}
					</div>
				</div>
				<TextWithIcon Icon={MdMailOutline} content={user.mail} />
				<TextWithIcon Icon={MdLocalPhone} content={user.phone_number} />
				<TextWithIcon
					Icon={MdHome}
					content={user.proprety.length + " propriété(s)"}
				/>
				{/* <TextWithIcon Icon={MdMailOutline} content={user.created_at} /> */}
			</div>
		</div>
	);
}

export function DisplayPropreties({
	propreties,
}: DisplayPropretiesComponentProps) {
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
					Appuiez sur une propriété pour gérer ses informations
					<div className="mt-4 flex justify-start flex-wrap gap-5 max-md:grid max-md:grid-cols-2">
						{propreties.map((proprety) => (
							<PropretyCard
								key={proprety._id}
								path={"/proprety/update/" + proprety._id}
								rentalInformation={proprety.rentalInformation}
								_id={proprety._id}
							/>
						))}
					</div>
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
			const currentUserHasString: string | null =
				localStorage.getItem("zubu_user");
			if (currentUserHasString) {
				_setUserExitInStorage(true);
				_setPropreties(JSON.parse(currentUserHasString).proprety);
				_setFetchingPropreties(false);
			}
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
