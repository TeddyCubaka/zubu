import Head from "next/head";
import {
	DisplayPropreties,
	UserInformation,
} from "../../components/components/userComponents";
import Footer from "../../components/general/footer";
import Header from "../../components/general/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { userStore } from "../../store/user";
import { User } from "../../components/interface/user";

export default function UserProfile() {
	const user = userStore();
	const [userExitInStorage, _setUserExitInStorage] = useState<boolean>(false);
	const [propreties, _setPropreties] = useState<any>([]);
	const [fetchingPropreties, _setFetchingPropreties] = useState<boolean>(false);
	const [currentUser, _setCurrentUser] = useState<any>({});
	useEffect(() => {
		_setFetchingPropreties(true);
		if (window !== undefined) {
			const currentUserHasString: string | null =
				localStorage.getItem("zubu_user");
			if (currentUserHasString) {
				_setUserExitInStorage(true);
				_setCurrentUser(JSON.parse(currentUserHasString));
				_setPropreties(JSON.parse(currentUserHasString).proprety);
				_setFetchingPropreties(false);
			}
		}
	}, [user.currentUserPropreties]);
	return (
		<>
			<Head>
				<title>Zubu</title>
				<meta
					name="description"
					content="Télécharger votre propriété sur la forme Zubu et elle sera prête pour une annonce"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header title="Vous" />
				<div className="m-5 flex flex-col justify-center flex-wrap gap-5 ">
					{userExitInStorage ? (
						fetchingPropreties ? (
							<div className="uploading_blue"></div>
						) : (
							<>
								<UserInformation user={currentUser} />
								<h1 className="font-semibold">Vos propriétés</h1>
								<div>
									<DisplayPropreties propreties={propreties} />
								</div>
							</>
						)
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
				<Footer />
			</main>
		</>
	);
}
