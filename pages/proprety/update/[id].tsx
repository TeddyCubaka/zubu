import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../../components/general/header";
import { propretyStore } from "../../../store/proprety";
import Footer from "../../../components/general/footer";
import PropretyNavbar from "../../../components/components/PropretyNavbar";
import {
	PropretyGalleryUpdate,
	ExternalDescription,
	InternalDescription,
	TenantCharge,
	UpdateRentalInformation,
	PropretyBanner,
} from "../../../components/components/updatePropretyComponents";
import SomethingWentWrong from "../../../components/atoms/somethingWentWrong";

export default function Publication() {
	const proprety = propretyStore();
	const setProprety = proprety.setProprety;
	const router = useRouter();
	const [loading, _setLoading] = useState<boolean>(false);
	const [propretyId, setPropretyId] = React.useState<string>("");
	const [hasError, _setHasError] = React.useState<boolean>(false);

	useEffect(() => {
		_setLoading(true);
		proprety._setPropretyChanged(false);
		_setHasError(false);
		if (router.query.id && typeof router.query.id === "string")
			setPropretyId(router.query.id);
	}, [router.query.id]);

	useEffect(() => {
		_setLoading(true);
		_setHasError(false);
		proprety._setPropretyChanged(false);
		if (propretyId.length > 2) {
			axios
				.get(process.env.NEXT_PUBLIC_DB_SERVER_URL + "/proprety/" + propretyId)
				.then((res) => {
					proprety._setPropretyChanged(true);
					setProprety(res.data);
					_setLoading(false);
					_setHasError(false);
				})
				.catch((err) => {
					_setHasError(true);
					_setLoading(false);
					console.log(err);
				});
		}
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
				<Header />
				<div className="flex_y_center-xy gap-20">
					{loading ? <span className="uploading_blue"></span> : ""}
					{proprety.propretyChanged ? (
						<>
							<div className="two_part m-20 gap-20 proprety_update_card_section">
								<div className="">
									<UpdateRentalInformation />
									<div className="m_top-10">
										<PropretyNavbar />
									</div>
									<InternalDescription />
									<ExternalDescription />
									<TenantCharge />
								</div>
								<div className="m_right-2">
									<PropretyGalleryUpdate />
								</div>
							</div>
						</>
					) : (
						""
					)}
					{hasError ? <SomethingWentWrong /> : ""}
				</div>
				<Footer />
			</main>
		</>
	);
}
