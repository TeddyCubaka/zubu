import { BsFillCircleFill } from "react-icons/bs";
import { propretyStore } from "../../store/proprety";

export default function PropretyAvailability() {
	const proprety = propretyStore();
	return (
		<div className="flex_center-x m_x-10">
			{" "}
			{proprety.proprety.rentalInformation.isAvailable ? (
				<>
					<BsFillCircleFill color="green" size="10px" className="m_x-5" /> Libre
				</>
			) : (
				<>
					<BsFillCircleFill color="red" size="10px" /> {" "} Occupé
				</>
			)}{" "}
		</div>
	);
}
