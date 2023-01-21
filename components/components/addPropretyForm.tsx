import React from "react";
import { GetAdress, GetLosor, GetPropretyType } from "./PrpretysData";

export default function AddPropretiyForm() {
	return (
		<div>
			<GetAdress />
			<GetPropretyType />
			<GetLosor />
		</div>
	);
}
