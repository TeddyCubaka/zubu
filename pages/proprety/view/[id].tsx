import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../../components/general/header";
import { propretyStore } from "../../../store/proprety";
import Footer from "../../../components/general/footer";
import {
	AskForVisit,
	ExternalRooms,
	InternalRooms,
	PropretyGalleryView,
	PropretyViewBanner,
	RentalInformation,
	TenantCharges,
} from "../../../components/components/propretyView";

export default function PropretyView() {
	const router = useRouter();
	const setProprety = propretyStore().setProprety;
	const [propretyId, setPropretyId] = React.useState<string>("");

	useEffect(() => {
		if (router.query.id && typeof router.query.id === "string")
			setPropretyId(router.query.id);
	}, [router.query.id]);

	useEffect(() => {
		axios
			.get(process.env.NEXT_PUBLIC_DB_SERVER_URL + "/proprety/" + propretyId)
			.then((res) => {
				if (!res.data[0]) setProprety(res.data);
			})
			.catch((err) => console.log(err));
	}, [propretyId, setProprety]);

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
				<Header title="Vu de la propriété" />
				<div className="two_part m_y-20">
					<div className="border-gray br m_y-2 m_x-10 pd-10">
						<PropretyGalleryView />
					</div>
					<div className="grid m_right-10">
						<PropretyViewBanner />
						<RentalInformation />
						<AskForVisit />
						<InternalRooms />
						<ExternalRooms />
						<TenantCharges />
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
}
