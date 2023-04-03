import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/general/header";
import AddPropretiyForm from "../../components/components/addPropretyForm";
import Footer from "../../components/general/footer";
import Link from "next/link";

export default function Publication() {
	const [userId, setUserId] = useState<string | null>("");
	useEffect(() => {
		if (window !== undefined) {
			setUserId(localStorage.getItem("userId"));
		}
	}, []);
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
				<div className="publication_section m_y-20">
					{userId !== null ? (
						<AddPropretiyForm />
					) : (
						<div>
							Connectez-vous pour publier,{" "}
							<Link href="/user/auth">Se connecter</Link>
						</div>
					)}
				</div>
				<Footer />
			</main>
		</>
	);
}
