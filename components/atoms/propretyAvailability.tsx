import { BsFillCircleFill } from "react-icons/bs";
import { propretyStore } from "../../store/proprety";

export default function PropretyAvailability() {
	const proprety = propretyStore();
	return (
		<div className="flex items-center mx-2.5">
			{" "}
			{proprety.proprety.rentalInformation?.isAvailable ? (
				<>
					<BsFillCircleFill color="green" size="10px" className="mr-[5px]" /> En
					annonce <span className="max-md:hidden ml-1 "> actuellement</span>
				</>
			) : (
				<>
					<BsFillCircleFill color="red" size="10px" className="mr-[5px]" />{" "}
					N&apos;est pas en annonce
				</>
			)}{" "}
		</div>
	);
}
