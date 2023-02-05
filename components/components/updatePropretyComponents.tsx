import React, { useEffect, useRef, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { propretyStore, loaderStatus } from "../../store/proprety";
import { RoomDetails, TenantCharge } from "../interface/proprety";
import Image from "next/image";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { IoReloadSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusCircle, AiOutlineCheck } from "react-icons/ai";
import { toTriadeNumber } from "../usefulFuction/numbers";
import {
	ImageListZubuWithFirstBigImage,
	ImageListZubuWithLastBigImage,
} from "./imageList";

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
interface InputNumberProps {
	value: number;
	sendToStore: (value: number) => void;
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
			console.log("succes", res.data), props.getStatus("À jour");
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
function InputNumber(props: InputNumberProps) {
	return (
		<div className={"input_w_label m_right-10"}>
			<label className="txt_meddium one_line_txt"> {props.subject} </label>
			<input
				type="number"
				placeholder="aire"
				className={"br w_max txt_normal " + props.customClass}
				value={props.value === 0 ? "" : props.value}
				onChange={(e) => {
					e.preventDefault();
					if (e.target.value === "") props.sendToStore(0);
					if (Number(e.target.value)) props.sendToStore(Number(e.target.value));
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
						? "À jour"
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
					{toTriadeNumber(props.room.size)} {props.room.unit}{" "}
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

interface HouseInformationUpdating {
	getRooms: { rooms: RoomDetails[] };
	addRooms: (string: RoomDetails) => void;
	removeRooms: (index: number) => void;
	_id: string;
	title: string;
}

function HouseInformationUpdating({
	getRooms,
	_id,
	title,
	addRooms,
	removeRooms,
}: HouseInformationUpdating) {
	const propretyDescription = propretyStore().proprety.description;
	const [partialRoom, setPartialRoom] = useState<RoomDetails>({
		name: "",
		size: 0,
		unit: "m²",
	});
	const [getRoomObject, setRoomObject] = useState<string>("");
	const [getRoomUnit, setRoomUnit] = useState<string>("m²");
	const [getRoomArea, setRoomArea] = useState<number>(0);
	const [updatingStatus, setUpdatingStatus] = useState<string>("À jour");

	useEffect(() => {
		setPartialRoom({ ...partialRoom, name: getRoomObject });
	}, [getRoomObject]);

	useEffect(() => {
		setPartialRoom({ ...partialRoom, unit: getRoomUnit });
	}, [getRoomUnit]);

	useEffect(() => {
		setPartialRoom({ ...partialRoom, size: getRoomArea });
	}, [getRoomArea]);

	return (
		<div className="grid row_gap-10 m_top-10">
			<SectionHead
				title={title}
				sendToServerProps={{
					path: "/proprety/" + _id,
					data: {
						description: propretyDescription,
					},
					getStatus: setUpdatingStatus,
				}}
				updatingStatus={updatingStatus}
				setUpdatingStatus={setUpdatingStatus}
			/>
			<div className="grid row_gap-10">
				{getRooms.rooms.length > 0 ? (
					getRooms.rooms.map((room, index) => (
						<SectionDetailCard
							index={index}
							room={room}
							removeRoom={removeRooms}
							key={index}
						/>
					))
				) : (
					<div>Aucune information pour l'instant</div>
				)}
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
						<InputNumber
							subject="Surface"
							value={getRoomArea}
							sendToStore={setRoomArea}
						/>
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
							setUpdatingStatus("Mettre à jour");
							setRoomObject("");
							setRoomArea(0);
						}}
						sendToStore={addRooms}
					/>
				</div>
			</div>
		</div>
	);
}

export function InternalDescription() {
	const proprety = propretyStore();
	return (
		<HouseInformationUpdating
			_id={proprety.proprety._id}
			getRooms={proprety.proprety.description.interior}
			addRooms={proprety.updateDescription.addInteriorRoom}
			removeRooms={proprety.updateDescription.removeInteriorRoom}
			title={"Intérior"}
		/>
	);
}

export function ExternalDescription() {
	const proprety = propretyStore();
	return (
		<HouseInformationUpdating
			_id={proprety.proprety._id}
			getRooms={proprety.proprety.description.external}
			addRooms={proprety.updateDescription.addExternalRoom}
			removeRooms={proprety.updateDescription.removeExternalRoom}
			title={"Extérieur"}
		/>
	);
}

export function TenantCharge() {
	const proprety = propretyStore();

	const [charge, setCharge] = useState<TenantCharge>({
		charge: "",
		price: 0,
		currency: "m²",
	});

	const [getChargeName, setChargeName] = useState<string>("");
	const [getPrice, setPrice] = useState<number>(0);
	const [getCurrency, setCurrency] = useState<string>("USD");
	const [updatingStatus, setUpdatingStatus] = useState<string>("À jour");

	useEffect(() => {
		setCharge({ ...charge, charge: getChargeName });
	}, [getChargeName]);

	useEffect(() => {
		setCharge({ ...charge, price: getPrice });
	}, [getPrice]);

	useEffect(() => {
		setCharge({ ...charge, currency: getCurrency });
	}, [getCurrency]);

	return (
		<div className="grid row_gap-10 m_top-10">
			<SectionHead
				title={"Charge du locateur"}
				sendToServerProps={{
					path: "/proprety/" + proprety.proprety._id,
					data: {
						description: proprety.proprety.description,
					},
					getStatus: () => {},
				}}
				updatingStatus={updatingStatus}
				setUpdatingStatus={setUpdatingStatus}
			/>
			<div className="grid row_gap-10">
				{proprety.proprety.description.tenantCharges.length > 0 ? (
					proprety.proprety.description.tenantCharges.map((charge, index) => (
						<div className="flex" key={index}>
							<div className="flex pd-5 br border-gray w_max m_right-10">
								<div className="one_line_txt m_right-20 txt_meddium">
									{charge.charge} {" :"}
								</div>
								<div className="w_max">
									{toTriadeNumber(charge.price)}{" "}
									{charge.currency === "USD" ? "$" : "fc"}{" "}
								</div>
							</div>
							<button
								className="btn_p btn br color_w w_50"
								onClick={() =>
									proprety.updateDescription.removeTenantCharge(index)
								}>
								<RxCross1 size="20px" />
							</button>
						</div>
					))
				) : (
					<div>Aucune information pour l'instant</div>
				)}
			</div>
			<div className="flex">
				<div className="w_max flex m_right-10">
					<InputHasDetails
						detailsData={["Eau", "Electricité", "Poubelle"]}
						store={getChargeName}
						object={"Charge"}
						sendToStore={setChargeName}
						customClass={"m_right-10"}
						hasInput={true}
					/>
					<InputNumber subject="Prix" value={getPrice} sendToStore={setPrice} />
					<InputHasDetails
						detailsData={["USD", "CDF"]}
						store={getCurrency}
						object={""}
						sendToStore={setCurrency}
						customClass={""}
					/>
				</div>
				<SectionAddDetailButton
					conditionToPass={getChargeName.length > 1 && getPrice > 0}
					data={charge}
					reseter={() => {
						setUpdatingStatus("Mettre à jour");
						setChargeName("");
						setPrice(0);
					}}
					sendToStore={proprety.updateDescription.addTenantCharge}
				/>
			</div>
		</div>
	);
}

export default function QuiltedImageList() {
	const proprety = propretyStore();
	return (
		<div className="pd-20 border-gray br m_x-20 h_auto">
			<SectionHead
				title={"Gallery"}
				sendToServerProps={{
					path: "/proprety/" + proprety.proprety._id,
					data: {
						description: proprety.proprety.description,
					},
					getStatus: () => {},
				}}
				updatingStatus={"Mettre à jour"}
				setUpdatingStatus={() => {}}
			/>
			<ImageListZubuWithFirstBigImage />
			<ImageListZubuWithLastBigImage />
		</div>
	);
}
