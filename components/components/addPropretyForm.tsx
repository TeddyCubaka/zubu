import React from "react";
import {
	GetAddress,
	GetLosor,
	GetPrice,
	GetPropretyType,
	ViewInformationPuted,
	CreatePropretyStatus,
} from "./PrpretysData";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";

export default function AddPropretiyForm() {
	const [count] = publicationStore((state) => [state.count], shallow);
	return (
		<div>
			<div style={{ margin: "40px 0" }}>{"<=="} retour</div>
			{count === 0 ? (
				<GetAddress />
			) : count === 1 ? (
				<GetPropretyType />
			) : count === 2 ? (
				<GetLosor />
			) : count === 3 ? (
				<GetPrice />
			) : count === 4 ? (
				<ViewInformationPuted />
			) : (
				<CreatePropretyStatus />
			)}
		</div>
	);
}
