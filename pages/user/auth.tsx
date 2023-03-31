import { Signup, Login } from "../../components/components/authCompenents";

export default function Auth() {
	return (
		<div>
			<h1>Auth routes</h1>
			<div className="two_part">
				<Login />
				<Signup />
			</div>
		</div>
	);
}
