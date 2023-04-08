import Link from "next/link";
import { useEffect, useState } from "react";
import { userStore } from "../../store/user";
import { Proprety } from "../interface/proprety";
import { AskToServerDataType } from "../interface/requests";
import { User } from "../interface/user";
import { askToServerData } from "../usefulFuction/requests";
import PropretyCard from "./propretyViewCard";

export function GetUserPropreties() {
	const user = userStore();
	const [userExitInStorage, _setUserExitInStorage] = useState<boolean>(false);
	const [propreties, _setPropreties] = useState<Proprety[]>([]);
	useEffect(() => {
		if (window !== undefined) {
			let path: string = "";
			const currentUserHasString: string | null = localStorage.getItem("user");
			if (currentUserHasString) {
				_setUserExitInStorage(true);
				let currentUser = JSON.parse(currentUserHasString);
				path = currentUser.proprety.join("plös");
			}
			const params: AskToServerDataType = {
				path: "/proprety/select/" + path,
				doIfError: () => {},
				getData: _setPropreties,
				getStatus: () => {},
			};
			console.log("user :", user.currentUserPropreties);
			askToServerData(params);
		}
	}, []);
	return (
		<div>
			{userExitInStorage ? (
				<div>
					{propreties.length > 0 ? (
						<div className="pd-20 flex_x_center-wrap all_propreties">
							{" "}
							{propreties.map((proprety) => (
								<PropretyCard
									key={proprety._id}
									path={"/proprety/update/" + proprety._id}
									rentalInformation={proprety.rentalInformation}
									_id={proprety._id}
								/>
							))}{" "}
						</div>
					) : (
						""
					)}
				</div>
			) : (
				<div>
					Vous n'êtes pas connecter,{" "}
					<Link href="/user/auth">connectez-vous</Link>{" "}
				</div>
			)}
		</div>
	);
}
