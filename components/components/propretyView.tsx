import { propretyStore } from "../../store/proprety";

export function RentalInformation() {
	const proprety = propretyStore();
	console.log(proprety.proprety);
	return (
		<div>
			<h1>I'm the boss</h1>
		</div>
	);
}
