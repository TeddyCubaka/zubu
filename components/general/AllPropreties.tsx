import axios from "axios";
import React, { useEffect, useState } from "react";
import { PropretyType } from "../interface/proprety";
import PropretyCard, { PropretyCardType } from "../components/propretyViewCard";
import { useRouter } from "next/router";
import { AskToServerDataType } from "../interface/requests";
import { askToServerData } from "../usefulFuction/requests";
import { searchPropretiesStore } from "../../store/proprety";
import { shallow } from "zustand/shallow";
import Link from "next/link";

export default function AllPropreties() {
	const [propreties, _setPropreties] = useState<PropretyCardType[]>([]);
	const [fetchingPropreties, _setFetchingPropreties] = useState<boolean>(false);
	const [wishedAddress] = searchPropretiesStore(
		(store) => [store.wishedAddress],
		shallow
	);

	useEffect(() => {
		if (wishedAddress == "") {
			_setFetchingPropreties(false);
		} else {
			_setFetchingPropreties(true);
			const data: AskToServerDataType = {
				path: "/proprety/get/" + wishedAddress,
				doIfError: () => {
					_setFetchingPropreties(false);
				},
				getData: (data) => {
					const response: PropretyCardType[] = [];
					console.log(data);
					data.map((proprety: PropretyType) => {
						response.push({
							_id: proprety._id,
							rentalInformation: { ...proprety.rentalInformation },
						});
					});
					_setPropreties(response);
					_setFetchingPropreties(false);
				},
				getStatus: () => {},
			};
			askToServerData(data);
		}
	}, [wishedAddress]);

	return (
		<div>
			<div className="pd-20 flex_x_center-wrap all_propreties">
				{fetchingPropreties ? (
					<div className="uploading_blue"></div>
				) : propreties.length === 0 ? (
					<div className="flex_y_center-xy txt_meddium gap-20">
						<span>Nous avons rien pour l'instant 😢</span>
						<span>
							Faites une recherche <Link href="/">ici</Link>{" "}
						</span>
					</div>
				) : (
					propreties.map((proprety) => (
						<PropretyCard
							path={"/proprety/view/" + proprety._id}
							_id={proprety._id}
							rentalInformation={proprety.rentalInformation}
							key={proprety._id}
						/>
					))
				)}
			</div>
		</div>
	);
}
