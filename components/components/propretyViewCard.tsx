import React from "react";
import { FaMapMarkerAlt, FaPercent } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineBedroomChild } from "react-icons/md";
import { RentalInformation } from "../interface/proprety";
import { BsFillHouseFill } from "react-icons/bs";
import Image from "next/image";
import { getPublicAdress } from "../usefulFuction/getPublicAdress";

interface PropretyCard {
	_id: string;
	rentalInformation: RentalInformation;
}

export default function PropretyCard(proprety: PropretyCard) {
	return (
		<div
			key={proprety._id}
			className="border-gray br w_auto"
			style={{ width: "300px" }}>
			<div className="tag_on_proprety_card space_between txt_normal color_w">
				{" "}
				<div></div>{" "}
				{proprety.rentalInformation.isAvailable ? (
					<div className="br pd-3 color-green bg-green">libre</div>
				) : (
					<div className="br pd-3 color-green bg-red">Occupé</div>
				)}
			</div>
			<div
				style={{
					height: "100px",
					overflow: "hidden",
					backgroundColor: "#F5F5F5",
					borderBottom: "1px solid #B9B9B9",
					borderRadius: "5px 5px 0px 0px",
				}}
				onClick={() =>
					(window.location.href = "/proprety/update/" + proprety._id)
				}
				className="flex_center-xy">
				{proprety.rentalInformation.coverPicture ? (
					<Image
						width={340}
						height={191.25}
						className="cover_picture_card"
						src={proprety.rentalInformation.coverPicture}
						alt="Random image"
					/>
				) : (
					<BsFillHouseFill size="50px" color="#B9B9B9" />
				)}
			</div>
			<div
				className="pd-10 w_max"
				onClick={() =>
					(window.location.href = "/proprety/view/" + proprety._id)
				}>
				<div className="flex m_y-5">
					{" "}
					<FaMapMarkerAlt size="18px" />{" "}
					{getPublicAdress(proprety.rentalInformation.address)}{" "}
				</div>
				<div className="flex m_y-5">
					<div className="w_max">
						{" "}
						<IoMdPricetag size="18px" /> {proprety.rentalInformation.price}
					</div>
					<div className="w_max">
						<FaPercent size="18px" />{" "}
						{proprety.rentalInformation.guaranteeValue}{" "}
					</div>
				</div>
				<div className="flex m_y-5">
					<div className="w_max">
						{" "}
						<MdOutlineBedroomChild size="18px" />{" "}
						{proprety.rentalInformation.bedRooms} chs
					</div>
					<div className="w_max">
						<BsFillHouseFill size="18px" />{" "}
						{proprety.rentalInformation.guaranteeValue}{" "}
					</div>
				</div>
			</div>
		</div>
	);
}
