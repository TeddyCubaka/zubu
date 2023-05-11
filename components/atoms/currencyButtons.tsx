import { RentalPrice } from "../../store/publicationStore";

interface SetCurrencyComponentTRype {
	rentalPrice: RentalPrice;
	setRentalPrice: (rentalPrice: RentalPrice) => void;
}
export default function SetCurrency({
	rentalPrice,
	setRentalPrice,
}: SetCurrencyComponentTRype) {
	const getClassName = (ref: string) =>
		"block text-[12px] font-medium border-2 whitespace-nowrap border-[#123853] px-3 py-1 mx-1 rounded-3xl cursor-default " +
		(rentalPrice.monetaryCurrency === ref
			? "bg-[#123853] text-white"
			: "text-[#123853] bg-white");
	const setStore = (value: string) =>
		setRentalPrice({ ...rentalPrice, monetaryCurrency: value });
	return (
		<div className="flex">
			<span onClick={() => setStore("USD")} className={getClassName("USD")}>
				USD - $
			</span>
			<span onClick={() => setStore("CDF")} className={getClassName("CDF")}>
				CDF - fc
			</span>
		</div>
	);
}
