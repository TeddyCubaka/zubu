import Head from "next/head";
import Header from "../components/general/header";
import Main from "../components/general/main";
import Footer from "../components/general/footer";
import WhatDoesZubu from "../components/components/whatDoesZubu";
import { useEffect } from "react";
import { askToServerData } from "../components/usefulFuction/requests";

export default function Home() {
	// useEffect(() => {
	// 	if (localStorage.getItem("zubu_user_id")) {
	// 		askToServerData({
	// 			doIfError: (error) => console.log(error),
	// 			getData: (user) => {
	// 				if (user) {
	// 					localStorage.setItem("zubu_userId", user._id);
	// 					localStorage.setItem("zubu_user", JSON.stringify(user));
	// 					localStorage.setItem("zubu_username", user.username);
	// 					localStorage.setItem("userPropreties", user.proprety.join("plös"));
	// 				}
	// 			},
	// 			getStatus: () => {},
	// 			path: "/user/" + localStorage.getItem("zubu_user_id"),
	// 		});
	// 	}
	// }, []);
	useEffect(() => {
		if (localStorage.getItem("zubu_user_id")) {
			askToServerData({
				doIfError: (error) => console.log(error),
				getData: (user) => {
					console.log(user);
				},
				getStatus: () => {},
				path: "",
			});
		}
	}, []);
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
