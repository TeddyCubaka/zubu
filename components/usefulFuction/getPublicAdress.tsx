export function getPublicAdress(adress: string): string {
	const publicAdress: string[] = adress
		.split("/")
		.map((locality, index) => (index > 1 ? locality : ""));
	return "" + publicAdress;
}
