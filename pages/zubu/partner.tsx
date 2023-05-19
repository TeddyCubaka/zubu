import Head from "next/head";
import Header from "../../components/general/header";
import Footer from "../../components/general/footer";

export default function AboutZubu() {
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
				<Header title="À propos de zubu" />
				<h1 className="font-normal text-center w-full">
					Cette pages parlera des informations sur les partenaires de Zubu 🥲
				</h1>
				<Footer />
			</main>
		</>
	);
}
