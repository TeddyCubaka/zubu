import React from "react";
import { FaMapMarkerAlt, FaPercent } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineBedroomChild } from "react-icons/md";
import { RentalInformationType } from "../interface/proprety";
import { BsFillHouseFill } from "react-icons/bs";
import Image from "next/image";
import { getPublicAdress } from "../usefulFuction/getPublicAdress";
import { useRouter } from "next/router";

export interface PropretyCardType {
	path?: string;
	_id: string;
	rentalInformation: RentalInformationType;
}

export default function PropretyCard(proprety: PropretyCardType) {
	const router = useRouter();
	return (
		<div
			className="border border-[#D9D9D9] rounded w-[300px] h-auto max-sm:w-[160px] max-sm:min-h-[225px] "
			onClick={() => (proprety.path ? router.push(proprety.path) : "")}>
			<div className="relative h-0 flex justify-end text-sm text-white">
				{proprety.rentalInformation.isAvailable ? (
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
				{proprety.rentalInformation.coverPicture ? (
					<Image
						width={340}
						height={191.25}
						className="w-full h-auto"
						src={proprety.rentalInformation.coverPicture}
						alt="Random image"
					/>
				) : (
					<BsFillHouseFill size="50px" color="#B9B9B9" />
				)}
			</div>
			<div className="p-2.5 w-full break-all">
				<div className="flex my-1 gap-2 ">
					{" "}
					<FaMapMarkerAlt size="18px" />{" "}
					{getPublicAdress(proprety.rentalInformation.address)}{" "}
				</div>
				<div className="flex my-[5px] justify-between flex-wrap gap-2.5 ">
					<span className="flex gap-1.5 items-center">
						{" "}
						<IoMdPricetag size="18px" /> {proprety.rentalInformation.price}
					</span>
					<span className="flex gap-1.5 items-center">
						<FaPercent size="18px" />{" "}
						{proprety.rentalInformation.guaranteeValue}{" "}
					</span>
					<span className="flex gap-1.5 items-center">
						{" "}
						<MdOutlineBedroomChild size="18px" />{" "}
						{proprety.rentalInformation.bedRooms} chs
					</span>
					<span className=" flex gap-1.5 items-center">
						<BsFillHouseFill size="18px" />{" "}
						{proprety.rentalInformation.guaranteeValue}{" "}
					</span>
				</div>
			</div>
		</div>
	);
}
