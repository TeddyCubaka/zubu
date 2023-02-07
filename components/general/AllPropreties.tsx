import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPercent } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineBedroomChild } from "react-icons/md";
import { RentalInformation, Proprety } from "../interface/proprety";
import { BsFillHouseFill } from "react-icons/bs";
import Image from "next/image";
import PropretyCard from "../components/propretyViewCard";

interface PropretyCard {
	_id: string;
	rentalInformation: RentalInformation;
}

export default function AllPropreties() {
	const [propreties, setPropreties] = useState<PropretyCard[]>([]);
	useEffect(() => {
		axios(process.env.NEXT_PUBLIC_DB_URL + "/proprety")
			.then((res) => {
				const response: PropretyCard[] = [];
				res.data.map((proprety: Proprety, index: number) => {
					response.push({
						_id: proprety._id,
						rentalInformation: { ...proprety.rentalInformation },
					});
				});
				setPropreties(response);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div>
			<div className="pd-20">
				{propreties.length === 0 ? (
					<div className="flex_center-xy">Empty</div>
				) : (
					propreties.map((proprety) => (
						<PropretyCard
							_id={proprety._id}
							rentalInformation={proprety.rentalInformation}
						/>
					))
				)}
			</div>
		</div>
	);
}
