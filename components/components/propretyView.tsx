import { BsHouseFill } from "react-icons/bs";
import { MdShare } from "react-icons/md";
import { propretyStore } from "../../store/proprety";
import PropretyAvailability from "../atoms/propretyAvailability";
import { SaveProprety } from "../atoms/saveProprety";
import {
	PropretyGalleryImageType,
	RoomDetailsType,
} from "../interface/proprety";
import {
	getAdressForTenant,
	getCurrencySymbol,
} from "../usefulFuction/propretyFunctions";
import { toTriadeNumber } from "../usefulFuction/numbers";
import Image from "next/image";
import { IoMdImage } from "react-icons/io";
import { PrimaryButton } from "../atoms/button";
import PropretyImage from "../atoms/images";
import { useState } from "react";

export function PropretyViewBanner() {
	const proprety = propretyStore();
	return (
		<div className="flex justify-between items-center p-3 h-fit border-b">
			<span className="font-normal flex-1 flex items-center gap-3">
				{" "}
				<BsHouseFill size="18" />{" "}
				{propretyStore().proprety.rentalInformation.RentalType}{" "}
			</span>
			<PropretyAvailability />
			<SaveProprety propretyId={proprety.proprety._id} />
			<span className="flex items-center mx-2.5 cursor-pointer hover:underline ">
				{" "}
				<MdShare size="18" className="mx-[5px]" />{" "}
				<span className="max-sm:hidden">Partager</span>
			</span>
		</div>
	);
}

export function RentalInformation() {
	const RentalInformation = propretyStore().proprety.rentalInformation;

	return (
		<div className="flex mx-5 my-[10px] ">
			<h1 className="mx-5 font-semibold flex justify-center items-center">
				{" "}
				{RentalInformation.price}{" "}
				{getCurrencySymbol(RentalInformation.monetaryCurrency)} /mois{" "}
			</h1>
			<div>
				<div className="my-[5px]">
					<span className="font-normal">Adresse :</span>{" "}
					{getAdressForTenant(RentalInformation.address)}
				</div>
				<div className="my-[5px]">
					<span className="font-normal">Garantie :</span>{" "}
					{RentalInformation.guaranteeValue} mois
				</div>
				{/* <div className="my-[5px]">
					<span className="strong">Mise en ligne le :</span>{" "}
					{RentalInformation.availabilityDate
						? RentalInformation.availabilityDate
						: chakeAvaibality()}{" "}
				</div> */}
				<div>
					<span className="font-normal">Description :</span>{" "}
					{RentalInformation.bedRooms}{" "}
				</div>
			</div>
		</div>
	);
}

export function AskForVisit() {
	const [visitMsg, _setVisitMsg] = useState<string>("Demander à visiter");
	return (
		<PrimaryButton
			conditionToPass
			doOnClick={() => {
				_setVisitMsg("Demande de visit...");
				setTimeout(() => _setVisitMsg("Demande de visite envoyée"), 2000);
			}}
			subject={visitMsg}
		/>
	);
}

function Room(props: RoomDetailsType) {
	return (
		<div className="whitespace-nowrap">
			<span className="font-normal">
				{" "}
				{props.name} {" : "}{" "}
			</span>
			<span className="one_line_txt">
				{" "}
				{toTriadeNumber(props.size)} {props.unit}{" "}
			</span>
		</div>
	);
}

export function InternalRooms() {
	const internalRooms = propretyStore().proprety.description.interior.rooms;
	return (
		<div className="grid gap-[10px] my-[10px]">
			<h3>Intérieur</h3>
			<div className="grid gap-2.5">
				{internalRooms.length === 0 ? (
					<div>
						Le propriétaire n&apos;a rien renseigner pour l&apos;instant. 🙃
					</div>
				) : (
					internalRooms.map((room, index) => (
						<Room
							name={room.name}
							size={room.size}
							unit={room.unit}
							key={"" + room.name + room.size + index}
						/>
					))
				)}
			</div>
		</div>
	);
}

export function ExternalRooms() {
	const externalRooms = propretyStore().proprety.description.external.rooms;
	return (
		<div className="grid gap-[10px] my-[10px]">
			<h3>Extérieur</h3>
			<div className="grid gap-2.5">
				{externalRooms.length === 0 ? (
					<div>
						Le propriétaire n&apos;a rien renseigner jusqu&apos;à présent. 🙃
					</div>
				) : (
					externalRooms.map((room, index) => (
						<Room
							name={room.name}
							size={room.size}
							unit={room.unit}
							key={"" + room.name + room.size + index}
						/>
					))
				)}
			</div>
		</div>
	);
}

export function TenantCharges() {
	const tenantCharges = propretyStore().proprety.description.tenantCharges;
	return (
		<div className="grid gap-[10px] my-[10px]">
			<h3>Charges supporté par le locataire</h3>
			<div className="grid gap-2.5">
				{tenantCharges.length === 0 ? (
					<div>
						Le propriétaire n&apos;a rien renseigner jusqu&apos;à présent. 🙃
					</div>
				) : (
					tenantCharges.map((charge, index) => (
						<div key={"" + charge.charge + charge.price + index}>
							<span className="strong">
								{" "}
								{charge.charge}
								{" : "}{" "}
							</span>
							<span>
								{" "}
								{toTriadeNumber(Number(charge.price))}{" "}
								{getCurrencySymbol(charge.currency)}{" "}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export function PropretyGalleryView() {
	const gallery: PropretyGalleryImageType[] =
		propretyStore().proprety.description.gallery;

	return (
		<>
			<div className="text-xl mb-5 font-medium">Gallery</div>
			<div
				className={
					"md:grid md:gap-4 h-full flex items-center overflow-hidden overflow-x-auto gap-5 " +
					(gallery.length > 2 ? "grid-cols-2" : "")
				}>
				{gallery.length > 0 ? (
					gallery.map((image) => (
						<PropretyImage
							hiderDeleter
							source={image.url}
							description={image.publicId + image.uploadDate}
							deleter={() => {}}
							key={image.publicId + image._id}
						/>
					))
				) : (
					<div className="w-full max-md:mb-5 h-full text-[#808080] flex flex-col justify-center items-center">
						<IoMdImage size={75} /> vide pour le moment
					</div>
				)}
			</div>
		</>
	);
}
