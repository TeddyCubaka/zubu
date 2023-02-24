import { MdShare } from "react-icons/md";
import { propretyStore } from "../../store/proprety";
import PropretyAvailability from "../atoms/propretyAvailability";
import { SaveProprety } from "../atoms/saveProprety";

export function PropretyViewBanner() {
	return (
		<div className="space_between pd-10 border-b m_bottom-20">
			<div>Type of proprety</div>
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
	const proprety = propretyStore();
	console.log(proprety.proprety);
	return (
		<div>
			<h1>I'm the boss</h1>
		</div>
	);
}
