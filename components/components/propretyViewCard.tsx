import React from "react";
import { AnnouncementType, RentalInformationType } from "../interface/proprety";
import { BsFillHouseFill } from "react-icons/bs";
import Image from "next/image";
import { getPublicAdress } from "../usefulFuction/getPublicAdress";
import { useRouter } from "next/router";

export interface PropretyCardType {
	path?: string;
	_id: string;
	bedrooms: number;
	bathroom: number;
	typeByRooms: string | undefined;
	isAvailable?: boolean;
	address: string;
	toillete: number;
	price: string;
}

export default function PropretyCard(proprety: PropretyCardType) {
	const router = useRouter();
	return (
		<div
			className="border border-[#D9D9D9] rounded w-[300px] h-auto max-sm:w-full max-sm:min-h-[225px] "
			onClick={() => (proprety.path ? router.push(proprety.path) : "")}>
			<div className="relative h-0 flex justify-end text-sm text-white">
				{proprety.isAvailable ? (
					<div
						style={{ zIndex: "1" }}
						className="rounded-[0_5px_0_5px] h-fit p-2 w-[60px] text-center color-green bg-green">
						libre
					</div>
				) : (
					<div
						style={{ zIndex: "1" }}
						className="rounded-[0_5px_0_5px] h-fit p-2 w-[60px] text-center color-green bg-red">
						Occupé
					</div>
				)}
			</div>
			<div
				style={{ borderRadius: "5px 5px 0px 0px" }}
				className="flex justify-center items-center h-[100px] border-b-[#B9B9B9] overflow-hidden bg-[#F5F5F5] ">
				{/* {proprety.rentalInformation.coverPicture ? ( */}
				{/* <Image
						width={340}
						height={191.25}
						className="w-full h-auto"
						src={"#"}
						alt="Random image"
					/>
				) : ( */}
				<BsFillHouseFill size="50px" color="#B9B9B9" />
				{/* )} */}
			</div>
			<div className="p-2.5 w-full break-all flex flex-col ">
				<h2 className="font-medium">{proprety.price}</h2>
				<span>{proprety.address}</span>
				<span>
					{proprety.bedrooms} Ch. | {proprety.bathroom} Dch. |{" "}
					{proprety.toillete} WC | {proprety.typeByRooms}
				</span>
			</div>
		</div>
	);
}
