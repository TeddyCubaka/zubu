import { PropretyStore } from "../../store/proprety";

export interface UploadToCloudButtonProps {
	proprety: PropretyStore;
	_setDispalyUploadImages: (state: boolean) => void;
}
export interface ButtonProps {
	subject: string;
	conditionToPass: boolean;
	doOnClick: () => any;
	doIfConditionDoesNotPass?: () => void;
}
