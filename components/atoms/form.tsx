import { ReactElement, useState } from "react";
import {
	FormDatasTypes,
	InputHasDetailsProps,
	InputNumberProps,
	InputProps,
} from "../interface/atoms";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const inputStyle =
	" border border-black rounded-[5px] p-2.5 flex-1 txt-normal ";
const inputWithLabelParentStyle = " rounded-[5px] flex flex-col ";

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
		<div className={inputWithLabelParentStyle + customClass}>
			<label className={"font-normal"}>
				{" "}
				{subject.split(" :")[0]}{" "}
				{required ? <span className="color_red">*</span> : ""}
				{" :"}
			</label>
			<input
				type={type ? type : "text"}
				placeholder={placeholder}
				className={inputStyle + (type === "date" ? "txt_center" : "")}
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
		<div className={"  " + customClass}>
			<div className={inputWithLabelParentStyle}>
				{object ? (
					<div className="txt_meddium one_line_txt"> {object} </div>
				) : (
					""
				)}
				<div className={inputStyle + "flex items-center"}>
					{hasInput ? (
						<input
							type="text"
							value={store.length > 0 ? store : ""}
							className={"m_x-5 w_max txt_normal"}
							placeholder="Écrivez..."
							onChange={(e) => {
								e.preventDefault();
								if (e.target.value === "") sendToStore(detailsData[0]);
								sendToStore(e.target.value);
							}}
						/>
					) : (
						<div
							className={"m_x-5 w_max color_gray"}
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
			</div>
			{showDetails ? (
				<div className="div_details flex_y_center-xy w_auto z-30">
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

export interface InputPropsType {
	value: string;
	sendToStore: (string: string | number) => void;
	type?: string;
	subject: string;
	customClass?: string;
	placeholder: string;
	required?: boolean;
}

export function GeneralInput({
	value,
	sendToStore,
	type,
	subject,
	customClass,
	placeholder,
	required,
}: InputPropsType) {
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

export function Form({ inputs, buttons, title }: FormDatasTypes) {
	return (
		<div className="pd-10">
			<h3 className="m_y-10">{title}</h3>
			<div className="w_max gap-10">
				{inputs.map((input) => (
					<Input
						key={input.value + input.subject}
						value={input.value}
						sendToStore={(e) => input.sendToStore(e)}
						subject={input.subject}
						type={input.type}
						customClass={input.customClass}
						placeholder={input.placeholder}
					/>
				))}
			</div>
			{buttons}
		</div>
	);
}
