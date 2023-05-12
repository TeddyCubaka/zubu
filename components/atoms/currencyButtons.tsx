export interface RentalPrice {
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
}

interface SetCurrencyComponentTRype {
	monetaryCurrency: string;
	setRentalCurrency: (currency: string) => void;
}
export default function SetCurrency({
	monetaryCurrency,
	setRentalCurrency,
}: SetCurrencyComponentTRype) {
	const getClassName = (ref: string) =>
		"block text-[12px] font-medium border-2 whitespace-nowrap border-[#123853] px-3 py-1 mx-1 rounded-3xl cursor-default " +
		(monetaryCurrency === ref
			? "bg-[#123853] text-white"
			: "text-[#123853] bg-white");
	const setStore = (value: string) => setRentalCurrency(value);
	return (
		<div className="flex">
			<span onClick={() => setStore("USD")} className={getClassName("USD")}>
				USD <span className="max-md:hidden">- $</span>
			</span>
			<span onClick={() => setStore("CDF")} className={getClassName("CDF")}>
				CDF <span className="max-md:hidden">- fc</span>
			</span>
		</div>
	);
}
