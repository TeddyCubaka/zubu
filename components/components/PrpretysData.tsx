import React, { useState, useEffect } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import { ImRadioChecked, ImRadioChecked2 } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import axios from "axios";
import { Input } from "./updatePropretyComponents";

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
		<div className="add_proprety_card border-b pd-20 br">
			<h3 className="m_y-10">Reseignez l&apos;addresse</h3>
			<div className="w_max">
				<Input
					value={addressSplited.number}
					sendToStore={(e) =>
						setAddressSplited((prev) =>
							Number(e) || e === "" ? { ...prev, number: e } : { ...prev }
						)
					}
					subject={"N° : "}
					customClass={"w_max m_y-5"}
					placeholder={"Renseigner le numéro"}
				/>
				<Input
					value={addressSplited.avenue}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, avenue: e }))
					}
					subject={"avenue ou rue : "}
					customClass={"w_max m_y-5"}
					placeholder={"Rensigner l'avenue"}
				/>
				<Input
					value={addressSplited.quoter}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, quoter: e }))
					}
					subject={"quartier : "}
					customClass={"w_max m_y-5"}
					placeholder={"Rensigner le quartier"}
				/>
				<Input
					value={addressSplited.township}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, township: e }))
					}
					subject={"commune : "}
					customClass={"w_max m_y-5"}
					placeholder={"Rensigner la commune"}
				/>
				<Input
					value={addressSplited.city}
					sendToStore={(e) =>
						setAddressSplited((prev) => ({ ...prev, city: e }))
					}
					subject={"ville : "}
					customClass={"w_max m_y-5"}
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
		<div className="add_proprety_card border-b pd-20 br">
			<h1>Quel est le prix pour louer votre bien</h1>
			<div className="w_max input_take_price flex_y-center">
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

	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h3>Information sur le bailleur ?</h3>
			<div className="w_max">
				<Input
					value={lessor.fullName}
					sendToStore={(e) => setLessor({ ...lessor, fullName: e })}
					subject={"Nom complet : "}
					customClass={"w_max m_y-10"}
					placeholder={"nom du bailleur ici"}
				/>
				<Input
					value={lessor.contacts}
					sendToStore={(e) => setLessor({ ...lessor, contacts: e })}
					subject={"numéro de téléphone ou mail : "}
					customClass={"w_max m_y-10"}
					placeholder="Ex : +243 990 000 000 ou user@gmail.com"
				/>
			</div>
			<TwoButton
				conditionToPass={
					lessor.fullName.length > 3 && lessor.contacts.length > 9 ? "pass" : ""
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
		<div className="add_proprety_card border-b pd-20 br">
			<h3>Reseignez l`&apos;`addresse</h3>
			<div className="w_max">
				<div className="m_y-10 input_w_label">
					<label>Prix</label>
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
					{/* <SetCurrency setRentalPrice={} /> */}
				</div>
				<div className="m_y-10 input_w_label">
					<label>Guarantie</label>
					<input
						type="text"
						placeholder="Ex : 4"
						className={`br w_max`}
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
		if (arr.filter((str) => str.length > 1).length === arr.length) return true;
		else return false;
	}
	const postDataToServer = () => {
		publish.setDatabaseResponseStatus("");
		if (
			lengthVerificator([
				publish.address,
				publish.propretyType,
				publish.lessor.contacts,
				publish.lessor.fullName,
				publish.rentalPrice.guaranteeValue,
				publish.rentalPrice.monetaryCurrency,
				publish.rentalPrice.price,
			])
		) {
			axios({
				method: "post",
				url: process.env.NEXT_PUBLIC_DB_URL + "/proprety",
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
				})
				.catch(() => {
					publish.setDatabaseResponseStatus("not created");
					publish.setCount();
				});
		}
	};

	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h1>Voici les information que vous avez reseigner</h1>
			<ul className="w_max">
				<li>
					<b>address :</b> {publish.address}{" "}
				</li>
				<li>
					<b>Type de la propriété :</b>
					{publish.propretyType}{" "}
				</li>
				<li>
					<b>Bailleur :</b>
					{publish.lessor.fullName}, <b>ses contacts :</b>{" "}
					{publish.lessor.contacts}{" "}
				</li>
				<li>
					<b>Prix de la propriété :</b>, {publish.rentalPrice.price}{" "}
					{publish.rentalPrice.monetaryCurrency === "USD" ? "$" : "fc"}{" "}
				</li>
				<li>
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
						publish.setCount();
						postDataToServer();
					}}>
					Valider
				</button>
			</div>
		</div>
	);
}

export function CreatePropretyStatus() {
	const publish = publicationStore();

	return (
		<div className="add_proprety_card border-b br">
			<h1>Les informations sur la propriété</h1>
			{publish.databaseResponseStatus === "created" ? (
				<>
					<div className="color_green flex_x-center">
						{" "}
						<FaCheck size="20" /> {"  "}{" "}
						<span className="m_x-10">Propriété créée avec succès !</span>
					</div>
					<button
						className="btn_p btn br color_w txt_normal w_half m_x-20"
						onClick={() => {
							if (window)
								window.location.href = "/proprety/update/" + publish._id;
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
					<div>Désolé, il y a un problème</div>
					<button onClick={() => publish.resetCount()}> Retry</button>
				</>
			) : (
				""
			)}
			{publish.databaseResponseStatus === ("not created" || "created") ? (
				<div className="flex_x-center">
					<span className="steped_loader"></span>
					<span>
						Création de la propriété. Veuiller patientez, s`&apos;`il vous plait
					</span>
				</div>
			) : (
				""
			)}
		</div>
	);
}
