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
					if (index > 1)
						response.push({
							_id: proprety._id,
							rentalInformation: {
								adress: proprety.rental_information.address,
								guarantee: proprety.rental_information.guarantee_value,
								lessor: {
									fullName: proprety.rental_information.lessor.fullName,
									contacts: proprety.rental_information.lessor.contacts,
								},
								currency: proprety.rental_information.monetary_currency,
								rentalType: proprety.rental_information.type_of_rental,
							},
						});
				});
				setPropreties(response);
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
