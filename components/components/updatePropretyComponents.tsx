import React, { useRef, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import {
	rentalInformation,
	loaderStatus,
} from "../../store/updatePropretyStore";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { IoReloadSharp } from "react-icons/io5";

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
interface UploadImage {
	file: FileList;
	getUrl: (string: string) => void;
	getStatus: (string: string) => void;
}

const propretyType = ["Maison meublé", "Maison vide", "Commerce", "Burreau"];

const uploadImage = async (props: UploadImage) => {
	props.getStatus("load");
	const formData = new FormData();
	formData.append("file", props.file[0]);
	formData.append("upload_preset", "zubustein");
	await axios
		.post("https://api.cloudinary.com/v1_1/di64z9yxk/image/upload", formData)
		.then((res) => {
			props.getUrl(res.data.secure_url), props.getStatus("finish");
		})
		.catch((err) => {
			console.log(err), props.getStatus("error");
		});
};

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

function CoverPicture() {
	const [src, setSrc] = useState<string>("");
	const [file, setFile] = useState<FileList>();
	const rental = rentalInformation();
	const loader = loaderStatus();
	const divCoverPicture = useRef<HTMLDivElement>(null);

	return (
		<div className="w_max">
			<div className="space_between-x w_max">
				<span className="m_max block m_right-10">Mettre à jour l'image</span>
				<div className="space_between-x cover_picture_input_file_div">
					<input
						type="file"
						accept="image/png, image/jpeg"
						className="upload_cover_picture_input"
						onChange={(e) => {
							if (e.target.files !== null) {
								setSrc(URL.createObjectURL(e.target.files[0]));
								setFile(e.target.files);
								const uploadCoverPicture: UploadImage = {
									file: e.target.files,
									getStatus: loader.setUploadingCoverPicture,
									getUrl: rental.setCoverPicture,
								};
								uploadImage(uploadCoverPicture);
							}
						}}
					/>
					<button className="upload_cover_picture_button">
						<FiEdit size="18px" />
					</button>
				</div>
			</div>
			<div
				ref={divCoverPicture}
				style={{
					width: "auto",
					height: divCoverPicture.current?.style.width
						? (9 / 16) * Number(divCoverPicture.current?.style.width)
						: "10",
					overflow: "hidden",
					backgroundColor: "#B9B9B9",
					border: "1px solid #B9B9B9",
				}}
				className="flex_center-xy br">
				{loader.uploadingCoverPicture === "error" ? (
					<div className="h_max w_max flex_y_center-xy border-b color_w">
						Sorry, please try again
						<span>
							<IoReloadSharp />
						</span>
					</div>
				) : loader.uploadingCoverPicture === "load" ? (
					<div className="h_max w_max flex_y_center-xy border-b color_w">
						<span className="uploading">
							<IoReloadSharp />
						</span>
					</div>
				) : (
					<Image
						width={170}
						height={170}
						className="cover_picture_card"
						src={
							src.length > 1
								? src
								: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
						}
						alt="Random image"
					/>
				)}
			</div>
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
			<CoverPicture />
		</div>
	);
}
