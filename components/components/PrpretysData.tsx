import React, { useState } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";

export function GetAdress() {
	const [adress, getAdress] = useState<string>("");
	const [goodFormat, setGoodFormat] = useState<string>("");
	const [setAddres, setCount] = publicationStore(
		(state) => [state.setAddress, state.setCount],
		shallow
	);

	function adressFormatValidator(str: string) {
		if (str.split("/").length === 5) {
			setGoodFormat("br_green");
			getAdress(str);
		} else if (str.length < 2) setGoodFormat("br_blue");
		else setGoodFormat("br_red");
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
			<div className="flex w_max m_y-10">
				<button
					className="btn_s btn br color_b txt_normal w_max m_x-20"
					onClick={() => console.log(adress)}>
					Précédant
				</button>
				<button
					type="button"
					className={
						adress.length > 0
							? "btn_p btn br color_w txt_normal w_max m_x-20"
							: "btn_p_not_active btn br color_w txt_normal w_max m_x-20"
					}
					onClick={() => {
						if (adress.length > 0) {
							setCount(0);
							setAddres(adress);
						}
					}}>
					Suivant
				</button>
			</div>
		</div>
	);
}

export function GetPrice() {
	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h1>Quel est le prix pour louer votre bien</h1>
			<div className="w_max flex">
				<div className="m_y-10 input_w_label">
					<label>prix</label>
					<input
						type="number"
						placeholder="300"
						className={`br w_max`}
						onChange={(e) => {
							// adressFormatValidator(e.target.value);
						}}
					/>
				</div>
				<details>
					<summary>Monnaie</summary>
					<div>USD - $</div>
					<div>CDF - fc</div>
				</details>
			</div>
		</div>
	);
}
