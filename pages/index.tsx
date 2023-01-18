import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Header from "../components/general/header";
import Main from "../components/general/main";

export default function Home() {
	return (
		<>
			<Head>
				<title>Zubu</title>
				<meta name="description" content="Chercher un maison à louer à Kinshasa." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header />
				<Main />
			</main>
		</>
	);
}
