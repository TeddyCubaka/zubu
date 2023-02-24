import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../../components/general/header";
import { propretyStore } from "../../../store/proprety";
import Footer from "../../../components/general/footer";
import PropretyNavbar from "../../../components/components/PropretyNavbar";
import {
	PropretyViewBanner,
	RentalInformation,
} from "../../../components/components/propretyView";

export default function PropretyView() {
	const proprety = propretyStore();
	const router = useRouter();
	const [propretyId, setPropretyId] = React.useState<string>("");

	useEffect(() => {
		if (router.query.id && typeof router.query.id === "string")
			setPropretyId(router.query.id);
	}, [router.query.id]);

	useEffect(() => {
		axios(process.env.NEXT_PUBLIC_DB_URL + "/proprety/" + propretyId)
			.then((res) => {
				if (!res.data[0]) proprety.setProprety(res.data);
			})
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
				<div className="two_part m_x-20">
					<div>Gallery</div>
					<div>
						<PropretyViewBanner />
						<RentalInformation />
					</div>
				</div>

				<Footer />
			</main>
		</>
	);
}
