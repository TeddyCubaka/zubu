import React from "react";
import Head from "next/head";
import Header from "../../components/general/header";
import AllPropreties from "../../components/general/AllPropreties";

export default function Publication() {
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
				<div className="flex m_wax h_max">Chéh</div>
				<AllPropreties />
			</main>
		</>
	);
}
