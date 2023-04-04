import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
	sendToServer,
	SendToServer,
} from "../components/updatePropretyComponents";

interface SendToSherver {
	path: string;
	data: Object;
	getStatus: (status: string) => void;
	getData?: (data: Object) => void;
	doAfterSuccess?: (data: object) => void;
}
type LocalPropretyType = {
	propretyId: string;
};

export function SaveProprety({ propretyId }: LocalPropretyType) {
	const [saveState, setSaveState] = useState<boolean>(false);
	const getSaveState = () => {
		saveState ? setSaveState(false) : setSaveState(true);
	};

	const dataToSave: SendToServer = {
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
