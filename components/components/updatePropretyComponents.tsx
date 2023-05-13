import React, { useEffect, useState } from "react";
import { propretyStore, loaderStatus } from "../../store/proprety";
import { RoomDetailsType, TenantChargeType } from "../interface/proprety";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai";
import { toTriadeNumber } from "../usefulFuction/numbers";
import { AdaptedImages } from "./imageList";
import { BsFillHouseFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import PropretyAvailability from "../atoms/propretyAvailability";
import { sendToServer, uploadImage } from "../usefulFuction/requests";
import { SendToServerType } from "../interface/requests";
import { Input, InputDate, InputHasDetails, InputNumber } from "../atoms/form";
import { PrimaryButton, SecondaryButton } from "../atoms/button";
import SetCurrency from "../atoms/currencyButtons";

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
		<div className="w-auto flex flex-col gap-2.5">
			<label
				htmlFor="uploadCoverPicture"
				className="flex justify-center items-center h-[200px] overflow-hidden w-full my-1.25 bg-[#d9d9d9] border border-app-gray">
				{proprety.updateRenatlInformation.files ||
				proprety.proprety.rentalInformation.coverPicture ? (
					<Image
						width={340}
						height={191.25}
						className="w-full h-auto bg-[#00000] object-cover"
						src={pictureSource}
						alt="Photo de couverture d'un appartement."
					/>
				) : (
					<BsFillHouseFill size="50px" color="#B9B9B9" />
				)}
			</label>
			<input
				type="file"
				id="uploadCoverPicture"
				accept="image/png, image/jpeg"
				className="hide"
				onChange={(e) => {
					if (e.target.files !== null) {
						proprety.updateRenatlInformation.setFiles(e.target.files[0]);
						uploadCoverImage();
					}
				}}
			/>
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
		<div className="flex flex-col gap-5">
			<PropretyBanner />
			<CoverPicture />
			<div className="grid grid-cols-2 gap-x-4 gap-y-4 max-md:flex max-md:flex-col">
				<Input
					value={proprety.proprety.rentalInformation.price}
					sendToStore={(e) =>
						typeof e !== "string"
							? ""
							: proprety.updateRenatlInformation.setPrice
					}
					type={"number"}
					subject={"Prix"}
					customClass={"w_max"}
					placeholder={"Prix"}>
					<SetCurrency
						monetaryCurrency={
							proprety.proprety.rentalInformation.monetaryCurrency
						}
						setRentalCurrency={proprety.updateRenatlInformation.setCurrency}
					/>
				</Input>
				<Input
					value={proprety.proprety.rentalInformation.guaranteeValue}
					sendToStore={(e) =>
						typeof e !== "string"
							? ""
							: proprety.updateRenatlInformation.setGuaratee
					}
					type={"text"}
					subject={"Garantie"}
					placeholder={"Ajoutez une garantie"}>
					<span className="block text-[12px] font-medium border-2 whitespace-nowrap border-[#123853] px-3 py-1 mx-1 rounded-3xl cursor-default bg-[#123853] text-white">
						Mois
					</span>
				</Input>
				<InputHasDetails
					detailsData={propretyType}
					store={proprety.proprety.rentalInformation.RentalType}
					object={"Type"}
					sendToStore={proprety.updateRenatlInformation.setType}
					customClass={""}
				/>
				<Input
					value={proprety.proprety.rentalInformation.bedRooms}
					sendToStore={(e) =>
						typeof e !== "string"
							? ""
							: proprety.updateRenatlInformation.setbedRooms
					}
					type={"text"}
					subject={"Chambres"}
					placeholder={"Nombre des chambres"}
				/>
				<Input
					value={proprety.proprety.rentalInformation.lessor.fullName}
					sendToStore={(e) =>
						typeof e !== "string"
							? ""
							: proprety.updateRenatlInformation.setLessorName
					}
					type={"text"}
					subject={"Bailleur"}
					placeholder={"Nom"}
				/>
				<Input
					value={proprety.proprety.rentalInformation.lessor.contacts}
					sendToStore={(e) =>
						typeof e == "string"
							? proprety.updateRenatlInformation.setLessorContact(e)
							: ""
					}
					type={"text"}
					subject={"Contacts"}
					placeholder={"Numéro"}
				/>
				<InputDate
					value={proprety.proprety.rentalInformation.availabilityDate}
					sendToStore={(e) =>
						typeof e !== "string"
							? ""
							: proprety.updateRenatlInformation.setAvailabilyDate
					}
					customClass="col-span-2"
					type={"date"}
					subject={"Periode de l'annonce"}
				/>
			</div>
			{/* <div className="rental_information_card_sub_button flex w_max"> */}
			{/* <button
					className="btn_s color_blue br txt_normal btn w_max mr-2.5"
					onClick={() => {
						if (proprety.proprety.rentalInformation.isAvailable)
							proprety.updateRenatlInformation.changeAvailability(false);
						else proprety.updateRenatlInformation.changeAvailability(true);
					}}>
					{proprety.proprety.rentalInformation.isAvailable
						? "Marquer occupé"
						: "Maquer libre"}
				</button> */}
			<SecondaryButton
				conditionToPass={true}
				doOnClick={() => {
					status.setUpdatingStatus("Envoie...");
					postUpdating();
				}}
				subject={status.updatingStatus}
				fullRounded={true}
			/>
			{/* </div> */}
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
		<div className="border-b-2 pb-2.5 flex justify-between items-center">
			<h3 className="font-normal">{props.title}</h3>
			<button
				className="btn_s btn text-blue rounded-3xl min-w-[100px] txt_normal"
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
		<div className="flex my-[10px]">
			<div className="flex-1 p-1.25 flex items-center border">
				<span className="whitespace-nowrap mr-5 font-normal flex-1">
					{props.room.name} {" :"}
				</span>
				<span className="flex-1">
					{toTriadeNumber(props.room.size)} {props.room.unit}{" "}
				</span>
			</div>
			<PrimaryButton
				conditionToPass
				doOnClick={() => {
					props.removeRoom(props.index);
					props.updateStatus();
				}}
				notWidthMax
				subject={<RxCross1 size="20px" />}
			/>
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
			className={
				"max-md:w-full max-md:rounded-full flex justify-center items-end pb-2 w-[50px] " +
				(props.conditionToPass
					? "max-md:bg-[#123853] "
					: "max-md:bg-[#12385362] ")
			}
			onClick={() => {
				if (props.conditionToPass) {
					props.sendToStore(props.data);
					props.reseter();
				}
			}}>
			<span className="md:hidden py-1.5 text-white font-normal text-md flex items-center ">
				Ajouter <AiOutlinePlus size={18} className="ml-2" color="white" />{" "}
			</span>
			<AiFillPlusCircle
				size={30}
				className="max-md:hidden"
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
			<div className="grid">
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
				<div className="flex max-md:flex-col gap-[10px] ">
					<div className="w-full flex gap-[10px] max-md:flex-col ">
						<InputHasDetails
							detailsData={["Salon", "Salle à manger", "Toillettes", "Douches"]}
							store={getRoomObject}
							object={"Pièce"}
							sendToStore={setRoomObject}
							customClass={" flex-1"}
							hasInput={true}
						/>
						<InputNumber
							subject="Surface"
							value={getRoombedRooms}
							customClass={"outline-none flex-1"}
							sendToStore={setRoombedRooms}
						/>
						<InputHasDetails
							detailsData={["m²", "ft"]}
							store={getRoomUnit}
							object={"Unité"}
							customClass={"min-w-[75px] "}
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
							<div className="flex pd-5 br border-gray w_max mr-2.5 ">
								<div className="one_line_txt m_right-20 font-medium">
									{charge.charge} {" :"}
								</div>
								<div className="w_max">
									{toTriadeNumber(charge.price)}{" "}
									{charge.currency === "USD" ? "$" : "fc"}{" "}
								</div>
							</div>
							<button
								className="btn_p btn br text-white w_50"
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
			<div className="flex  max-md:flex-col gap-[10px] ">
				<div className="w-full flex gap-[10px]  max-md:flex-col ">
					<InputHasDetails
						detailsData={["Eau", "Electricité", "Poubelle"]}
						store={getChargeName}
						object={"Charge"}
						sendToStore={setChargeName}
						customClass={"flex-1"}
						hasInput={true}
					/>
					<InputNumber
						subject="Montant"
						value={getPrice}
						customClass={"flex-1"}
						sendToStore={setPrice}
					/>
					<InputHasDetails
						detailsData={["USD", "CDF"]}
						store={getCurrency}
						object={"Unité"}
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
		<div className="p-5 m_right-20 border-gray br h_auto proprety_gallery">
			<AdaptedImages />
		</div>
	);
}

export function PropretyBanner() {
	const proprety = propretyStore();
	return (
		<div className="flex justify-between p-2.5 border border-black">
			<div className="flex items-center">
				{" "}
				<FaMapMarkerAlt size={18} className="m_x-5" />{" "}
				{proprety.proprety.rentalInformation.address}
			</div>
			<PropretyAvailability />
		</div>
	);
}
