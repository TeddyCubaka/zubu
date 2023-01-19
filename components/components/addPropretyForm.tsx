import React, { useState } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import { FaCheck } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";

interface LocalDatasType {
	title: string;
	inputType: string;
	datas: string[];
	legend?: string;
	inputName?: string;
}

interface InputType {
	name?: string;
	type: string;
	subject: string;
	required: boolean;
	index: number;
	count: number;
}

let datas: LocalDatasType[] = [
	{
		title: "Veuillez nous renseigner l'adresse",
		inputType: "text",
		datas: ["Numéro", "Avenue", "Quartier", "Commune", "Ville"],
	},
	{
		title: "Précisez le type de la propriété",
		inputType: "radio",
		inputName: "type",
		datas: [
			"maison meublé",
			"maison vide",
			"immeuble",
			"appartement",
			"commerce",
			"bureau",
		],
	},
	{
		title: "Confirmation de possession de la propriété",
		inputType: "text",
		datas: ["Nom", "post-nom", "numéro"],
		legend:
			"Cette demarche nous permet de réduire le nombre des personnes qui essayerai de publier des fausse donnée ou essayerai de mentir sur une propriété.",
	},
	{
		title: "Validation de la publication",
		inputType: "radio",
		datas: ["J'accepte les règles de confidialité"],
	},
];

let values: string[][] = [];

function Input(props: InputType) {
	const [value, setValue] = useState<string>("");
	return (
		<div
			className={
				props.type === "radio"
					? "input_w_label-radio m_y-5"
					: "m_y-5 input_w_label"
			}>
			<label form={props.subject}>{props.subject}</label>
			<input
				type={props.type}
				id={props.subject}
				name={props.name ? props.name : props.subject}
				placeholder={`Mettez le ${props.subject}`}
				required={props.required ? true : false}
				className="m_x-10"
				value={props.type === "radio" ? props.subject : value}
				onChange={(e) => {
					setValue(e.target.value);
					if (!values[props.count]) values.push([e.target.value]);
					else values[props.count][props.index] = e.target.value;
				}}
			/>
		</div>
	);
}

export default function AddPropretiyForm() {
	const [count, setCount] = useState<number>(0);

	const [setAddres, setPropretyType, setName, setContact, allInfo] =
		publicationStore(
			(state) => [
				state.setAddress,
				state.setPropretyType,
				state.setName,
				state.setContact,
				state.allInfo,
			],
			shallow
		);
	return (
		<div>
			{count < datas.length ? (
				<div className="add_proprety_card border-b pd-20 br">
					<h3 className="m_y-10"> {datas[count].title} </h3>
					{datas[count].legend ? (
						<div className="m_y-10">{datas[count].legend}</div>
					) : null}
					<div className="w_max flex_y_center-xy m_y-10">
						{datas[count].datas.map((text, index) => (
							<Input
								subject={text}
								type={datas[count].inputType}
								name={datas[count].inputName ? datas[count].inputName : text}
								required={true}
								count={count}
								index={index}
								key={index}
							/>
						))}
					</div>
					<div className="flex w_max m_y-10">
						<button
							className="btn_s btn color_b br txt_normal m_x-20 w_max"
							onClick={() => {
								if (count === 0) setCount(datas.length - 1);
								else setCount(count - 1);
							}}>
							back
						</button>
						<button
							className="btn_p btn color_w br txt_normal m_x-20 w_max"
							onClick={() => {
								let value: string = "" + values[count];
								if (count == 0) setAddres(value);
								if (count == 1) setPropretyType(value);
								if (count == 2) setName(value);
								if (count == 3) setContact(value);
								if (count < datas.length - 1) setCount(count + 1);
								else setCount(datas.length);
							}}>
							Suivant
						</button>
					</div>
				</div>
			) : (
				<div className="add_proprety_card border-b pd-20 br">
					<h3>Status de la publication</h3>
					<div>
						<FaCheck /> Votre propriété a été belle et bien ajouté
					</div>
					<button
						className="btn_p btn color_w br txt_normal m_x-20 w_max"
						onClick={() => setCount(0)}>
						{" "}
						<BsHouseFill size="18" /> {"  "} Voir la propriété{" "}
					</button>
				</div>
			)}
		</div>
	);
}
