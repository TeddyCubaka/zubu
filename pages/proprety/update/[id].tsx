import React, { useEffect } from "react";
import Head from "next/head";
import Header from "../../../components/general/header";
import { useRouter } from "next/router";
import axios from "axios";
import PropretyGalleryUpdate, {
	ExternalDescription,
	InternalDescription,
	TenantCharge,
	UpdateRentalInformation,
} from "../../../components/components/updatePropretyComponents";
import { propretyStore } from "../../../store/proprety";
import PropretyNavbar from "../../../components/components/PropretyNavbar";
import Footer from "../../../components/general/footer";

export default function Publication() {
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
				<div className="flex m_wax h_max"> updating a random proprety </div>
				<div className="two_part m_x-20">
					<div className="">
						<UpdateRentalInformation />
						<div className="m_top-10">
							<PropretyNavbar />
						</div>
						<InternalDescription />
						<ExternalDescription />
						<TenantCharge />
					</div>
					<div>
						<PropretyGalleryUpdate />
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
}
