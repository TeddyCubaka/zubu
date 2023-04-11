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
		<div className="flex_center-x m_x-10">
			{" "}
			{saveState ? (
				<>
					<AiOutlineHeart
						color="black"
						size="20px"
						className="m_x-5"
						onClick={() => {
							getSaveState();
							sendToServer(dataToSave);
						}}
					/>{" "}
					Sauvegarder
				</>
			) : (
				<>
					<AiFillHeart
						color="black"
						size="20px"
						className="m_x-5"
						onClick={() => {
							getSaveState();
							sendToServer(dataToSave);
						}}
					/>{" "}
					Sauvegardé
				</>
			)}{" "}
		</div>
	);
}
