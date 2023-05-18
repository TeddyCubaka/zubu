import Head from "next/head";
import Header from "../components/general/header";
import Main from "../components/general/main";
import Footer from "../components/general/footer";
import WhatDoesZubu from "../components/components/whatDoesZubu";

export default function Home() {
	return (
		<>
			<Head>
				<title>Zubu</title>
				<meta
					name="description"
					content="Chercher un maison à louer à Kinshasa."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/logo.svg" />
			</Head>
			<main>
				<Header title="home" />
				<Main />
				<WhatDoesZubu />
				<Footer />
			</main>
		</>
	);
}
