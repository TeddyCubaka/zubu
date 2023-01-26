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
	file: string | Blob;
	getUrl: (string: string) => void;
	getStatus: (string: string) => void;
}

interface SendToServer {
	path: string;
	data: Object;
	getStatus: (status: string, data: Object) => void;
}
const uploadImage = async (props: UploadImage) => {
	props.getStatus("load");
	const formData = new FormData();
	formData.append("file", props.file);
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

function sendToServer(props: SendToServer) {
	axios({
		method: "POST",
		url: process.env.NEXT_PUBLIC_DB_URL + props.path,
		data: props.data,
	})
		.then((res) => console.log("succes", res.data))
		.catch((err) => console.log("error", err));
}

const propretyType = [
	"Maison meublé",
	"Maison vide",
	"appartement",
	"Commerce",
	"Burreau",
];

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
		<div className={"space_between-y input_has_detais " + customClass}>
			<div className="input_w_label pd-10 w_auto">
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
	const [file, setFile, coverPicture] = rentalInformation((state) => [
		state.files,
		state.setFiles,
		state.coverPicture,
	]);
	const loader = loaderStatus();
	const divCoverPicture = useRef<HTMLDivElement>(null);

	return (
		<div className="w_max">
			<div className="space_between-x w_max">
				<span className="m_max block m_right-10">Choisir une image</span>
				<div className="space_between-x cover_picture_input_file_div">
					<input
						type="file"
						accept="image/png, image/jpeg"
						className="upload_cover_picture_input"
						onChange={(e) => {
							if (e.target.files !== null) {
								setSrc(URL.createObjectURL(e.target.files[0]));
								setFile(e.target.files[0]);
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
					width: "100%",
					height: "101px",
					overflow: "hidden",
					backgroundColor: "#B9B9B9",
					border: "1px solid #B9B9B9",
					minHeight: "100px",
				}}
				className="flex_center-xy br">
				{loader.uploadingCoverPicture === "error" ? (
					<div className="h_max w_max flex_y_center-xy color_w">
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
							src.length > 0
								? src
								: coverPicture.length > 0
								? coverPicture
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
	const postUpdating = async () => {
		const uploadCoverPicture: UploadImage = {
			file: rental.files,
			getStatus: (string) => console.log(string),
			getUrl: rental.setCoverPicture,
		};
		await uploadImage(uploadCoverPicture);
		const data = {
			rental_information: {
				is_available: rental.isAvailable || false,
				availability_date: rental.availabilityDate,
				type_of_rental: rental.typeOfRental,
				price: rental.price,
				guarantee_value: rental.guaranteeValue,
				monetary_currency: rental.monetaryCurrency,
				cover_picture: rental.coverPicture,
				address: rental.address,
				area: rental.area,
				lessor: rental.lessor,
			},
		};
		const thisProps: SendToServer = {
			path: "/proprety/" + rental._id,
			data: data,
			getStatus: (string) => console.log(string),
		};
		sendToServer(thisProps);
	};

	return (
		<div className="rental_information_card m_x-20">
			<div className="rental_information_input">
				<Input
					value={rental.address}
					sendToStore={rental.setAddress}
					type={"text"}
					subject={"Adress"}
					placeholder={"Ajoutez une adress"}
					customClass={""}
				/>
				<div className="w_max space_between">
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
				<div className="flex">
					<InputHasDetails
						detailsData={propretyType}
						store={rental.typeOfRental}
						object={"Type"}
						sendToStore={rental.setType}
						customClass={"m_right-10 w_max"}
					/>
					<Input
						value={rental.availabilityDate}
						sendToStore={rental.setAvailabilyDate}
						type={"date"}
						subject={"Libre au"}
					/>
				</div>
				<div className="flex">
					<Input
						value={rental.guaranteeValue}
						sendToStore={rental.setGuaratee}
						type={"text"}
						subject={"Garantie"}
						placeholder={"Ajoutez une garantie"}
						customClass={"m_right-10"}
					/>
					<Input
						value={rental.area}
						sendToStore={rental.setArea}
						type={"text"}
						subject={"Surface"}
						placeholder={"Spécifier l'aire habitable"}
					/>
				</div>
			</div>
			<div className="h_max border-bf space_between-y">
				<CoverPicture />
				<button
					className="btn_p color_w br txt_normal btn w_max"
					onClick={() => postUpdating()}>
					Mettre à jour
				</button>
			</div>
		</div>
	);
}
