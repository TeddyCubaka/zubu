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
	const [count, sendingData, databaseResponseStatus] = publicationStore(
		(store) => [store.count, store.sendingData, store.databaseResponseStatus],
		shallow
	);
	return (
		<div className="form_card">
			{sendingData ? <span className="loader_like_google"></span> : ""}
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
			{sendingData ? (
				<div className="flex_x-center">
					Création de la propriété. Veuiller patientez, s`&apos;`il vous plait
				</div>
			) : (
				""
			)}
		</div>
	);
}
