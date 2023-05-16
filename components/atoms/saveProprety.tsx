import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SendToServerType } from "../interface/requests";
import { sendToServer } from "../usefulFuction/requests";

type LocalPropretyType = {
	propretyId: string;
};

export function SaveProprety({ propretyId }: LocalPropretyType) {
	const [saveState, setSaveState] = useState<boolean>(false);
	const getSaveState = () => {
		saveState ? setSaveState(false) : setSaveState(true);
	};

	const dataToSave: SendToServerType = {
		path: "/user/save/" + propretyId,
		data: {},
		getStatus: () => {},
		doAfterSuccess: (e) => {
			console.log(e);
		},
	};

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
							getSaveState();
							sendToServer(dataToSave);
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
							getSaveState();
							sendToServer(dataToSave);
						}}
					/>{" "}
					<span className="max-sm:hidden">Sauvegardé</span>
				</>
			)}{" "}
		</div>
	);
}
