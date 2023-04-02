import { useState } from "react";
import { Signup, Login } from "../../components/components/authCompenents";

export default function Auth() {
	const [status, setSatus] = useState<boolean>(true);
	return (
		<div>
			<h1>Auth routes</h1>
			<div className="auth_component">{status ? <Login /> : <Signup />}</div>
		</div>
	);
}
