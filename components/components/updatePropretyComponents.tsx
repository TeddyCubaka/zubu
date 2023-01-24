import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { rentalInformation } from "../../store/updatePropretyStore";
import { shallow } from "zustand/shallow";
import Image from "next/image";

interface InputHasDetailsProps {
	detailsData: string[];
	store: string;
	object: string;
	customClass?: string;
	sendToStore: (string: string) => void;
}
interface InputProps {
	value: string;
	sendToStore: (string: string) => void;
	type?: string;
	subject: string;
	customClass?: string;
}

const propretyType = ["Maison meublé", "Maison vide", "Commerce", "Burreau"];

function Input({ value, sendToStore, type, subject, customClass }: InputProps) {
	return (
		<div className="input_w_label w_auto m_y-5">
			<label className="w_auto txt_meddium"> {subject} </label>
			<input
				type={type ? type : "text"}
				placeholder={"Ajouter un " + subject}
				className={"br w_max txt_normal " + customClass}
				value={value}
				onChange={(e) => {
					sendToStore(e.target.value);
				}}
			/>
		</div>
	);
}

function InputHasDetails({
	detailsData,
	sendToStore,
	store,
	object,
}: InputHasDetailsProps) {
	const [showDetails, setShowDetails] = useState<boolean>(false);

	return (
		<div className="w_max column w_auto m_y-5">
			<div className="input_w_label w_auto">
				<div className="txt_meddium"> {object ? object : "Object :"} </div>
				<div className="m_x-10 w_max color_gray ">
					{" "}
					{store ? store : "Object"}{" "}
				</div>
				<button
					className="no_border bg_color_w"
					onClick={() => {
						if (showDetails) setShowDetails(false);
						else setShowDetails(true);
					}}>
					{showDetails ? (
						<GoChevronDown size="18" />
					) : (
						<GoChevronUp size="18" />
					)}
				</button>
			</div>
			{showDetails ? (
				<div className="div_details flex_y_center-xy w_auto">
					{detailsData.map((detail, index) => (
						<span
							className="pd_y-5 w_max txt_center br choice_span"
							onClick={() => sendToStore(detail)}
							key={index}>
							{" "}
							{detail}{" "}
						</span>
					))}
				</div>
			) : (
				""
			)}
		</div>
	);
}

export function UpdateRentalInformation() {
	const rental = rentalInformation();

	return (
		<div className="double_column m_x-20">
			<div className="column">
				<InputHasDetails
					detailsData={propretyType}
					store={rental.typeOfRental}
					object={"Type"}
					sendToStore={rental.setType}
				/>
				<div className="double_column w_max">
					<Input
						value={rental.price}
						sendToStore={rental.setPrice}
						type={"number"}
						subject={"Prix"}
						customClass={"m_x-0_5"}
					/>
					<InputHasDetails
						detailsData={["USD", "CDF"]}
						store={rental.monetaryCurrency}
						object={"Devise"}
						sendToStore={rental.setCurrency}
						customClass={"m_x-10_0"}
					/>
				</div>
				<Input
					value={rental.guaranteeValue}
					sendToStore={rental.setGuaratee}
					type={"text"}
					subject={"Garantie"}
				/>
				<Input
					value={rental.address}
					sendToStore={rental.setAddress}
					type={"text"}
					subject={"Adress"}
				/>
				<Input
					value={rental.availabilityDate}
					sendToStore={rental.setAvailabilyDate}
					type={"date"}
					subject={"Date de disponibilité du bien"}
				/>
			</div>
			<div className="border-b">
				<input
					type="file"
					accept="image/png, image/jpeg"
					onChange={(e) => console.log(e.target.files)}
				/>
				<Image
					width={170}
					height={170}
					src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
					alt="Random image"
				/>
			</div>
		</div>
	);
}
