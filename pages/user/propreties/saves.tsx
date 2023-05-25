import Head from "next/head";
import { DisplayPropreties } from "../../../components/components/userComponents";
import Footer from "../../../components/general/footer";
import Header from "../../../components/general/header";

import Link from "next/link";
import { useEffect, useState } from "react";
import { userStore } from "../../../store/user";
import { PropretyType } from "../../../components/interface/proprety";
import { AskToServerDataType } from "../../../components/interface/requests";
import { askToServerData } from "../../../components/usefulFuction/requests";
import PropretyCard from "../../../components/components/propretyViewCard";

export function GetUserPropreties() {
	const user = userStore();
	const [userExitInStorage, _setUserExitInStorage] = useState<boolean>(false);
	const [propreties, _setPropreties] = useState<PropretyType[]>([]);
	const [fetchingPropreties, _setFetchingPropreties] = useState<boolean>(false);

	useEffect(() => {
		_setFetchingPropreties(true);
		if (window !== undefined) {
			let path: string = "";
			const currentUserHasString: string | null =
				localStorage.getItem("zubu_user");
			if (currentUserHasString) {
				_setUserExitInStorage(true);
				let currentUser = JSON.parse(currentUserHasString);
				path = currentUser.proprety_saved?.join("plös");
			}
			const params: AskToServerDataType = {
				path: "/proprety/select/" + path,
				doIfError: (e) => {
					_setFetchingPropreties(false);
				},
				getData: (e) => {
					_setPropreties(e);
					_setFetchingPropreties(false);
				},
				getStatus: (e) => {},
			};
			askToServerData(params);
		}
	}, [user.currentUserPropreties]);
	return (
		<div className="p-5 flex justify-center flex-wrap gap-5 ">
			{userExitInStorage ? (
				<>
					{fetchingPropreties ? (
						<div className="uploading_blue"></div>
					) : (
						<>
							<div className="p-5 flex-1 h-full flex justify-start items-start flex-wrap gap-5 max-md:grid max-md:grid-cols-2">
								{propreties.map((proprety) => (
									<PropretyCard
										path={"/proprety/view/" + proprety._id}
										_id={proprety._id}
										rentalInformation={proprety.rentalInformation}
										key={proprety._id}
									/>
								))}
							</div>
						</>
					)}
				</>
			) : (
				<div>
					Vous n&apos;êtes pas connecter,{" "}
					<Link
						href="/user/auth"
						className="font-medium text-[#25a5c4] underline">
						connectez-vous
					</Link>{" "}
				</div>
			)}
		</div>
	);
}

export default function UserFavoritesPropreties() {
	return (
		<>
			<Head>
				<title>Zubu : user&apos;s propreties</title>
				<meta
					name="description"
					content="Télécharger votre propriété sur la forme Zubu et elle sera prête pour une annonce"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header title="Vos propriétés favories" />
				<GetUserPropreties />
				<Footer />
			</main>
		</>
	);
}
