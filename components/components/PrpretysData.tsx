import React, { useState, useEffect } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import { ImRadioChecked, ImRadioChecked2 } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import axios from "axios";
import { Input } from "./updatePropretyComponents";
import {
	isTwoWord,
	isValidContactValue,
} from "../usefulFuction/propretyValidator";
import { useRouter } from "next/router";

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
	setPropretyType: (string: string) => void;
	propretyType: string;
}

interface Lessor {
	fullName: string;
	contacts: string;
}

interface RentalPrice {
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
}

interface PostedDate {
	address: string;
	type_of_rental: string;
	lessor: Lessor;
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
}

interface Address {
	number: string;
	avenue: string;
	quoter: string;
	township: string;
	city: string;
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
	// conditionToPass = "pass";
	return (
		<div className="flex w_max m_y-10">
			{hideBackButton ? (
				""
			) : (
				<button
					className="btn_s btn br color_blue ctxt_normal w_max m_x-20"
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
						if (seterLessor && conditionHasObject)
							seterLessor(conditionHasObject);
						if (seterRentalPrice && priceObject) seterRentalPrice(priceObject);
					}
				}}>
				Suivant
			</button>
		</div>
	);
}

export function GetAddress() {
	const [setAddres, address] = publicationStore(
		(state) => [state.setAddress, state.address],
		shallow
	);
	const [addressSplited, setAddressSplited] = useState<Address>({
		number: address.split("/")[0] || "",
		avenue: address.split("/")[1] || "",
		quoter: address.split("/")[2] || "",
		township: address.split("/")[3] || "",
		city: address.split("/")[4] || "",
	});

	const validator = (string: string) => (string.length > 0 ? string + "/" : "");

	useEffect(() => {
		setAddres(
			validator(addressSplited.number) +
				validator(addressSplited.avenue) +
				validator(addressSplited.city) +
				validator(addressSplited.quoter) +
				(addressSplited.township.length > 0
					? addressSplited.township
					: "//////////")
		);
	}, [
		addressSplited.avenue,
		addressSplited.city,
		addressSplited.number,
		addressSplited.quoter,
		addressSplited.township,
		setAddres,
	]);

	return (
		<div className="pd-10">
			<h3 className="m_y-10">Reseignez l&apos;addresse</h3>
			<div className="w_max gap-10">
				<Input
					value={addressSplited.number}
					sendToStore={(e) =>
						setAddressSplited((prev) =>
							Number(e) || e === "" ? { ...prev, number: e } : { ...prev }
						)
					}
					subject={"N° : "}
					customClass={"m_y-5"}
					placeholder={"Renseigner le numéro"}
				/>
				<Input
					value={addressSplited.avenue}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, avenue: e }))
					}
					subject={"avenue ou rue : "}
					customClass={"m_y-5"}
					placeholder={"Rensigner l'avenue"}
				/>
				<Input
					value={addressSplited.quoter}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, quoter: e }))
					}
					subject={"quartier : "}
					customClass={"m_y-5"}
					placeholder={"Rensigner le quartier"}
				/>
				<Input
					value={addressSplited.township}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, township: e }))
					}
					subject={"commune : "}
					customClass={"m_y-5"}
					placeholder={"Rensigner la commune"}
				/>
				<Input
					value={addressSplited.city}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, city: e }))
					}
					subject={"ville : "}
					customClass={"m_y-5"}
					placeholder={"Rensigner la ville"}
				/>
			</div>
			<TwoButton
				conditionToPass={address.split("/").length === 5 ? address : ""}
				seter={setAddres}
				hideBackButton={true}
			/>
		</div>
	);
}

function RadioButton({ propretyType, value }: InputRadioType) {
	return propretyType === value ? (
		<ImRadioChecked2 color="#123853" />
	) : (
		<ImRadioChecked color="#123853" />
	);
}

const InputRadio = ({
	value,
	setPropretyType,
	propretyType,
}: InputRadioType) => {
	return (
		<div onClick={() => setPropretyType(value)} className="m_y-5 m_x-10_0">
			{" "}
			<RadioButton
				propretyType={propretyType}
				value={value}
				setPropretyType={() => {}}
			/>{" "}
			{value}{" "}
		</div>
	);
};
export function GetPropretyType() {
	const [setPropretyType, propretyType] = publicationStore(
		(state) => [state.setPropretyType, state.propretyType],
		shallow
	);

	return (
		<div className="pd-10">
			<h3>Quel est le prix pour louer votre bien</h3>
			<div className="w_max flex_y-center m_y-20">
				<details className="m_x-10 proprety_type_details" open>
					<summary>Type de bien</summary>
					<InputRadio
						setPropretyType={setPropretyType}
						propretyType={propretyType}
						value="maison meublé"
					/>
					<InputRadio
						setPropretyType={setPropretyType}
						propretyType={propretyType}
						value="maison vide"
					/>
					<InputRadio
						setPropretyType={setPropretyType}
						propretyType={propretyType}
						value="appartement"
					/>
					<InputRadio
						setPropretyType={setPropretyType}
						propretyType={propretyType}
						value="commerce"
					/>
					<InputRadio
						setPropretyType={setPropretyType}
						propretyType={propretyType}
						value="bureau"
					/>
				</details>
			</div>
			<TwoButton conditionToPass={propretyType} seter={setPropretyType} />
		</div>
	);
}

export function GetLosor() {
	const [setLessor, lessor] = publicationStore(
		(state) => [state.setLessor, state.lessor],
		shallow
	);

	const mailValidityChecker = (value: string) => {
		let expressionReguliere =
			/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
		if (expressionReguliere.test(value)) return true;
		else false;
		return false;
	};
	const numValidator = (num: string) => {
		if (Number(num)) return true;
		if (num[0] == "+") {
			const newNumber = num.split("");
			delete newNumber[0];
			if (Number(newNumber.join(""))) return true;
			else return false;
		} else return false;
	};

	return (
		<div className="pd-10">
			<h3>Information sur le bailleur</h3>
			<div className="w_max">
				<Input
					value={lessor.fullName}
					sendToStore={(e) => {
						console.log(isTwoWord(e));
						setLessor({ ...lessor, fullName: e });
					}}
					subject={"Nom complet : "}
					customClass={"m_y-10"}
					placeholder={"nom du bailleur ici"}
				/>
				<Input
					value={lessor.contacts}
					sendToStore={(e) => {
						console.log(isValidContactValue(e));
						setLessor({ ...lessor, contacts: e });
					}}
					subject={"numéro de téléphone ou mail : "}
					customClass={"m_y-10"}
					placeholder="Ex : +243 990 000 000 ou user@gmail.com"
				/>
			</div>
			<TwoButton
				conditionToPass={
					isValidContactValue(lessor.contacts) && isTwoWord(lessor.fullName)
						? "pass"
						: ""
				}
				seter={() => {}}
				conditionHasObject={lessor}
				seterLessor={setLessor}
			/>
		</div>
	);
}

interface SetCurrencyComponentTRype {
	rentalPrice: RentalPrice;
	setRentalPrice: (rentalPrice: RentalPrice) => void;
}

function SetCurrency({
	rentalPrice,
	setRentalPrice,
}: SetCurrencyComponentTRype) {
	const getClassName = (ref: string) =>
		rentalPrice.monetaryCurrency === ref
			? "currency_button_selected_span"
			: "currency_button";
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

export function GetPrice() {
	const [setRentalPrice, rentalPrice] = publicationStore(
		(state) => [state.setRentalPrice, state.rentalPrice],
		shallow
	);

	return (
		<div className="pd-10">
			<h3>Reseignez l&apos;addresse</h3>
			<div className="w_max">
				<div className="m_y-10 input_w_label one_line_txt">
					<label>Prix :</label>
					<input
						type="text"
						placeholder="Ex : 300"
						className={`br w_max`}
						value={rentalPrice.price}
						onChange={(e) =>
							setRentalPrice({
								...rentalPrice,
								price:
									Number(e.target.value) || e.target.value === ""
										? e.target.value
										: rentalPrice.price,
							})
						}
					/>
					<SetCurrency
						setRentalPrice={setRentalPrice}
						rentalPrice={rentalPrice}
					/>
				</div>
				<div className="m_y-10 input_w_label one_line_txt">
					<label>Guarantie :</label>
					<input
						type="text"
						placeholder="Ex : 4"
						className={`br w_max m_x-5`}
						value={rentalPrice.guaranteeValue}
						onChange={(e) =>
							setRentalPrice({
								...rentalPrice,
								guaranteeValue:
									Number(e.target.value) || e.target.value === ""
										? e.target.value
										: rentalPrice.guaranteeValue,
							})
						}
					/>
					<div>mois</div>
				</div>
			</div>
			<TwoButton
				conditionToPass={
					rentalPrice.guaranteeValue.length > 0 &&
					rentalPrice.monetaryCurrency.length > 0 &&
					rentalPrice.price.length > 0
						? "pass"
						: ""
				}
				seter={() => {}}
				priceObject={rentalPrice}
				seterRentalPrice={setRentalPrice}
			/>
		</div>
	);
}

export function ViewInformationPuted() {
	const publish = publicationStore();
	function lengthVerificator(arr: string[]): boolean {
		// if (arr.filter((str) => str.toString().length > 1).length === arr.length)
		// 	return true;
		// else return false;
		return true;
	}
	const postDataToServer = () => {
		publish.setDatabaseResponseStatus("");
		if (
			lengthVerificator([
				publish.address,
				publish.rentalPrice.guaranteeValue,
				publish.rentalPrice.price,
			])
		) {
			publish._setSendingData(true);
			axios({
				method: "post",
				url: process.env.NEXT_PUBLIC_DB_SERVER_URL + "/proprety",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
				data: {
					rentalInformation: {
						address: publish.address,
						RentalType: publish.propretyType,
						lessor: publish.lessor,
						price: publish.rentalPrice.price,
						guaranteeValue: publish.rentalPrice.guaranteeValue,
						monetaryCurrency: publish.rentalPrice.monetaryCurrency,
					},
				},
			})
				.then((res) => {
					publish.setDatabaseResponseStatus("created");
					publish.set_id(res.data.data._id);
					publish.setCount();
					publish._setSendingData(false);
				})
				.catch((err) => {
					publish.setDatabaseResponseStatus("not created");
					publish.setCount();
					publish._setSendingData(false);
				});
		}
	};

	return (
		<div className="pd-10">
			<h3>Voici les information que vous avez reseigner</h3>
			<ul className="w_max gap-5">
				<li className="m_y-5">
					<b>address :</b> {publish.address}{" "}
				</li>
				<li className="m_y-5">
					<b>Type de la propriété :</b>
					{publish.propretyType}{" "}
				</li>
				<li className="m_y-5">
					<b>Bailleur :</b>
					{publish.lessor.fullName}, <b>ses contacts :</b>{" "}
					{publish.lessor.contacts}{" "}
				</li>
				<li className="m_y-5">
					<b>Prix de la propriété :</b>, {publish.rentalPrice.price}{" "}
					{publish.rentalPrice.monetaryCurrency === "USD" ? "$" : "fc"}{" "}
				</li>
				<li className="m_y-5">
					<b>Garantie : </b> {publish.rentalPrice.guaranteeValue} mois
				</li>
			</ul>
			<div className="flex w_max m_y-10">
				<button
					className="btn_s btn br color_blue txt_normal w_max m_x-20"
					onClick={() => publish.resetCount()}>
					Modifier
				</button>
				<button
					className="btn_p btn br color_w txt_normal w_max m_x-20"
					onClick={() => {
						postDataToServer();
						publish.setCount();
					}}>
					Valider
				</button>
			</div>
		</div>
	);
}

export function CreatePropretyStatus() {
	const publish = publicationStore();
	const router = useRouter();

	return (
		<div className="pd-10">
			<h3>Les informations sur la propriété</h3>
			{publish.databaseResponseStatus === "created" ? (
				<>
					<div
						style={{ margin: "30px 0" }}
						className="color_green flex_y_center-xy w_max gap-5">
						{" "}
						<span className="flex_c-center">
							<FaCheck size="20" />
							<span className="m_x-10">Propriété créée avec succès !</span>
						</span>
					</div>
					<button
						className="btn_p btn br color_w txt_normal w_max"
						onClick={() => {
							if (window) router.push("/proprety/update/" + publish._id);
						}}>
						{" "}
						<BsHouseFill size="20" /> Voir la propriété
					</button>
				</>
			) : (
				""
			)}
			{publish.databaseResponseStatus === "not created" ? (
				<>
					<div
						style={{ margin: "30px 0" }}
						className="color_red flex_y_center-xy w_max gap-5">
						Désolé, il y a un problème
					</div>
					<button
						className="btn_p btn br color_w txt_normal w_max"
						onClick={() => publish.resetCount()}>
						{" "}
						Réessayer
					</button>
				</>
			) : (
				""
			)}
		</div>
	);
}
