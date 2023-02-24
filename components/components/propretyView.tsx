import { BsHouseFill } from "react-icons/bs";
import { MdShare } from "react-icons/md";
import { propretyStore } from "../../store/proprety";
import PropretyAvailability from "../atoms/propretyAvailability";
import { SaveProprety } from "../atoms/saveProprety";
import { RoomDetails } from "../interface/proprety";
import {
	getAdressForTenant,
	getCurrencySymbol,
} from "../usefulFuction/propretyFunctions";
import { toTriadeNumber } from "../usefulFuction/numbers";

export function PropretyViewBanner() {
	return (
		<div className="space_between pd-20 border-b m_y-10">
			<div className="strong">
				{" "}
				<BsHouseFill size="18" />{" "}
				{propretyStore().proprety.rentalInformation.RentalType}{" "}
			</div>
			<div className="flex">
				<PropretyAvailability />
				<SaveProprety />
				<div className="flex_center-x m_x-10">
					{" "}
					<MdShare size="18" className="m_x-5" /> Partager
				</div>
			</div>
		</div>
	);
}

export function RentalInformation() {
	const RentalInformation = propretyStore().proprety.rentalInformation;
	const chakeAvaibality = () => {
		return RentalInformation.isAvailable ? "Libre" : "Occupée";
	};
	return (
		<div className="flex m_x-20 m_y-10">
			<h1 className="m_x-20 flex_center-xy">
				{" "}
				{RentalInformation.price}{" "}
				{getCurrencySymbol(RentalInformation.monetaryCurrency)} /mois{" "}
			</h1>
			<div>
				<div className="m_y-5">
					{" "}
					<span className="strong">Adresse :</span>{" "}
					{getAdressForTenant(RentalInformation.address)}
				</div>
				<div className="m_y-5">
					{" "}
					<span className="strong">Garantie :</span>{" "}
					{RentalInformation.guaranteeValue}{" "}
				</div>
				<div className="m_y-5">
					{" "}
					<span className="strong">Libre au :</span>{" "}
					{RentalInformation.availabilityDate
						? RentalInformation.availabilityDate
						: chakeAvaibality()}{" "}
				</div>
				<div>
					<span className="strong">Chambres :</span>{" "}
					{RentalInformation.bedRooms}{" "}
				</div>
			</div>
		</div>
	);
}

export function AskForVisit() {
	return (
		<div className="two_part column_gap-10  m_y-10">
			<button className="btn_p btn br color_w txt_normal w_max">
				Demander à visiter
			</button>
			<button className="btn_s btn br color_b txt_normal w_max">
				Donner une offre
			</button>
		</div>
	);
}

function Room(props: RoomDetails) {
	return (
		<div className="one_line_txt">
			<span className="strong">
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
		<div className="grid row_gap-10 m_y-10">
			<h3>Intérieur</h3>
			<div className="grid row_gap-10">
				{internalRooms.map((room) => (
					<Room name={room.name} size={room.size} unit={room.unit} />
				))}
			</div>
		</div>
	);
}

export function ExternalRooms() {
	const internalRooms = propretyStore().proprety.description.external.rooms;
	return (
		<div className="grid row_gap-10 m_y-10">
			<h3>Extérieur</h3>
			<div className="grid row_gap-10">
				{internalRooms.map((room) => (
					<Room name={room.name} size={room.size} unit={room.unit} />
				))}
			</div>
		</div>
	);
}

export function TenantCharges() {
	const tenantCharges = propretyStore().proprety.description.tenantCharges;
	return (
		<div className="grid row_gap-10 m_y-10">
			<h3>Charges supporté par le locataire</h3>
			<div className="grid row_gap-10">
				{tenantCharges.map((charge) => (
					<div>
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
				))}
			</div>
		</div>
	);
}
