import React from "react";
import { GetAdress, GetLosor, GetPrice, GetPropretyType } from "./PrpretysData";

export default function AddPropretiyForm() {
	return (
		<div>
			<GetAdress />
			<GetPropretyType />
			<GetLosor />
			<GetPrice />
		</div>
	);
}
