export function toTriadeNumber(number: number) {
	const triadeAsArray = number.toString().split("").reverse();
	let triade: string = "";
	number
		.toString()
		.split("")
		.reverse()
		.map((int, index) => {
			if ((index + 1) % 3 == 0) triade = " " + int + triade;
			else triade = int + triade;
		});
	return triade;
}
