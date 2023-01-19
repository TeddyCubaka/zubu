import { text } from "node:stream/consumers";
import React, { useState } from "react";

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
];

function Input(props: InputType) {
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
			/>
		</div>
	);
}

function FormCard() {
	const [count, setCount] = useState<number>(0);
	return (
		<div className="add_proprety_card border-b pd-20 br">
			<h3 className="m_y-10"> {datas[count].title} </h3>
			{datas[count].legend ? (
				<div className="m_y-10">{datas[count].legend}</div>
			) : null}
			<div className="w_max flex_y_center-xy m_y-10">
				{datas[count].datas.map((text) => (
					<Input
						subject={text}
						type={datas[count].inputType}
						name={datas[count].inputName ? datas[count].inputName : text}
						required={true}
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
					précedant
				</button>
				<button
					className="btn_p btn color_w br txt_normal m_x-20 w_max"
					onClick={() => {
						if (count < datas.length - 1) setCount(count + 1);
						else setCount(0);
					}}>
					Suivant
				</button>
			</div>
		</div>
	);
}

export default function AddPropretiyForm() {
	return (
		<div>
			<FormCard />
		</div>
	);
}
