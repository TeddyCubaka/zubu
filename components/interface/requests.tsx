import { PropretyGalleryImageType } from "../interface/proprety";

export interface SendToServerType {
	path: string;
	data: Object;
	getStatus: (status: string) => void;
	getData?: (data: Object) => void;
	doAfterSuccess?: (data: object) => void;
	doIfError?: (data: any) => void;
}

export interface AskToServerDataType {
	path: string;
	data?: Object;
	getStatus: (status: string) => void;
	getData: (data: any) => void;
	doAfterSuccess?: (data: object) => void;
	doIfError: (data: any) => void;
}

export interface UploadImageProps {
	file: string | Blob;
	getUrl?: (string: string) => void;
	getStatus: (string: string) => void;
	clearFileFunction: () => void;
	getImage: (images: PropretyGalleryImageType) => void;
	doAfterResponse?: (e: PropretyGalleryImageType) => void;
}
