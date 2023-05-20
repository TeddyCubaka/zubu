import { ReactElement, useEffect, useState } from "react";
import {
	FormDatasTypes,
	InputHasDetailsProps,
	InputNumberProps,
	InputProps,
} from "../interface/atoms";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { AnnouncementPeriodType } from "../interface/proprety";

const inputStyle =
	" border border-[#123853b4] rounded-[5px] p-2 flex-1 txt-normal ";
const inputWithLabelParentStyle = " rounded-[5px] flex flex-col ";

export function Input({
	value,
	sendToStore,
	type,
	subject,
	customClass,
	placeholder,
	required,
	children,
	maxLength,
	isInvalid,
}: InputProps) {
	return (
		<div className={inputWithLabelParentStyle + customClass}>
			<label className={"font-normal"}>
				{" "}
				{subject.split(" :")[0]}{" "}
				{required ? <span className="text-red-600">*</span> : ""}
				{" :"}
			</label>
			<div
				className={
					" border rounded-[5px] flex-1 txt-normal flex items-center " +
					(isInvalid ? " border-red-500 " : " border-[#123853b4] ") +
					customClass
				}>
				<input
					type={type ? type : "text"}
					placeholder={placeholder}
					className={" w-full h-full p-2 outline-none rounded "}
					maxLength={maxLength}
					value={value ? value : ""}
					onChange={(e) => {
						e.preventDefault();
						sendToStore(e.target.value);
					}}
				/>
				{children}
			</div>
		</div>
	);
}
const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface InputDateProps {
	value: [Dayjs | null, Dayjs | null];
	sendToStore: (dates: AnnouncementPeriodType) => void;
	subject: string;
	customClass: string;
	placeholder: [string, string];
	required?: boolean;
	children?: ReactElement;
}

export function InputDate({
	value,
	sendToStore,
	subject,
	customClass,
	placeholder,
	required,
	children,
}: InputDateProps) {
	const disabledDate = (current: Dayjs) => {
		if (!value) {
			return false;
		}
		const tooLate = value[0] && current.diff(value[0], "days") >= 10;
		const tooEarly = value[1] && value[1].diff(current, "days") >= 10;
		return !!tooEarly || !!tooLate;
	};

	return (
		<div className={inputWithLabelParentStyle + customClass}>
			<label className={"font-normal"}>
				{" "}
				{subject.split(" :")[0]}{" "}
				{required ? <span className="text-red-600">*</span> : ""}
				{" :"}
			</label>
			<RangePicker
				className={inputStyle}
				value={value}
				disabledDate={disabledDate}
				placeholder={
					placeholder ? placeholder : ["début de l'annonce", "fin de l'anonce"]
				}
				onCalendarChange={(val) => {
					if (val)
						sendToStore([
							dayjs(val[0]).format("DD/MM/YYYY"),
							dayjs(val[1]).format("DD/MM/YYYY"),
						]);
				}}
				format={"DD/MM/YYYY"}
				onOpenChange={(e) => {
					if (e) sendToStore([null, null]);
				}}
				onChange={(val) => {
					if (val) {
						sendToStore([
							dayjs(val[0]).format("DD/MM/YYYY"),
							dayjs(val[1]).format("DD/MM/YYYY"),
						]);
					}
				}}
				changeOnBlur
			/>

			{children}
		</div>
	);
}

export function InputLabelLess({
	value,
	sendToStore,
	type,
	customClass,
	placeholder,
	maxLength,
	children,
}: InputProps) {
	return (
		<div
			className={
				" border border-[#123853b4] rounded-[5px] flex-1 txt-normal flex items-center " +
				customClass
			}>
			<input
				type={type ? type : "text"}
				placeholder={placeholder}
				className={
					(type === "date" ? "txt_center" : "") +
					" w-full h-full p-2 outline-none rounded "
				}
				maxLength={maxLength}
				value={value ? value : ""}
				onChange={(e) => {
					e.preventDefault();
					sendToStore(e.target.value);
				}}
			/>
			{children}
		</div>
	);
}

export function InputNumber(props: InputNumberProps) {
	return (
		<div className={inputWithLabelParentStyle + props.customClass}>
			<label className="font-normal one_line_txt"> {props.subject} </label>
			<input
				type="number"
				placeholder={props.placeholder ? props.placeholder : "Ècrivez..."}
				className={inputStyle}
				value={props.value}
				onChange={(e) => {
					if (e.currentTarget.value === "") props.sendToStore(0);
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
			<div
				className={inputWithLabelParentStyle}
				onClick={() => {
					if (showDetails) setShowDetails(false);
					else setShowDetails(true);
				}}>
				{object ? <div className="font-normal"> {object} </div> : ""}
				<div className={inputStyle + " flex items-center cursor-pointer"}>
					{hasInput ? (
						<input
							type="text"
							value={store.length > 0 ? store : ""}
							className={"mx-.25 outline-none flex-1  text-normal"}
							placeholder="Écrivez..."
							onChange={(e) => {
								e.preventDefault();
								if (e.target.value === "") sendToStore(detailsData[0]);
								sendToStore(e.target.value);
							}}
						/>
					) : (
						<div
							className={"mx-[5px] flex-1"}
							onClick={() => {
								if (showDetails) setShowDetails(false);
								else setShowDetails(true);
							}}>
							{" "}
							{store ? store : detailsData[0]}{" "}
						</div>
					)}
					<button
						className="border-0 bg-white"
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
			<div className="relative h-0">
				{showDetails ? (
					<div className="border border-[#123853] rounded relative bg-white z-30 flex flex-col justify-center items-center w-auto">
						{detailsData.map((detail, index) => (
							<span
								className="py-[5px] w-full cursor-pointer text-center rounded hover:bg-[#D9D9D9] "
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
				{required ? <span className="text-red-600">*</span> : ""}
				{" :"}
			</label>
			<input
				type={type ? type : "text"}
				placeholder={placeholder}
				className={
					"roundedw-full txt_normal " + (type === "date" ? "txt_center" : "")
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
			<h3 className="my-2.5">{title}</h3>
			<div className="w-full gap-10">
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
