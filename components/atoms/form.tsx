import { useState } from "react";
import {
	InputHasDetailsProps,
	InputNumberProps,
	InputProps,
} from "../interface/atoms";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

export function Input({
	value,
	sendToStore,
	type,
	subject,
	customClass,
	placeholder,
	required,
}: InputProps) {
	return (
		<div className={"input_w_label " + customClass}>
			<label className={"one_line_txt"}>
				{" "}
				{subject.split(" :")[0]}{" "}
				{required ? <span className="color_red">*</span> : ""}
				{" :"}
			</label>
			<input
				type={type ? type : "text"}
				placeholder={placeholder}
				className={
					"br w_max txt_normal " + (type === "date" ? "txt_center" : "")
				}
				value={value ? value : ""}
				onChange={(e) => {
					e.preventDefault();
					sendToStore(e.target.value);
				}}
			/>
		</div>
	);
}

export function InputNumber(props: InputNumberProps) {
	return (
		<div className={"input_w_label " + props.customClass}>
			<label className="txt_meddium one_line_txt"> {props.subject} </label>
			<input
				type="number"
				placeholder={props.placeholder ? props.placeholder : "Ècrivez..."}
				className={"br w_max txt_normal "}
				value={props.value}
				onChange={(e) => {
					e.preventDefault();
					if (e.target.value === "") props.sendToStore(0);
					if (Number(e.target.value)) props.sendToStore(Number(e.target.value));
				}}
			/>
		</div>
	);
}

export function InputHasDetails({
	detailsData,
	sendToStore,
	store,
	object,
	customClass,
	hasInput,
}: InputHasDetailsProps) {
	const [showDetails, setShowDetails] = useState<boolean>(false);

	return (
		<div className={"space_between-y input_has_detais " + customClass}>
			<div className="input_w_label pd-10 w_auto">
				{object ? (
					<div className="txt_meddium one_line_txt"> {object} </div>
				) : (
					""
				)}
				{hasInput ? (
					<input
						type="text"
						value={store.length > 0 ? store : ""}
						className="m_x-5 w_max txt_normal"
						placeholder="Écrivez..."
						onChange={(e) => {
							e.preventDefault();
							if (e.target.value === "") sendToStore(detailsData[0]);
							sendToStore(e.target.value);
						}}
					/>
				) : (
					<div
						className="m_x-5 w_max color_gray"
						onClick={() => {
							if (showDetails) setShowDetails(false);
							else setShowDetails(true);
						}}>
						{" "}
						{store ? store : ""}{" "}
					</div>
				)}
				<button
					className="no_border bg_color_w"
					onClick={() => {
						if (showDetails) setShowDetails(false);
						else setShowDetails(true);
					}}>
					{showDetails ? (
						<GoChevronUp size="18" />
					) : (
						<GoChevronDown size="18" />
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
							key={detail}>
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
