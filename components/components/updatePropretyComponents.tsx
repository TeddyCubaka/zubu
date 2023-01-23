import React from "react";
import { GoChevronDown } from "react-icons/go";

function Input() {
	return (
		<div className="m_y-10 input_w_label">
			<label>Guarantie</label>
			<input type="text" placeholder="zhhufzkkjk" className={`br w_max`} />
		</div>
	);
}

function InputHasDetails() {
	return (
		<div>
			<div className="m_y-10 input_w_label">
				<div>Object</div>
				<div className="m_x-10 w_max color_gray">Data</div>
				<GoChevronDown />
			</div>
		</div>
	);
}

export function UpdateRentalInformation() {
	return (
		<div>
			<Input />
			<InputHasDetails />
		</div>
	);
}
