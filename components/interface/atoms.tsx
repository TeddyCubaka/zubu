import { ReactElement } from "react";

export interface InputHasDetailsProps {
	detailsData: string[];
	store: string;
	object?: string;
	customClass?: string;
	hasInput?: boolean;
	sendToStore: (string: string) => void;
}

export interface InputProps {
	value: string;
	sendToStore: (string: string | number) => void;
	type?: string;
	subject: string;
	customClass?: string;
	placeholder?: string;
	required?: boolean;
	children?: ReactElement;
	maxLength?: number;
}

export interface InputNumberProps {
	value: number;
	sendToStore: (value: number) => void;
	subject: string;
	customClass?: string;
	placeholder?: string;
}

export enum InputTypes {
	TEXT = "text",
	NUMBER = "number",
	PASSWORD = "password",
	DATE = "date",
}

export interface FormDatasTypes {
	action?: string;
	method?: string;
	title: string;
	inputs: InputProps[];
	buttons: ReactElement;
}
// export interface FormDatasTypes {
// 	action?: string;
// 	method?: string;
// 	inputs: InputProps[];
// 	inputDetails: InputHasDetailsProps[];
// 	buttons: ReactElement;
// }
