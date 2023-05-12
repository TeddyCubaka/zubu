import { BsFillCircleFill } from "react-icons/bs";
import { propretyStore } from "../../store/proprety";

export default function PropretyAvailability() {
	const proprety = propretyStore();
	return (
		<div className="flex items-center mx-2.5">
			{" "}
			{proprety.proprety.rentalInformation.isAvailable ? (
				<>
					<BsFillCircleFill color="green" size="10px" className="m_x-5" /> En
					annonce actuellement
				</>
			) : (
				<>
					<BsFillCircleFill color="red" size="10px" className="m_x-5" /> N'est
					pas en annonce
				</>
			)}{" "}
		</div>
	);
}
