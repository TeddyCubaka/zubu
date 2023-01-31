import React, { useEffect, useRef, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { propretyStore, loaderStatus } from "../../store/proprety";
import { RoomDetails } from "../interface/proprety";
import Image from "next/image";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { IoReloadSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusCircle, AiOutlineCheck } from "react-icons/ai";

interface InputHasDetailsProps {
	detailsData: string[];
	store: string;
	object: string;
	customClass?: string;
	hasInput?: boolean;
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
	clearFileFunction: () => void;
}

interface SendToServer {
	path: string;
	data: Object;
	getStatus: (status: string) => void;
}
const uploadImage = async (props: UploadImage) => {
	props.getStatus("load");
	const formData = new FormData();
	formData.append("file", props.file);
	formData.append("upload_preset", "zubustein");
	await axios
		.post("https://api.cloudinary.com/v1_1/di64z9yxk/image/upload", formData)
		.then((res) => {
			console.log(res.data);
			props.getUrl(res.data.secure_url);
			props.getStatus("finish");
			props.clearFileFunction();
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
		.then((res) => {
			console.log("succes", res.data), props.getStatus("Mis à jour réussie");
		})
		.catch((err) => {
			console.log("error", err);
			props.getStatus("Echec de mise à jour");
		});
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
			<label className="txt_meddium one_line_txt"> {subject} </label>
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

function InputHasDetails({
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
	const loader = loaderStatus();
	const proprety = propretyStore();
	const divCoverPicture = useRef<HTMLDivElement>(null);

	return (
		<div className="h_max w_max space_between-y">
			<div className="space_between-x w_max">
				<div className="w_max">Choisir une image</div>
				<div className="space_between-x cover_picture_input_file_div">
					<input
						type="file"
						accept="image/png, image/jpeg"
						className="upload_cover_picture_input"
						onChange={(e) => {
							if (e.target.files !== null) {
								setSrc(URL.createObjectURL(e.target.files[0]));
								proprety.updateRenatlInformation.setFiles(e.target.files[0]);
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
					width: "98%",
					height: "100px",
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
						height={95.625}
						className="cover_picture_card"
						src={
							src.length > 0
								? src
								: proprety.proprety.rentalInformation.coverPicture
								? proprety.proprety.rentalInformation.coverPicture
								: "https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
						}
						alt="Random image"
					/>
				)}
			</div>
			{src.length === 0 ? (
				<div className=" color_blue br txt_normal txt_center border-blue pd-5">
					Image d'origine
				</div>
			) : (
				<button
					className="btn_s color_blue br txt_normal btn w_max"
					onClick={() => {
						const uploadCoverPicture: UploadImage = {
							file: proprety.updateRenatlInformation.files,
							getStatus: loader.setUploadingCoverPicture,
							getUrl: proprety.updateRenatlInformation.setCoverPicture,
							clearFileFunction: proprety.updateRenatlInformation.clearFiles,
						};
						uploadImage(uploadCoverPicture);
					}}>
					{loader.uploadingCoverPicture === "error"
						? "Erreur, réessayez"
						: loader.uploadingCoverPicture === "load"
						? "Envoie..."
						: loader.uploadingCoverPicture === "finish"
						? "image d'origine"
						: "Mettre à jour"}
				</button>
			)}
		</div>
	);
}

export function UpdateRentalInformation() {
	const proprety = propretyStore();
	const status = loaderStatus();
	const postUpdating = () => {
		const data = {
			rentalInformation: proprety.proprety.rentalInformation,
		};
		const thisProps: SendToServer = {
			path: "/proprety/" + proprety.proprety._id,
			data: data,
			getStatus: status.setUpdatingStatus,
		};
		sendToServer(thisProps);
	};

	return (
		<div className="rental_information_card">
			<div className="rental_information_input m_right-10">
				<Input
					value={proprety.proprety.rentalInformation.address}
					sendToStore={proprety.updateRenatlInformation.setAddress}
					type={"text"}
					subject={"Adress"}
					placeholder={"Ajoutez une adress"}
					customClass={""}
				/>
				<div className="space_between">
					<Input
						value={proprety.proprety.rentalInformation.price}
						sendToStore={proprety.updateRenatlInformation.setPrice}
						type={"number"}
						subject={"Prix"}
						customClass={"w_max m_right-10"}
						placeholder={"Prix"}
					/>
					<InputHasDetails
						detailsData={["USD", "CDF"]}
						store={proprety.proprety.rentalInformation.monetaryCurrency}
						object={""}
						sendToStore={proprety.updateRenatlInformation.setCurrency}
						customClass={""}
					/>
				</div>
				<div className="double_column">
					<InputHasDetails
						detailsData={propretyType}
						store={proprety.proprety.rentalInformation.RentalType}
						object={"Type"}
						sendToStore={proprety.updateRenatlInformation.setType}
						customClass={"m_right-10"}
					/>
					<Input
						value={proprety.proprety.rentalInformation.availabilityDate}
						sendToStore={proprety.updateRenatlInformation.setAvailabilyDate}
						type={"date"}
						subject={"Liberé"}
					/>
				</div>
				<div className="double_column">
					<Input
						value={proprety.proprety.rentalInformation.guaranteeValue}
						sendToStore={proprety.updateRenatlInformation.setGuaratee}
						type={"text"}
						subject={"Garantie"}
						placeholder={"Ajoutez une garantie"}
						customClass={"m_right-10"}
					/>
					<Input
						value={proprety.proprety.rentalInformation.area}
						sendToStore={proprety.updateRenatlInformation.setArea}
						type={"text"}
						subject={"Surface"}
						placeholder={"Spécifier l'aire habitable"}
					/>
				</div>
			</div>
			<CoverPicture />
			<div className="rental_information_card_sub_button flex w_max">
				<button
					className="btn_s color_blue br txt_normal btn w_max m_right-10"
					onClick={() => {
						if (proprety.proprety.rentalInformation.isAvailable)
							proprety.updateRenatlInformation.changeAvailability(false);
						else proprety.updateRenatlInformation.changeAvailability(true);
					}}>
					{proprety.proprety.rentalInformation.isAvailable
						? "Marquer occupé"
						: "Maquer libre"}
				</button>
				<button
					className="btn_p color_w br txt_normal btn w_max flex_center-xy one_line_txt"
					onClick={() => {
						status.setUpdatingStatus("Envoie...");
						postUpdating();
					}}>
					{status.updatingStatus === "Mis à jour" ? (
						<AiOutlineCheck size={18} />
					) : (
						""
					)}
					{status.updatingStatus}
				</button>
			</div>
		</div>
	);
}

interface SectionHead {
	title: string;
	setUpdatingStatus: (status: string) => void;
	sendToServerProps: SendToServer;
	updatingStatus: string;
}

function SectionHead(props: SectionHead) {
	return (
		<div className="flex space_between">
			<h3>{props.title}</h3>
			<button
				className="btn_s btn color_blue br txt_normal"
				onClick={() => {
					props.setUpdatingStatus("Envoie...");
					sendToServer(props.sendToServerProps);
				}}>
				{props.updatingStatus}
			</button>
		</div>
	);
}

interface SectionDetailCard {
	index: number;
	room: RoomDetails;
	removeRoom: (index: number) => void;
}

function SectionDetailCard(props: SectionDetailCard) {
	return (
		<div className="flex">
			<div className="flex pd-5 br border-gray w_max m_right-10">
				<div className="one_line_txt m_right-20 txt_meddium">
					{props.room.name} {" :"}
				</div>
				<div className="w_max">
					{props.room.size} {props.room.unit}{" "}
				</div>
			</div>
			<button
				className="btn_p btn br color_w w_50"
				onClick={() => props.removeRoom(props.index)}>
				<RxCross1 size="20px" />
			</button>
		</div>
	);
}

interface SectionAddDetailButton {
	conditionToPass: boolean;
	reseter: () => void;
	sendToStore: (data: any) => void;
	data: any;
}

function SectionAddDetailButton(props: SectionAddDetailButton) {
	return (
		<div
			className={"flex_center-xy w_50"}
			onClick={() => {
				if (props.conditionToPass) {
					props.sendToStore(props.data);
					props.reseter();
				}
			}}>
			<AiFillPlusCircle
				size={30}
				color={props.conditionToPass ? "#123853" : "gray"}
			/>
		</div>
	);
}

export function InternalDescription() {
	const proprety = propretyStore();
	const [partialRoom, setPartialRoom] = useState<RoomDetails>({
		name: "",
		size: 0,
		unit: "m²",
	});
	const [getRoomObject, setRoomObject] = useState<string>("");
	const [getRoomUnit, setRoomUnit] = useState<string>("m²");
	const [getRoomArea, setRoomArea] = useState<number>(0);
	const [updatingStatus, setUpdatingStatus] = useState<string>("");

	useEffect(() => {
		setUpdatingStatus("Mettre à jour");
		setPartialRoom({ ...partialRoom, name: getRoomObject });
	}, [getRoomObject]);

	useEffect(() => {
		setUpdatingStatus("Mettre à jour");
		setPartialRoom({ ...partialRoom, unit: getRoomUnit });
	}, [getRoomUnit]);

	useEffect(() => {
		setUpdatingStatus("Mettre à jour");
		setPartialRoom({ ...partialRoom, size: getRoomArea });
	}, [getRoomArea]);

	return (
		<div className="grid row_gap-10 m_top-10">
			<SectionHead
				title={"Intérieur"}
				sendToServerProps={{
					path: "/proprety/" + proprety.proprety._id,
					data: {
						description: {
							interior: proprety.proprety.description.interior,
						},
					},
					getStatus: setUpdatingStatus,
				}}
				updatingStatus={updatingStatus}
				setUpdatingStatus={setUpdatingStatus}
			/>
			<div className="grid row_gap-10">
				{proprety.proprety.description.interior.rooms.length > 0
					? proprety.proprety.description.interior.rooms.map((room, index) => (
							<SectionDetailCard
								index={index}
								room={room}
								removeRoom={proprety.updateDescription.removeInteriorRoom}
								key={index}
							/>
					  ))
					: ""}
				<div className="flex">
					<div className="w_max flex m_right-10">
						<InputHasDetails
							detailsData={["Salon", "Salle à manger", "Toillettes", "Douches"]}
							store={getRoomObject}
							object={"Pièces"}
							sendToStore={setRoomObject}
							customClass={"m_right-10"}
							hasInput={true}
						/>
						<div className={"input_w_label m_right-10"}>
							<label className="txt_meddium one_line_txt"> Surface</label>
							<input
								type="number"
								placeholder="aire"
								className={"br w_max txt_normal "}
								value={getRoomArea}
								onChange={(e) => {
									e.preventDefault();
									if (Number(e.target.value))
										setRoomArea(Number(e.target.value));
								}}
							/>
						</div>
						<InputHasDetails
							detailsData={["m²", "ft"]}
							store={getRoomUnit}
							object={"Unités"}
							sendToStore={setRoomUnit}
							customClass={"m_right-10 "}
							hasInput={true}
						/>
					</div>
					<SectionAddDetailButton
						conditionToPass={getRoomObject.length > 1 && getRoomArea > 0}
						data={partialRoom}
						reseter={() => {
							setRoomObject("");
							setRoomArea(0);
						}}
						sendToStore={proprety.updateDescription.addInteriorRoom}
					/>
				</div>
			</div>
		</div>
	);
}
