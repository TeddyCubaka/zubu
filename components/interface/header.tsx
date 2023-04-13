import { IconType } from "react-icons";

export interface UserMenuLinkType {
	href: string;
	content: string;
	Icon: IconType;
	doOnClick?: () => void;
	color?: string;
}

export interface CurrentPageInformationProps {
	title: string;
}
