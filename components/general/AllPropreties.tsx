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
		_setFetchingPropreties(true);
		const data: AskToServerDataType = {
			path: "/proprety" + (wishedAddress == "" ? "" : "/get/" + wishedAddress),
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
	}, [wishedAddress]);

	return (
		<div>
			<div className="p-5 flex justify-center flex-wrap gap-5">
				{fetchingPropreties ? (
					<div className="uploading_blue"></div>
				) : propreties.length === 0 ? (
					<div className="flex justify-center items-center font-normal gap-20">
						<span>Nous avons rien pour l&lsquo;instant 😢</span>
						<span>
							Faites une recherche{" "}
							<Link className="underline text-[#25a5c4] " href="/">
								ici
							</Link>{" "}
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
