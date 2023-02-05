function triadeNumber(number: string): string {
	let triade: string = "";
	number
		.split("")
		.reverse()
		.map((int, index) => {
			if ((index + 1) % 3 == 0) triade = " " + int + triade;
			else triade = int + triade;
		});
	return triade;
}
export function toTriadeNumber(number: number) {
	if (number.toString().indexOf(".") > -1) {
		return (
			triadeNumber(number.toString().split(".")[0]) +
			"." +
			triadeNumber(number.toString().split(".")[1])
		);
	} else return triadeNumber(number.toString());
}
