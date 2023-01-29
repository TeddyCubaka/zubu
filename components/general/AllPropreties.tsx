import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

interface Proprety {
	_id: string;
	rentalInformation: {
		adress: string;
		guarantee: string;
		lessor: { fullName: string; contacts: string };
		currency: string;
		rentalType: string;
	};
}

export default function AllPropreties() {
	const [propreties, setPropreties] = useState<Proprety[]>([]);
	const getData = () => {
		axios(process.env.NEXT_PUBLIC_DB_URL + "/proprety")
			.then((res) => {
				const response: Proprety[] = [];
				res.data.map((proprety: any, index: number) => {
					response.push({
						_id: proprety._id,
						rentalInformation: {
							adress: proprety.rentalInformation.address,
							guarantee: proprety.rentalInformation.guaranteeValue,
							lessor: {
								fullName: proprety.rentalInformation.lessor.fullName,
								contacts: proprety.rentalInformation.lessor.contacts,
							},
							currency: proprety.rentalInformation.monetaryCurrency,
							rentalType: proprety.rentalInformation.typeOfRental,
						},
					});
				});
				setPropreties(response);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<button onClick={() => getData()}>Get all propreties</button>;
			<div>
				{propreties.map((proprety) => (
					<div key={proprety._id}>
						<h4>
							{" "}
							<Link href={"/proprety/update/" + proprety._id}>
								{" "}
								{proprety._id}{" "}
							</Link>{" "}
						</h4>
						<ul>
							<li> {proprety.rentalInformation.adress} </li>
							<li> {proprety.rentalInformation.currency} </li>
							<li> {proprety.rentalInformation.guarantee} </li>
							<li>
								{" "}
								{proprety.rentalInformation.lessor.fullName} et contact{" "}
								{proprety.rentalInformation.lessor.contacts}{" "}
							</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
