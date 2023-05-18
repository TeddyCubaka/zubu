import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SendToServerType } from "../interface/requests";
import { askToServerData, sendToServer } from "../usefulFuction/requests";

type LocalPropretyType = {
	propretyId: string;
};

export function SaveProprety({ propretyId }: LocalPropretyType) {
	const [saveState, setSaveState] = useState<boolean>(false);
	const getSaveState = () => {
		let userHasString = window.localStorage.getItem("zubu_user");
		if (userHasString !== null) {
			let user = JSON.parse(userHasString);
			let newPropreties = [...user.proprety_saved, propretyId];
			user.proprety_saved = newPropreties;
			window.localStorage.setItem("zubu_user", JSON.stringify(user));
			saveState ? setSaveState(false) : setSaveState(true);
		}
	};

	const saveProprety: SendToServerType = {
		path: "/user/save/" + propretyId,
		data: {},
		getStatus: () => {},
		doAfterSuccess: () => {
			getSaveState();
		},
	};
	const unSaveProprety: SendToServerType = {
		path: "/user/unsave/" + propretyId,
		data: {},
		getStatus: () => {},
		doAfterSuccess: () => {
			getSaveState();
		},
	};

	useEffect(() => {
		if (localStorage.getItem("zubu_user_id")) {
			askToServerData({
				doIfError: (error) => console.log(error),
				getData: (data) => {
					if (data.includes(propretyId)) setSaveState(true);
				},
				getStatus: () => {},
				path: "/user/saves/" + localStorage.getItem("zubu_user_id"),
			});
		}
	}, []);

	return (
		<div className="flex items-center mx-[10px]">
			{" "}
			{saveState ? (
				<>
					<AiOutlineHeart
						color="black"
						size="20px"
						className="mr-[5px]"
						onClick={() => {
							sendToServer(saveProprety);
						}}
					/>{" "}
					<span className="max-sm:hidden">Sauvegarder</span>
				</>
			) : (
				<>
					<AiFillHeart
						color="black"
						size="20px"
						className="mr-[5px] max-sm:h-8 "
						onClick={() => {
							sendToServer(unSaveProprety);
						}}
					/>{" "}
					<span className="max-sm:hidden">Sauvegardé</span>
				</>
			)}{" "}
		</div>
	);
}
