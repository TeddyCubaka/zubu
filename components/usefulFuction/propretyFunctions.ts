export function getAdressForTenant(adress: string): string {
	let adressForTenant = "";
	adress.split("/").map((string, index) => {
		if (index === 2) adressForTenant = adressForTenant + string;
		if (index < 2) adressForTenant = adressForTenant + string + "/";
	});
	return adressForTenant;
}

export function getCurrencySymbol(currency: string): string {
	return currency === "USD" ? "$" : "FC";
}
