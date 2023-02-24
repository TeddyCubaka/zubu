import { BsHouseFill } from "react-icons/bs";
import { MdShare } from "react-icons/md";
import { propretyStore } from "../../store/proprety";
import PropretyAvailability from "../atoms/propretyAvailability";
import { SaveProprety } from "../atoms/saveProprety";

export function PropretyViewBanner() {
	return (
		<div className="space_between pd-20 border-b m_bottom-20">
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
		<div className="flex m_x-20">
			<div className="strong m_x-20 flex_center-xy">
				{" "}
				{RentalInformation.price} {RentalInformation.monetaryCurrency} /mois{" "}
			</div>
			<div>
				<div className="m_y-10">
					{" "}
					<span className="strong">Adresse :</span> {RentalInformation.address}{" "}
				</div>
				<div className="m_y-10">
					{" "}
					<span className="strong">Garantie :</span>{" "}
					{RentalInformation.guaranteeValue}{" "}
				</div>
				<div className="m_y-10">
					{" "}
					<span className="strong">Libre au :</span>{" "}
					{RentalInformation.availabilityDate
						? RentalInformation.availabilityDate
						: chakeAvaibality()}{" "}
				</div>
			</div>
		</div>
	);
}
