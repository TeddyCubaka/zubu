import React from "react";
import { FaMapMarkerAlt, FaPercent } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineBedroomChild } from "react-icons/md";
import { RentalInformation, Proprety } from "../interface/proprety";
import { BsFillHouseFill } from "react-icons/bs";
import Image from "next/image";

interface PropretyCard {
	_id: string;
	rentalInformation: RentalInformation;
}

export default function PropretyCard(proprety: PropretyCard) {
	return (
		<div
			key={proprety._id}
			onClick={() =>
				(window.location.href = "/proprety/update/" + proprety._id)
			}
			className="border-b w_auto"
			style={{ width: "300px" }}>
			<div
				style={{
					height: "100px",
					overflow: "hidden",
					backgroundColor: "#F5F5F5",
					minHeight: "100px",
				}}
				className="flex_center-xy border-gray">
				{proprety.rentalInformation.coverPicture ? (
					<Image
						width={170}
						height={95.625}
						className="cover_picture_card"
						src={proprety.rentalInformation.coverPicture}
						alt="Random image"
					/>
				) : (
					<BsFillHouseFill size="50px" color="#B9B9B9" />
				)}
			</div>
			<div className="pd-10 w_max">
				<div className="flex m_y-5">
					{" "}
					<FaMapMarkerAlt size="18px" /> {proprety.rentalInformation.address}{" "}
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
