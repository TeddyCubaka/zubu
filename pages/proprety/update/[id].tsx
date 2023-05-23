import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../../components/general/header";
import { propretyStore } from "../../../store/proprety";
import Footer from "../../../components/general/footer";
import {
	PropretyGalleryUpdate,
	ExternalDescription,
	InternalDescription,
	TenantCharge,
	UpdateRentalInformation,
} from "../../../components/components/updatePropretyComponents";
import SomethingWentWrong from "../../../components/atoms/somethingWentWrong";

export default function Publication() {
	const proprety = propretyStore();
	const setProprety = proprety.setProprety;
	const _setPropretyChanged = proprety._setPropretyChanged;
	const router = useRouter();
	const [loading, _setLoading] = useState<boolean>(false);
	const [propretyId, setPropretyId] = React.useState<string>("");
	const [hasError, _setHasError] = React.useState<boolean>(false);

	useEffect(() => {
		_setLoading(true);
		_setPropretyChanged(false);
		_setHasError(false);
		if (router.query.id && typeof router.query.id === "string")
			setPropretyId(router.query.id);
	}, [router.query.id, _setPropretyChanged]);

	useEffect(() => {
		_setLoading(true);
		_setHasError(false);
		_setPropretyChanged(false);
		if (propretyId.length > 2) {
			axios
				.get(process.env.NEXT_PUBLIC_DB_SERVER_URL + "/proprety/" + propretyId)
				.then((res) => {
					_setPropretyChanged(true);
					setProprety(res.data);
					_setLoading(false);
					_setHasError(false);
				})
				.catch((err) => {
					_setHasError(true);
					_setLoading(false);
				});
		}
	}, [propretyId, setProprety, _setPropretyChanged]);

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
				<Header title="Gestion de la propriété" />
				<div className="flex flex-col justify-center items-center gap-5 ">
					{loading ? <span className="uploading_blue"></span> : ""}
					{proprety.propretyChanged ? (
						<>
							<div className="grid grid-cols-2 m-5 max-md:mx-3 gap-5 max-md:flex max-md:flex-col ">
								<div>
									<UpdateRentalInformation />
									<InternalDescription />
									<ExternalDescription />
									<TenantCharge />
								</div>
								<PropretyGalleryUpdate />
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
