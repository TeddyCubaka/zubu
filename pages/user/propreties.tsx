import Head from "next/head";
import { GetUserPropreties } from "../../components/components/userComponents";
import Footer from "../../components/general/footer";
import Header from "../../components/general/header";

export default function UserPropreties() {
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
				<div className="m_x-20">
					<h1>Vos propriétés</h1>
					<div className="m_y-20">
						Appuiez sur une propriété pour gérer ses informations
					</div>
					<GetUserPropreties />
				</div>
				<Footer />
			</main>
		</>
	);
}
