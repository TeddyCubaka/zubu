import React from "react";
import Head from "next/head";
import { testStore } from "../store/zustandTest";

export default function Publication() {
	const counter = testStore((state) => state.count);
	const setCounter = testStore((state) => state.update);
	return (
		<>
			<Head>
				<title>Zubu</title>
				<meta
					name="description"
					content="Chercher un maison à louer à Kinshasa."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div>counter : {counter} </div>
				<button onClick={setCounter}>Update</button>
			</main>
		</>
	);
}
