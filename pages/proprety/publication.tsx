import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/general/header";
import AddPropretiyForm from "../../components/components/addPropretyForm";
import Footer from "../../components/general/footer";
import Link from "next/link";
import logo from "../../components/images/big_logo.svg";
import Image from "next/image";

export default function Publication() {
	const [userId, setUserId] = useState<string | null>("");
	useEffect(() => {
		if (window !== undefined) {
			setUserId(localStorage.getItem("zubu_user_id"));
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
				<Header title="Publier votre propriété" />
				<div className="w-full flex items-center justify-center">
					{userId !== null ? (
						<div className="my-5 grid grid-cols-2 max-md:flex max-md:flex-col-reverse">
							<AddPropretiyForm />
							<div className="mx-[30px] mb-[30px] flex flex-col justify-center gap-3">
								<div>
									<Image
										src={logo}
										alt="zubu logo, svg"
										width={131}
										height={60}
									/>
								</div>
								<h4 className="mb-3 font-normal">
									Avec Zubu la location devient facile 😉
								</h4>
								<p>
									Mettez votre propriété en location en ligne en un rien de
									temps. Tout les types immobilier louables, peut importe le
									nombre. Mettez le en avant sur zubu.
								</p>
								<p>
									Trouvez des clients, même assie dans votre salon. A vous de
									jouer
								</p>
							</div>
						</div>
					) : (
						<div>
							<span>Connectez-vous pour publier, </span>
							<Link
								className="font-normal text-[#25a5c4] underline"
								href="/user/auth">
								Se connecter
							</Link>
						</div>
					)}
				</div>
				<Footer />
			</main>
		</>
	);
}
