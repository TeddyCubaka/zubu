import React, { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { rentalInformation } from "../../store/updatePropretyStore";
import { shallow } from "zustand/shallow";

interface InputHasDetailsProps {
	objectHasInput: boolean;
	detailsData: string[];
	store: string;
	object: string;
	sendToStore: (string: string) => void;
}

interface InputProps {
	value: string;
	placeholder: string;
	sendToStore: (string: string) => void;
	type?: string;
	subject: string;
}

const propretyType = ["Maison meublé", "Maison vide", "Commerce", "Burreau"];

function Input({ value, placeholder, sendToStore, type, subject }: InputProps) {
	return (
		<div className="m_y-10 input_w_label">
			<label> {subject} </label>
			<input
				type={type ? type : "text"}
				placeholder={placeholder}
				className={`br w_max`}
				value={value}
				onChange={(e) => {
					sendToStore(e.target.value);
					console.log(value);
				}}
			/>
		</div>
	);
}

function InputHasDetails({
	objectHasInput,
	detailsData,
	sendToStore,
	store,
	object,
}: InputHasDetailsProps) {
	const [showDetails, setShowDetails] = useState<boolean>(false);

	return (
		<div className="w_half">
			<div className="m_y-10 input_w_label">
				<div> {object ? object : "Object"} </div>
				{objectHasInput ? (
					<input
						type="text"
						placeholder="zhhufzkkjk"
						className={`br w_max`}
						value={store ? store : "Object"}
					/>
				) : (
					<div className="m_x-10 w_max color_gray">
						{" "}
						{store ? store : "Object"}{" "}
					</div>
				)}
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
				<div className="div_details flex_y_center-xy">
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
		<div>
			<div>
				<InputHasDetails
					objectHasInput={false}
					detailsData={propretyType}
					store={rental.typeOfRental}
					object={"Type"}
					sendToStore={rental.setType}
				/>
                {/* <Input value={rental.price}
// placeholder={}
sendToStore={}
type
subject */}
			</div>
		</div>
	);
}
