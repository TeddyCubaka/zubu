import Head from "next/head";
import { useState } from "react";
import { Signup, Login } from "../../components/components/authCompenents";
import Footer from "../../components/general/footer";
import Header from "../../components/general/header";

export default function Auth() {
	const [status, setSatus] = useState<boolean>(false);
	const changeCurrentForm = () => (status ? setSatus(false) : setSatus(true));
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
					<div className="border-b flex_y_center-xy auth_component br">
						<div className="flex w_max two_part txt_center auth_component_header">
							<div
								className={
									"h_max flex_y_center-xy " +
									(status ? "current_auth_form" : "")
								}
								onClick={() => changeCurrentForm()}>
								Connection
							</div>
							<div
								className={
									"h_max flex_y_center-xy " +
									(status ? "" : "current_auth_form")
								}
								onClick={() => changeCurrentForm()}>
								Inscription
							</div>
						</div>
						<div className="auth_component">
							{status ? <Login /> : <Signup />}
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</>
	);
}
