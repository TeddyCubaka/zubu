import React, { ReactElement, useState, ChangeEvent, useRef } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import { ImRadioChecked, ImRadioChecked2 } from "react-icons/im";

interface ButtonCOndition {
	condition: string;
	seter: (string: string) => void;
}

interface InputRadioType {
	value: string;
}

function TwoButton({ condition, seter }: ButtonCOndition) {
	const [setCount, unSetCount] = publicationStore(
		(state) => [state.setCount, state.unSetCount],
		shallow
	);
	return (
		<div className="flex w_max m_y-10">
			<button
				className="btn_s btn br color_b ctxt_normal w_max m_x-20"
				onClick={() => unSetCount()}>
				Précédant
			</button>
			<button
				type="button"
				className={
					condition.length > 0
						? "btn_p btn br color_w txt_normal w_max m_x-20"
						: "btn_p_not_active btn br color_w txt_normal w_max m_x-20"
				}
				onClick={() => {
					if (condition.length > 0) {
						setCount();
						seter(condition);
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
			<TwoButton condition={adress} seter={setAddres} />
		</div>
	);
}

export function GetPrice() {
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
			<TwoButton condition={propretyType} seter={setPropretyType} />
		</div>
	);
}
