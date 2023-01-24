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
	placeholder?: string;
}

const propretyType = ["Maison meublé", "Maison vide", "Commerce", "Burreau"];

function Input({
	value,
	sendToStore,
	type,
	subject,
	customClass,
	placeholder,
}: InputProps) {
	return (
		<div className={"input_w_label " + customClass}>
			<label style={{ width: "5.5em" }} className="txt_meddium">
				{" "}
				{subject}{" "}
			</label>
			<input
				type={type ? type : "text"}
				placeholder={placeholder}
				className={
					"br w_max txt_normal " + (type === "date" ? "txt_center" : "")
				}
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
	customClass,
}: InputHasDetailsProps) {
	const [showDetails, setShowDetails] = useState<boolean>(false);

	return (
		<div className={"column input_has_detais " + customClass}>
			<div className="input_w_label w_auto">
				{object ? <div className="txt_meddium"> {object} </div> : ""}
				<div
					className="m_x-5 w_max color_gray"
					onClick={() => {
						if (showDetails) setShowDetails(false);
						else setShowDetails(true);
					}}>
					{" "}
					{store ? store : ""}{" "}
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
							onClick={() => {
								sendToStore(detail);
								if (showDetails) setShowDetails(false);
								else setShowDetails(true);
							}}
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
		<div className="rental_information_card m_x-20">
			<div className="rental_information_input">
				<InputHasDetails
					detailsData={propretyType}
					store={rental.typeOfRental}
					object={"Type"}
					sendToStore={rental.setType}
				/>
				<div className="w_max m_top-10 space_between">
					<Input
						value={rental.price}
						sendToStore={rental.setPrice}
						type={"number"}
						subject={"Prix"}
						customClass={"w_75"}
						placeholder={"Prix"}
					/>
					<InputHasDetails
						detailsData={["USD", "CDF"]}
						store={rental.monetaryCurrency}
						object={""}
						sendToStore={rental.setCurrency}
						customClass={""}
					/>
				</div>
				<Input
					value={rental.guaranteeValue}
					sendToStore={rental.setGuaratee}
					type={"text"}
					subject={"Garantie"}
					placeholder={"Ajoutez une garantie"}
				/>
				<Input
					value={rental.address}
					sendToStore={rental.setAddress}
					type={"text"}
					subject={"Adress"}
					placeholder={"Ajoutez une adress"}
				/>
				<Input
					value={rental.availabilityDate}
					sendToStore={rental.setAvailabilyDate}
					type={"date"}
					subject={"Libre au"}
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
