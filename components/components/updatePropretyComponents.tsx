import React, { useEffect, useState } from "react";
import { propretyStore, loaderStatus } from "../../store/proprety";
import { RoomDetailsType, TenantChargeType } from "../interface/proprety";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusCircle, AiOutlineCheck } from "react-icons/ai";
import { toTriadeNumber } from "../usefulFuction/numbers";
import { AdaptedImages } from "./imageList";
import { BsFillHouseFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import PropretyAvailability from "../atoms/propretyAvailability";
import { sendToServer, uploadImage } from "../usefulFuction/requests";
import { SendToServerType } from "../interface/requests";
import { Input, InputHasDetails, InputNumber } from "../atoms/form";

const propretyType = [
	"Maison meublé",
	"Maison vide",
	"appartement",
	"Commerce",
	"Burreau",
	"Salle de fête",
	"Terrasse",
];

export function CoverPicture() {
	const loader = loaderStatus();
	const proprety = propretyStore();

	const pictureSource =
		(proprety.updateRenatlInformation.files &&
		proprety.updateRenatlInformation.files?.length > 0
			? URL.createObjectURL(proprety.updateRenatlInformation.files)
			: "") ||
		(proprety.proprety.rentalInformation.coverPicture?.length > 0
			? proprety.proprety.rentalInformation.coverPicture
			: "");

	const uploadCoverImage = async () => {
		await uploadImage({
			file: proprety.updateRenatlInformation.files
				? proprety.updateRenatlInformation.files
				: "",
			getStatus: loader.setUploadingCoverPicture,
			getUrl: proprety.updateRenatlInformation.setCoverPicture,
			clearFileFunction: proprety.updateRenatlInformation.clearFiles,
			getImage: () => {},
			doAfterResponse: () =>
				sendToServer({
					data: {
						rentalInformation: proprety.proprety.rentalInformation,
					},
					path: "/proprety/" + proprety.proprety._id,
					getStatus: loader.setUploadingCoverPicture,
				}),
		});
	};

	return (
		<div className="w_max column gap-10">
			<div className="space_between w_max">
				Photo de couverture
				<label htmlFor="uploadCoverPicture">
					<FiEdit size="20px" />
				</label>
			</div>
			<input
				type="file"
				id="uploadCoverPicture"
				accept="image/png, image/jpeg"
				className="hide"
				onChange={(e) => {
					if (e.target.files !== null) {
						proprety.updateRenatlInformation.setFiles(e.target.files[0]);
					}
				}}
			/>
			<div
				style={{
					minHeight: "120px",
					maxHeight: "300px",
					overflow: "hidden",
					backgroundColor: "#D9D9D9",
					border: "1px solid #B9B9B9",
				}}
				onClick={() => console.log(proprety.proprety.rentalInformation)}
				className="flex_center-xy br w_max h_auto m_y-5">
				{proprety.updateRenatlInformation.files ||
				proprety.proprety.rentalInformation.coverPicture ? (
					<Image
						width={340}
						height={191.25}
						className="cover_picture_card"
						src={pictureSource}
						alt="Photo de couverture d'un appartement."
					/>
				) : (
					<BsFillHouseFill size="50px" color="#B9B9B9" />
				)}
			</div>
			<button
				className="btn_s color_blue br txt_normal btn w_max"
				onClick={() => uploadCoverImage()}>
				{loader.uploadingCoverPicture}
			</button>
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
		const thisProps: SendToServerType = {
			path: "/proprety/" + proprety.proprety._id,
			data: data,
			getStatus: status.setUpdatingStatus,
		};
		sendToServer(thisProps);
	};

	return (
		<div className="rental_information_card">
			<div className="rental_information_header column gap-10">
				<h3 className="w_max">Information sur la location</h3>
				<PropretyBanner />
			</div>
			<div className="rental_information_input m_right-10">
				<Input
					value={proprety.proprety.rentalInformation.lessor.fullName}
					sendToStore={proprety.updateRenatlInformation.setLessorName}
					type={"text"}
					subject={"Bailleur"}
					placeholder={"Nom"}
				/>
				<Input
					value={proprety.proprety.rentalInformation.lessor.contacts}
					sendToStore={proprety.updateRenatlInformation.setLessorContact}
					type={"text"}
					subject={"Contacts"}
					placeholder={"Numéro"}
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
						subject={"Libre au"}
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
						value={proprety.proprety.rentalInformation.bedRooms}
						sendToStore={proprety.updateRenatlInformation.setbedRooms}
						type={"text"}
						subject={"Chambres"}
						placeholder={"Nombre des chambres"}
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

interface SectionHeadProps {
	title: string;
	setUpdatingStatus: (status: string) => void;
	sendToServerProps: SendToServerType;
	updatingStatus: string;
	uploadImages?: () => void;
}

export function SectionHead(props: SectionHeadProps) {
	return (
		<div className="flex space_between m_y-10">
			<h3>{props.title}</h3>
			<button
				className="btn_s btn color_blue br txt_normal"
				onClick={async () => {
					if (props.uploadImages) props.uploadImages();
					else {
						props.setUpdatingStatus("Envoie...");
						sendToServer(props.sendToServerProps);
					}
				}}>
				{props.updatingStatus}
			</button>
		</div>
	);
}

interface SectionDetailCardProps {
	index: number;
	room: RoomDetailsType;
	removeRoom: (index: number) => void;
	updateStatus: () => void;
}

function SectionDetailCard(props: SectionDetailCardProps) {
	return (
		<div className="flex m_y-10">
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
				onClick={() => {
					props.removeRoom(props.index);
					props.updateStatus();
				}}>
				<RxCross1 size="20px" />
			</button>
		</div>
	);
}

interface SectionAddDetailButtonProps {
	conditionToPass: boolean;
	reseter: () => void;
	sendToStore: (data: any) => void;
	data: any;
}

function SectionAddDetailButton(props: SectionAddDetailButtonProps) {
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

interface HouseInformationUpdatingProps {
	getRooms: { rooms: RoomDetailsType[] };
	addRooms: (string: RoomDetailsType) => void;
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
}: HouseInformationUpdatingProps) {
	const propretyDescription = propretyStore().proprety.description;
	const [partialRoom, setPartialRoom] = useState<RoomDetailsType>({
		name: "",
		size: 0,
		unit: "m²",
	});
	const [getRoomObject, setRoomObject] = useState<string>("");
	const [getRoomUnit, setRoomUnit] = useState<string>("m²");
	const [getRoombedRooms, setRoombedRooms] = useState<number>(0);
	const [updatingStatus, setUpdatingStatus] = useState<string>("À jour");

	useEffect(() => {
		setPartialRoom((prev) => ({ ...prev, name: getRoomObject }));
	}, [getRoomObject]);

	useEffect(() => {
		setPartialRoom((prev) => ({ ...prev, unit: getRoomUnit }));
	}, [getRoomUnit]);

	useEffect(() => {
		setPartialRoom((prev) => ({ ...prev, size: getRoombedRooms }));
	}, [getRoombedRooms]);

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
							key={room.name + room.size + room.unit}
							updateStatus={() => setUpdatingStatus("Mettre à jour")}
						/>
					))
				) : (
					<div className="m_y-10">Ajoutez une information</div>
				)}
				<div className="flex">
					<div className="w_max flex">
						<InputHasDetails
							detailsData={["Salon", "Salle à manger", "Toillettes", "Douches"]}
							store={getRoomObject}
							object={""}
							sendToStore={setRoomObject}
							customClass={"m_right-10"}
							hasInput={true}
						/>
						<InputNumber
							subject="Surface"
							value={getRoombedRooms}
							customClass={"m_right-10"}
							sendToStore={setRoombedRooms}
						/>
						<InputHasDetails
							detailsData={["m²", "ft"]}
							store={getRoomUnit}
							object={""}
							customClass={"m_right-10"}
							sendToStore={setRoomUnit}
						/>
					</div>
					<SectionAddDetailButton
						conditionToPass={getRoomObject.length > 1 && getRoombedRooms > 0}
						data={partialRoom}
						reseter={() => {
							setUpdatingStatus("Mettre à jour");
							setRoomObject("");
							setRoombedRooms(0);
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

	const [charge, setCharge] = useState<TenantChargeType>({
		charge: "",
		price: 0,
		currency: "m²",
	});

	const [getChargeName, setChargeName] = useState<string>("");
	const [getPrice, setPrice] = useState<number>(0);
	const [getCurrency, setCurrency] = useState<string>("USD");
	const [updatingStatus, setUpdatingStatus] = useState<string>("À jour");

	useEffect(() => {
		setCharge((prev) => ({ ...prev, charge: getChargeName }));
	}, [getChargeName]);

	useEffect(() => {
		setCharge((prev) => ({ ...prev, price: getPrice }));
	}, [getPrice]);

	useEffect(() => {
		setCharge((prev) => ({ ...prev, currency: getCurrency }));
	}, [getCurrency]);

	return (
		<div className="grid row_gap-10 m_y-10">
			<SectionHead
				title={"Charge du locateur"}
				sendToServerProps={{
					path: "/proprety/" + proprety.proprety._id,
					data: {
						description: proprety.proprety.description,
					},
					getStatus: setUpdatingStatus,
				}}
				updatingStatus={updatingStatus}
				setUpdatingStatus={setUpdatingStatus}
			/>
			<div className="grid row_gap-10 m_y-10">
				{proprety.proprety.description.tenantCharges.length > 0 ? (
					proprety.proprety.description.tenantCharges.map((charge, index) => (
						<div
							className="flex"
							key={charge.charge + charge.currency + charge.price}>
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
					<div>Ajoutez une information</div>
				)}
			</div>
			<div className="flex">
				<div className="w_max flex">
					<InputHasDetails
						detailsData={["Eau", "Electricité", "Poubelle"]}
						store={getChargeName}
						object={"Charge"}
						sendToStore={setChargeName}
						customClass={"m_right-10"}
						hasInput={true}
					/>
					<InputNumber
						subject="Prix"
						value={getPrice}
						customClass={"m_right-10"}
						sendToStore={setPrice}
					/>
					<InputHasDetails
						detailsData={["USD", "CDF"]}
						store={getCurrency}
						object={""}
						sendToStore={setCurrency}
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

export function PropretyGalleryUpdate() {
	return (
		<div className="pd-20 m_right-20 border-gray br h_auto proprety_gallery">
			<AdaptedImages />
		</div>
	);
}

export function PropretyBanner() {
	const proprety = propretyStore();
	return (
		<div className="space_between pd-10 border-b">
			<div className="flex_center-x">
				{" "}
				<FaMapMarkerAlt size={18} className="m_x-5" />{" "}
				{proprety.proprety.rentalInformation.address}
			</div>
			<PropretyAvailability />
		</div>
	);
}
