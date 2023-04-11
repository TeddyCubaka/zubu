export interface InputHasDetailsProps {
	detailsData: string[];
	store: string;
	object: string;
	customClass?: string;
	hasInput?: boolean;
	sendToStore: (string: string) => void;
}

export interface InputProps {
	value: string;
	sendToStore: (string: string) => void;
	type?: string;
	subject: string;
	customClass?: string;
	placeholder?: string;
	required?: boolean;
}

export interface InputNumberProps {
	value: number;
	sendToStore: (value: number) => void;
	subject: string;
	customClass?: string;
	placeholder?: string;
}
