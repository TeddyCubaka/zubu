import Head from "next/head";
import {
	GetUserPropreties,
	UserInformation,
} from "../../components/components/userComponents";
import Footer from "../../components/general/footer";
import Header from "../../components/general/header";

export default function User() {
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
				<Header title="Vous" />
				<div className="mx-5">
					<UserInformation />
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
