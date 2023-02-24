import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export function SaveProprety() {
	const [saveState, setSaveState] = useState<boolean>(false);
	const getSaveState = () => {
		saveState ? setSaveState(false) : setSaveState(true);
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
						onClick={() => getSaveState()}
					/>{" "}
					Sauvegarder
				</>
			) : (
				<>
					<AiFillHeart
						color="black"
						size="20px"
						className="m_x-5"
						onClick={() => getSaveState()}
					/>{" "}
					Sauvegardé
				</>
			)}{" "}
		</div>
	);
}
