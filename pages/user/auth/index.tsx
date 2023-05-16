import Head from "next/head";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import {
	Signup,
	Login,
	ErrorShower,
} from "../../../components/components/authCompenents";
import Footer from "../../../components/general/footer";
import Header from "../../../components/general/header";
import { userStore } from "../../../store/user";
import Link from "next/link";

export default function Auth() {
	const [sendingData, error, _setErrorData] = userStore(
		(store) => [
			store.status.sendingData,
			store.status.errorData,
			store.status._setErrorData,
		],
		shallow
	);
	const [isSignup, _setIsSignup] = useState<boolean>(true);
	const [isLogin, _setIsLogin] = useState<boolean>(false);
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
				<Header title="Connectez-vous 😃" />
				<div className="flex justify-center items-center flex-col max-md:items-start max-md:mx-8 ">
					<h1 className="font-semibold mb-12">Zubu est ravis de vous voire.</h1>
					<div>Que souhaitez-vous ?</div>
					<div>
						{" "}
						<Link
							href="/user/auth/signup"
							className="text-[#25a5c4] font-normal">
							créer un compte
						</Link>{" "}
						ou
						<Link
							href="/user/auth/login"
							className="text-[#25a5c4] font-normal">
							{" "}
							se connecter à votre compte
						</Link>{" "}
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
}
