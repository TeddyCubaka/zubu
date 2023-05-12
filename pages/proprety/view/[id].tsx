import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import SomethingWentWrong from "../../../components/atoms/somethingWentWrong";

export default function PropretyView() {
	// const router = useRouter();
	// const [setProprety, proprety] = propretyStore((store) => [
	// 	store.setProprety,
	// 	store.proprety,
	// ]);
	const proprety = propretyStore();
	const setProprety = proprety.setProprety;
	const _setPropretyChanged = proprety._setPropretyChanged;
	const router = useRouter();
	const [loading, _setLoading] = useState<boolean>(false);
	const [hasError, _setHasError] = React.useState<boolean>(false);
	const [propretyId, setPropretyId] = React.useState<string>("");
	useEffect(() => {
		if (router.query.id && typeof router.query.id === "string")
			setPropretyId(router.query.id);
	}, [router.query.id]);

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
				<Header title="Vu de la propriété" />
				<div className="flex justify-center items-center">
					{loading ? <span className="uploading_blue"></span> : ""}
					{proprety.propretyChanged ? (
						<div className="w-full grid grid-cols-2 max-md:grid-cols-1 my-5">
							<div className="border border-[#808080] rounded mx-2.5 max-md:my-5 p-5">
								<PropretyGalleryView />
							</div>
							<div className="mx-2.5 flex flex-col gap-5">
								<PropretyViewBanner />
								<RentalInformation />
								<AskForVisit />
								<InternalRooms />
								<hr />
								<ExternalRooms />
								<hr />
								<TenantCharges />
							</div>
						</div>
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
