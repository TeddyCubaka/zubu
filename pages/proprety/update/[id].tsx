import React, { useEffect } from "react";
import Head from "next/head";
import Header from "../../../components/general/header";
import { useRouter } from "next/router";
import axios from "axios";
import { UpdateRentalInformation } from "../../../components/components/updatePropretyComponents";

export default function Publication() {
	const router = useRouter();
	const [propretyId, setPropretyId] = React.useState<string>("");
	useEffect(() => {
		if (router.query.id && typeof router.query.id === "string")
			setPropretyId(router.query.id);
	}, [router.query.id]);
	console.log(propretyId);
	useEffect(() => {
		axios(process.env.NEXT_PUBLIC_DB_URL + "/proprety/" + propretyId)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	}, [propretyId]);

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
				<Header />
				<div className="flex m_wax h_max"> updating a random proprety </div>
				<div className="double_column">
					<UpdateRentalInformation />
				</div>
			</main>
		</>
	);
}
