import Head from "next/head";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import {
	Signup,
	Login,
	ErrorShower,
} from "../../components/components/authCompenents";
import Footer from "../../components/general/footer";
import Header from "../../components/general/header";
import { userStore } from "../../store/user";

export default function Auth() {
	const [sendingData, error] = userStore(
		(store) => [store.status.sendingData, store.status.errorData],
		shallow
	);
	const [isSignup, _setIsSignup] = useState<boolean>(false);
	const changeCurrentForm = () =>
		isSignup ? _setIsSignup(false) : _setIsSignup(true);
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
				<div className="flex_y_center-xy m_y-20">
					<div
						className={
							"flex_y_center-xy auth_component br " +
							(error.hasError ? "br_red" : "border-blue")
						}>
						{sendingData ? <span className="loader_like_google"></span> : ""}
						<div className="flex w_max two_part txt_center auth_component_header">
							<div
								className={
									"h_max flex_y_center-xy " +
									(isSignup ? "current_auth_form" : "")
								}
								onClick={() => changeCurrentForm()}>
								Inscription
							</div>
							<div
								className={
									"h_max flex_y_center-xy " +
									(isSignup ? "" : "current_auth_form")
								}
								onClick={() => changeCurrentForm()}>
								Connection
							</div>
						</div>
						<div className="auth_component">
							<ErrorShower />
							{isSignup ? <Signup /> : <Login />}
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
}
