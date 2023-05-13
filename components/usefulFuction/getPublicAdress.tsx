export function getPublicAdress(adress: string): string {
	const publicAdress: string[] = adress.split("/").filter((locality, index) => {
		if (index > 1) return locality;
	});
	return publicAdress.join("/").toLowerCase();
}
