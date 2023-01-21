import React, { useState, useEffect } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import { ImRadioChecked, ImRadioChecked2 } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";

interface ButtonCOndition {
	conditionToPass: string;
	seter: (string: string) => void;
	hideBackButton?: boolean;
	conditionHasObject?: Lessor;
	priceObject?: RentalPrice;
	seterLessor?: (object: Lessor) => void;
	seterRentalPrice?: (object: RentalPrice) => void;
}

interface InputRadioType {
	value: string;
}

interface Lessor {
	name: string;
	contacts: string;
}

interface RentalPrice {
	price: string;
	guarantee_value: string;
	monetary_currency: string;
}

function TwoButton({
	conditionToPass,
	seter,
	hideBackButton,
	conditionHasObject,
	seterLessor,
	seterRentalPrice,
	priceObject,
}: ButtonCOndition) {
	const [setCount, unSetCount] = publicationStore(
		(state) => [state.setCount, state.unSetCount],
		shallow
	);
	return (
		<div className="flex w_max m_y-10">
			{hideBackButton ? (
				""
			) : (
				<button
					className="btn_s btn br color_b ctxt_normal w_max m_x-20"
					onClick={() => unSetCount()}>
					Précédant
				</button>
			)}
			<button
				type="button"
				className={
					conditionToPass.length > 0
						? "btn_p btn br color_w txt_normal w_max m_x-20"
						: "btn_p_not_active btn br color_w txt_normal w_max m_x-20"
				}
				onClick={() => {
					if (conditionToPass.length > 0) {
						setCount();
						seter(conditionToPass);
						seterLessor && conditionHasObject
							? seterLessor(conditionHasObject)
							: "";
						seterRentalPrice && priceObject
							? seterRentalPrice(priceObject)
							: "";
						console.log("pass");
					}
				}}>
				Suivant
			</button>
		</div>
	);
}

export function GetAdress() {
	const [adress, getAdress] = useState<string>("");
	const [goodFormat, setGoodFormat] = useState<string>("");
	const [setAddres] = publicationStore(
		(state) => [state.setAddress, state.setCount, state.unSetCount],
		shallow
	);

	function adressFormatValidator(str: string) {
		if (str.split("/").length === 5) {
			setGoodFormat("br_green");
			getAdress(str);
		} else if (str.length < 2) {
			setAddres("");
			setGoodFormat("br_blue");
		} else {
			setAddres("");
			setGoodFormat("br_red");
		}
	}

	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h3>Reseignez l'adresse</h3>
			<div className="w_max">
				<span>
					format : n° <strong>/</strong>av<strong>/</strong>quartier
					<strong>/</strong>commune<strong>/</strong>ville
				</span>
				<div className="m_y-10 input_w_label">
					<label>Adress</label>
					<input
						type="text"
						placeholder="Ex : 17/kamwe/tondolo/Mont-ngafula/kinshasa"
						className={`br ${goodFormat} w_max`}
						onChange={(e) => {
							adressFormatValidator(e.target.value);
						}}
					/>
				</div>
			</div>
			<TwoButton
				conditionToPass={adress}
				seter={setAddres}
				hideBackButton={true}
			/>
		</div>
	);
}

export function GetPropretyType() {
	const [propretyType, getPropretyType] = useState<string>("");
	const [setPropretyType] = publicationStore(
		(state) => [state.setPropretyType],
		shallow
	);
	function getValue(value: string) {
		getPropretyType(value);
		setPropretyType(value);
	}

	const InputRadio = ({ value }: InputRadioType) => {
		const RadioButton = () => {
			return propretyType === value ? (
				<ImRadioChecked2 color="#123853" />
			) : (
				<ImRadioChecked color="#123853" />
			);
		};
		return (
			<div onClick={() => getValue(value)} className="m_y-5 m_x-10_0">
				{" "}
				<RadioButton /> {value}{" "}
			</div>
		);
	};

	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h1>Quel est le prix pour louer votre bien</h1>
			<div className="w_max input_take_price flex_y-center">
				<details className="m_x-10 proprety_type_details" open>
					<summary>Type de bien</summary>
					<InputRadio value="maison meublé" />
					<InputRadio value="maison vide" />
					<InputRadio value="appartement" />
					<InputRadio value="commerce" />
					<InputRadio value="bureau" />
				</details>
			</div>
			<TwoButton conditionToPass={propretyType} seter={setPropretyType} />
		</div>
	);
}

export function GetLosor() {
	const [lessor, getLessor] = useState<Lessor>({ name: "", contacts: "" });
	const [setLessor] = publicationStore((state) => [state.setLessor], shallow);
	const [lessorConditionToPass, setLessorConditionToPass] =
		useState<string>("");

	useEffect(() => {
		if (lessor.name.length > 3 && lessor.contacts.length > 9)
			setLessorConditionToPass("pass");
		else setLessorConditionToPass("");
	}, [lessor.name, lessor.contacts]);

	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h3>Information sur le bailleur ?</h3>
			<div className="w_max">
				<div className="m_y-10 input_w_label">
					<label>Nom complet :</label>
					<input
						type="text"
						placeholder="Ex : Mutombo Amani"
						className={`br w_max`}
						onChange={(e) => {
							getLessor({ ...lessor, name: e.target.value });
						}}
					/>
				</div>
				<div className="m_y-10 input_w_label">
					<label>Téléphone ou mail :</label>
					<input
						type="email"
						placeholder="Ex : +243 990 000 000 ou user@gmail.com"
						className={`br w_max`}
						onChange={(e) => {
							getLessor({ ...lessor, contacts: e.target.value });
						}}
					/>
				</div>
			</div>
			<TwoButton
				conditionToPass={lessorConditionToPass}
				seter={() => {}}
				conditionHasObject={lessor}
				seterLessor={setLessor}
			/>
		</div>
	);
}

export function GetPrice() {
	const [rentalPrice, GetRentalPrice] = useState<RentalPrice>({
		price: "",
		guarantee_value: "",
		monetary_currency: "USD",
	});
	const [conditionForPricePassed, setConditionForPricePassed] =
		useState<string>("");
	const [setRentalPrice] = publicationStore(
		(state) => [state.setRentalPrice],
		shallow
	);

	function SetCurrency() {
		return (
			<div className="flex">
				<span
					onClick={() =>
						GetRentalPrice({ ...rentalPrice, monetary_currency: "USD" })
					}
					className={
						rentalPrice.monetary_currency === "USD"
							? "currency_button_selected_span block"
							: "currency_button block"
					}>
					USD - $
				</span>
				<span
					onClick={() =>
						GetRentalPrice({ ...rentalPrice, monetary_currency: "USD" })
					}
					className={
						rentalPrice.monetary_currency === "CDF"
							? "currency_button_selected_span m_x-5"
							: "currency_button m_x-5"
					}>
					CDF - fc
				</span>
			</div>
		);
	}

	useEffect(() => {
		if (
			rentalPrice.guarantee_value.length > 0 &&
			rentalPrice.monetary_currency.length > 0 &&
			rentalPrice.price.length > 0
		) {
			setConditionForPricePassed("can pass");
		}
	});

	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h3>Reseignez l'adresse</h3>
			<div className="w_max">
				<div className="m_y-10 input_w_label">
					<label>Prix</label>
					<input
						type="text"
						placeholder="Ex : 300"
						className={`br w_max`}
						onChange={(e) =>
							GetRentalPrice({ ...rentalPrice, price: e.target.value })
						}
					/>
					<SetCurrency />
				</div>
				<div className="m_y-10 input_w_label">
					<label>Guarantie</label>
					<input
						type="text"
						placeholder="Ex : 4"
						className={`br w_max`}
						onChange={(e) =>
							GetRentalPrice({
								...rentalPrice,
								guarantee_value: e.target.value,
							})
						}
					/>
					<div>mois</div>
				</div>
			</div>
			<TwoButton
				conditionToPass={conditionForPricePassed}
				seter={() => {}}
				priceObject={rentalPrice}
				seterRentalPrice={setRentalPrice}
			/>
		</div>
	);
}
