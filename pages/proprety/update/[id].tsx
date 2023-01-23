import React from "react";
import Head from "next/head";
import Header from "../../../components/general/header";
import { useRouter } from "next/router";

export default function Publication() {
	const router = useRouter();
	console.log(router.query.id); //get the id in this route.

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
			</main>
		</>
	);
}
