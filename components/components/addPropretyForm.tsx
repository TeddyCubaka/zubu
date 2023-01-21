import React from "react";
import { GetAdress, GetLosor, GetPrice, GetPropretyType } from "./PrpretysData";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";

export default function AddPropretiyForm() {
	const [count] = publicationStore((state) => [state.count], shallow);
	return (
		<div>
			{count === 0 ? (
				<GetAdress />
			) : count === 1 ? (
				<GetPropretyType />
			) : count === 2 ? (
				<GetLosor />
			) : count === 3 ? (
				<GetPrice />
			) : (
				"fin"
			)}
		</div>
	);
}
